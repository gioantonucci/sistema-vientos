import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyAppointment = {
  id?: string;
  pacienteId: string;
  profesionalId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  disciplina: string;
  estado?: string;
  estadoPago?: string;
  observaciones?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ appointments: data.map(mapAppointment) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const appointment = (await request.json()) as LegacyAppointment;
  const payload = toAppointmentRow(appointment);

  const query = appointment.id && uuidPattern.test(appointment.id)
    ? supabase.from("appointments").upsert({ id: appointment.id, ...payload }).select("*").single()
    : supabase.from("appointments").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ appointment: mapAppointment(data) });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const appointment = (await request.json()) as Partial<LegacyAppointment> & { id?: string };

  if (!appointment.id) {
    return NextResponse.json({ error: "Missing appointment id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("appointments")
    .update(toAppointmentRow(appointment))
    .eq("id", appointment.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ appointment: mapAppointment(data) });
}

function mapAppointment(row: Record<string, any>) {
  return {
    id: row.id,
    pacienteId: row.patient_id,
    profesionalId: row.professional_id,
    fecha: row.appointment_date,
    horaInicio: String(row.start_time || "").slice(0, 5),
    horaFin: String(row.end_time || "").slice(0, 5),
    disciplina: row.discipline,
    modalidad: "presencial",
    estado: row.status,
    estadoPago: row.payment_status,
    observaciones: row.notes || "",
  };
}

function toAppointmentRow(appointment: Partial<LegacyAppointment>) {
  return {
    ...(appointment.pacienteId ? { patient_id: appointment.pacienteId } : {}),
    ...(appointment.profesionalId ? { professional_id: appointment.profesionalId } : {}),
    ...(appointment.fecha ? { appointment_date: appointment.fecha } : {}),
    ...(appointment.horaInicio ? { start_time: appointment.horaInicio } : {}),
    ...(appointment.horaFin ? { end_time: appointment.horaFin } : {}),
    ...(appointment.disciplina ? { discipline: appointment.disciplina } : {}),
    ...(appointment.estado ? { status: appointment.estado } : {}),
    ...(appointment.estadoPago ? { payment_status: appointment.estadoPago } : {}),
    notes: appointment.observaciones || null,
  };
}
