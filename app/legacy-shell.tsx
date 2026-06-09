"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type LegacyUser = {
  email: string;
  name: string;
  role: "admin" | "profesional";
  professionalId: string | null;
};

export function LegacyShell({ user }: { user: LegacyUser }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const syncSession = () => {
      frame.contentWindow?.postMessage(
        {
          type: "vientos:supabase-session",
          user,
        },
        window.location.origin,
      );
    };

    frame.addEventListener("load", syncSession);
    syncSession();

    return () => frame.removeEventListener("load", syncSession);
  }, [user]);

  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "vientos:logout") return;

      const supabase = createClient();
      await supabase.auth.signOut();
      router.refresh();
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <iframe
      className="legacy-frame"
      ref={frameRef}
      src="/legacy/index.html"
      title="Sistema Vientos"
    />
  );
}
