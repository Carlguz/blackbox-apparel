"use client";

import { useEffect, useState, useCallback } from "react";
import {
  defaultContent,
  type SiteContentData,
} from "./content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContentData>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error("No se pudo cargar el contenido");
      const json = await res.json();
      const data = json.data as SiteContentData | undefined;
      if (data) {
        setContent(data);
      }
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const save = useCallback(async (next: SiteContentData) => {
    try {
      setSaving(true);
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      if (!res.ok) throw new Error("No se pudo guardar");
      setContent(next);
      setError(null);
      return true;
    } catch (e) {
      setError((e as Error).message);
      console.error(e);
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { content, setContent, loading, saving, error, reload: load, save };
}
