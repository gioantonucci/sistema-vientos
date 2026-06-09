import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyPayment = {
  id?: string;
  pacienteId: string;
  profesionalId: string;
  turnoId?: string;
  fechaSesion: string;
  monto?: number;
  obraSocial?: string;
  importeCubierto?: number;
  estado?: string;
  medioPago?: string;
  fechaPago?: string;
  observaciones?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("session_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ payments: data.map(mapPayment) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const payment = (await request.json()) as LegacyPayment;
  const payload = toPaymentRow(payment);

  const query = payment.id && uuidPattern.test(payment.id)
    ? supabase.from("payments").upsert({ id: payment.id, ...payload }).select("*").single()
    : supabase.from("payments").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await syncAppointmentPaymentStatus(supabase, mapPayment(data));

  return NextResponse.json({ payment: mapPayment(data) });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing payment id" }, { status: 400 });
  }

  const { error } = await supabase.from("payments").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

function mapPayment(row: Record<string, any>) {
  return {
    id: row.id,
    pacienteId: row.patient_id,
    profesionalId: row.professional_id,
    turnoId: row.appointment_id || "",
    fechaSesion: row.session_date,
    monto: Number(row.patient_difference || 0),
    obraSocial: row.insurance_name || "Particular",
    importeCubierto: Number(row.insurance_professional_amount || 0),
    total: Number(row.total_amount || 0),
    liquidacionProfesional: Number(row.professional_share || 0),
    liquidacionVientos: Number(row.center_share || 0),
    estado: row.status,
    medioPago: row.method,
    fechaPago: row.payment_date || "",
    observaciones: row.notes || "",
  };
}

function toPaymentRow(payment: LegacyPayment) {
  return {
    patient_id: payment.pacienteId,
    professional_id: payment.profesionalId,
    appointment_id: payment.turnoId || null,
    session_date: payment.fechaSesion,
    patient_difference: Number(payment.monto || 0),
    insurance_name: payment.obraSocial || "Particular",
    insurance_professional_amount: Number(payment.importeCubierto || 0),
    status: payment.estado || "pendiente",
    method: payment.medioPago || "otro",
    payment_date: payment.fechaPago || null,
    notes: payment.observaciones || null,
  };
}

async function syncAppointmentPaymentStatus(supabase: Awaited<ReturnType<typeof createClient>>, payment: ReturnType<typeof mapPayment>) {
  if (!payment.turnoId) return;

  await supabase
    .from("appointments")
    .update({ payment_status: payment.estado })
    .eq("id", payment.turnoId);
}
