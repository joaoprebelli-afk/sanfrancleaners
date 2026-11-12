import { supabase } from "@/integrations/supabase/client";

// Web3Forms access keys are public by design (they only send to the inbox tied to the key).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "e88858a4-d93a-433e-a2cc-ac96e2ebf203";

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  timeline: string;
  message: string | null;
  source: "estimator" | "contact";
  service?: string;
  estimate?: number;
  zip?: string;
  photos?: File[];
};

const MAX_EDGE = 1800;

/** Shrinks big phone photos before upload. Falls back to the original file if the browser can't decode it. */
async function shrink(file: File): Promise<Blob> {
  try {
    if (typeof createImageBitmap !== "function") return file;
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 2_500_000) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    return blob ?? file;
  } catch {
    return file;
  }
}

async function uploadPhotos(files: File[]): Promise<string[]> {
  const day = new Date().toISOString().slice(0, 10);
  const batch = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
  const results = await Promise.all(
    files.slice(0, 8).map(async (file, i) => {
      const body = await shrink(file);
      const ext = body.type === "image/jpeg" ? "jpg" : (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${day}/${batch}/${i + 1}.${ext}`;
      const { error } = await supabase.storage
        .from("lead-photos")
        .upload(path, body, { contentType: body.type || file.type || "image/jpeg", upsert: false });
      return error ? null : path;
    }),
  );
  return results.filter((p): p is string => Boolean(p));
}

async function sendEmailAlert(lead: LeadInput, photoCount: number): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New lead: ${lead.name}${lead.estimate ? ` ($${lead.estimate})` : ""}`,
        from_name: "SanFranCleaners website",
        name: lead.name,
        phone: lead.phone,
        email: lead.email || undefined,
        service: lead.service || "(not given)",
        estimate: lead.estimate ? `$${lead.estimate}` : "(none)",
        zip: lead.zip || "(not given)",
        timeline: lead.timeline,
        photos: photoCount ? `${photoCount} photo(s) in Supabase storage, bucket lead-photos` : "none",
        message: lead.message || "(no message)",
      }),
    });
    const json = await res.json().catch(() => null);
    return res.ok && json?.success !== false;
  } catch {
    return false;
  }
}

/**
 * Uploads photos, saves the lead and emails an alert.
 * Counts as success if the database or the email worked, so one failing service never loses a lead.
 */
export async function submitLead(lead: LeadInput): Promise<{ ok: boolean }> {
  const photos = lead.photos?.length ? await uploadPhotos(lead.photos).catch(() => []) : [];
  const [db, mail] = await Promise.all([
    supabase
      .from("leads")
      .insert({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        timeline: lead.timeline,
        message: lead.message,
        source: lead.source,
        service: lead.service ?? null,
        estimate: lead.estimate ?? null,
        zip: lead.zip || null,
        photos,
      })
      .then(
        ({ error }) => !error,
        () => false,
      ),
    sendEmailAlert(lead, photos.length),
  ]);
  return { ok: db || mail };
}
