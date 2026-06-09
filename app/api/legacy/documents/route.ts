import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

type LegacyDocument = {
  id?: string;
  pacienteId: string;
  nombre: string;
  tipo?: string;
  rutaArchivo?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("patient_documents")
    .select("*")
    .order("uploaded_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ documents: data.map(mapDocument) });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const document = (await request.json()) as LegacyDocument;
  const payload = {
    ...toDocumentRow(document),
    ...(user?.id ? { uploaded_by: user.id } : {}),
  };

  const query = document.id && uuidPattern.test(document.id)
    ? supabase.from("patient_documents").upsert({ id: document.id, ...payload }).select("*").single()
    : supabase.from("patient_documents").insert(payload).select("*").single();

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ document: mapDocument(data) });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing document id" }, { status: 400 });
  }

  const { error } = await supabase.from("patient_documents").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

function mapDocument(row: Record<string, any>) {
  return {
    id: row.id,
    pacienteId: row.patient_id,
    nombre: row.name,
    tipo: row.type,
    rutaArchivo: row.file_path || "",
    fechaCarga: row.uploaded_at?.slice(0, 10) || "",
    cargadoPor: row.uploaded_by || "",
  };
}

function toDocumentRow(document: LegacyDocument) {
  return {
    patient_id: document.pacienteId,
    name: document.nombre,
    type: document.tipo || "otro",
    file_path: document.rutaArchivo || null,
  };
}
