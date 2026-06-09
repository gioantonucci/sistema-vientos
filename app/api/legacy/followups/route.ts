import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyFollowup = {
  id?: string;
  pacienteId: string;
  profesionalId: string;
  fecha: string;
  tipo: string;
  nota: string;
  visibilidad?: string;
  archivosAdjuntos?: string[];
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("followups")
    .select("*")
    .order("record_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ notes: data.map(mapFollowup) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const followup = (await request.json()) as LegacyFollowup;
  const payload = {
    ...toFollowupRow(followup),
    ...(user?.id ? { created_by: user.id } : {}),
  };

  const query = followup.id && uuidPattern.test(followup.id)
    ? supabase.from("followups").upsert({ id: followup.id, ...payload }).select("*").single()
    : supabase.from("followups").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ note: mapFollowup(data) });
}

function mapFollowup(row: Record<string, any>) {
  return {
    id: row.id,
    pacienteId: row.patient_id,
    profesionalId: row.professional_id,
    fecha: row.record_date,
    tipo: row.type,
    nota: row.note,
    visibilidad: row.visibility,
    archivosAdjuntos: row.attachments || [],
    fechaCreacion: row.created_at?.slice(0, 10) || "",
    fechaActualizacion: row.updated_at?.slice(0, 10) || "",
    creadoPor: row.created_by || "",
  };
}

function toFollowupRow(followup: LegacyFollowup) {
  return {
    patient_id: followup.pacienteId,
    professional_id: followup.profesionalId,
    record_date: followup.fecha,
    type: followup.tipo,
    note: followup.nota,
    visibility: followup.visibilidad || "equipo",
    attachments: followup.archivosAdjuntos || [],
  };
}
