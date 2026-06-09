import { LoginForm } from "./login-form";
import { LegacyShell } from "./legacy-shell";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginForm />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, professional_id")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <LegacyShell
      user={{
        email: user.email ?? "",
        name: profile?.full_name ?? user.email ?? "Usuario",
        role: profile?.role === "profesional" ? "profesional" : "admin",
        professionalId: profile?.professional_id ?? null,
      }}
    />
  );
}
