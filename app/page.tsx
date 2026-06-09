import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="login-screen">
      <section className="login-card">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            VS
          </div>
          <div>
            <h1>Vientos del Sur</h1>
            <p>Base Next.js + Supabase lista</p>
          </div>
        </div>

        <p>
          Supabase está configurado. El próximo paso es migrar las vistas actuales
          a componentes con datos reales.
        </p>

        <p className="login-help">
          Sesión actual: {user?.email ?? "sin usuario autenticado"}
        </p>
      </section>
    </main>
  );
}
