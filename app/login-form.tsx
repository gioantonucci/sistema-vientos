"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    router.refresh();
  }

  return (
    <main className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            VS
          </div>
          <div>
            <h1>Vientos del Sur</h1>
            <p>Gestión interna terapéutica</p>
          </div>
        </div>

        <label>
          Email
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label>
          Contraseña
          <input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        <p className="form-error" role="alert">
          {error}
        </p>
        <button className="primary-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </main>
  );
}
