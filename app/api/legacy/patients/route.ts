import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyPatient = {
  id?: string;
  nombre: string;
  apellido: string;
  fechaNacimiento?: string;
  dni?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  responsableNombre?: string;
  responsableVinculo?: string;
  responsableTelefono?: string;
  motivoConsulta?: string;
  disciplinaPrincipal: string;
  profesionalesAsignados?: string[];
  estado?: string;
  observaciones?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("patients")
    .select("*, patient_professionals(professional_id)")
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ patients: data.map(mapPatient) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const patient = (await request.json()) as LegacyPatient;
  const payload = toPatientRow(patient);

  const query = patient.id && uuidPattern.test(patient.id)
    ? supabase.from("patients").upsert({ id: patient.id, ...payload }).select("*").single()
    : supabase.from("patients").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const assigned = patient.profesionalesAsignados || [];
  const { error: deleteError } = await supabase
    .from("patient_professionals")
    .delete()
    .eq("patient_id", data.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  if (assigned.length) {
    const { error: insertError } = await supabase.from("patient_professionals").insert(
      assigned.map((professionalId) => ({
        patient_id: data.id,
        professional_id: professionalId,
      })),
    );

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }
  }

  return NextResponse.json({
    patient: mapPatient({ ...data, patient_professionals: assigned.map((professional_id) => ({ professional_id })) }),
  });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing patient id" }, { status: 400 });
  }

  const { error } = await supabase.from("patients").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

function mapPatient(row: Record<string, any>) {
  return {
    id: row.id,
    nombre: row.first_name,
    apellido: row.last_name,
    fechaNacimiento: row.birth_date || "",
    dni: row.dni || "",
    telefono: row.phone || "",
    email: row.email || "",
    direccion: row.address || "",
    responsableNombre: row.responsible_name || "",
    responsableVinculo: row.responsible_link || "",
    responsableTelefono: row.responsible_phone || "",
    motivoConsulta: row.reason || "",
    disciplinaPrincipal: row.main_discipline,
    profesionalesAsignados: (row.patient_professionals || []).map((item: { professional_id: string }) => item.professional_id),
    estado: row.status,
    observaciones: row.notes || "",
    fechaCreacion: row.created_at?.slice(0, 10) || "",
    fechaActualizacion: row.updated_at?.slice(0, 10) || "",
  };
}

function toPatientRow(patient: LegacyPatient) {
  return {
    first_name: patient.nombre,
    last_name: patient.apellido,
    birth_date: patient.fechaNacimiento || null,
    dni: patient.dni || null,
    phone: patient.telefono || null,
    email: patient.email || null,
    address: patient.direccion || null,
    responsible_name: patient.responsableNombre || null,
    responsible_link: patient.responsableVinculo || null,
    responsible_phone: patient.responsableTelefono || null,
    reason: patient.motivoConsulta || null,
    main_discipline: patient.disciplinaPrincipal,
    status: patient.estado || "activo",
    notes: patient.observaciones || null,
  };
}
