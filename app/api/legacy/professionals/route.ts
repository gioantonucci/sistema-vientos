import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyProfessional = {
  id?: string;
  nombre: string;
  apellido: string;
  disciplina: string;
  matricula?: string;
  telefono?: string;
  email?: string;
  especialidades?: string[];
  obrasSociales?: string[];
  diasAtencion?: string;
  horariosAtencion?: string;
  estado?: string;
  observaciones?: string;
  color?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("professionals")
    .select("*")
    .order("last_name", { ascending: true })
    .order("first_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ professionals: data.map(mapProfessional) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const professional = (await request.json()) as LegacyProfessional;
  const payload = toProfessionalRow(professional);

  const query = professional.id && uuidPattern.test(professional.id)
    ? supabase.from("professionals").upsert({ id: professional.id, ...payload }).select("*").single()
    : supabase.from("professionals").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ professional: mapProfessional(data) });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing professional id" }, { status: 400 });
  }

  const { error } = await supabase.from("professionals").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

function mapProfessional(row: Record<string, any>) {
  return {
    id: row.id,
    nombre: row.first_name,
    apellido: row.last_name,
    disciplina: row.discipline,
    matricula: row.license || "",
    telefono: row.phone || "",
    email: row.email || "",
    especialidades: row.specialties || [],
    obrasSociales: row.insurances || [],
    diasAtencion: row.attention_days || "",
    horariosAtencion: row.attention_hours || "",
    estado: row.status,
    observaciones: row.notes || "",
    color: row.color || "#2f6f6a",
  };
}

function toProfessionalRow(professional: LegacyProfessional) {
  return {
    first_name: professional.nombre,
    last_name: professional.apellido,
    discipline: professional.disciplina,
    license: professional.matricula || null,
    phone: professional.telefono || null,
    email: professional.email || null,
    specialties: professional.especialidades || [],
    insurances: professional.obrasSociales || [],
    attention_days: professional.diasAtencion || null,
    attention_hours: professional.horariosAtencion || null,
    status: professional.estado || "activo",
    notes: professional.observaciones || null,
    color: professional.color || "#2f6f6a",
  };
}
