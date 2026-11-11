import { supabase } from "@/integrations/supabase/client";

// Web3Forms access keys are public by design (they only allow sending to the inbox tied to the key).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "e88858a4-d93a-433e-a2cc-ac96e2ebf203";

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  timeline: string;
  message: string | null;
  source: "estimator" | "contact";
};

async function sendEmailAlert(lead: LeadInput): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `New lead (${lead.source}): ${lead.name}`,
        from_name: "SanFranCleaners website",
        name: lead.name,
        phone: lead.phone,
        email: lead.email || undefined,
        timeline: lead.timeline,
        message: lead.message || "(no message)",
        source: lead.source,
      }),
    });
    const json = await res.json().catch(() => null);
    return res.ok && json?.success !== false;
  } catch {
    return false;
  }
}

/**
 * Saves the lead to the database and emails an alert in parallel.
 * Counts as success if at least one of the two worked, so a lead is never lost
 * because of a single failing service.
 */
export async function submitLead(lead: LeadInput): Promise<{ ok: boolean }> {
  const [db, mail] = await Promise.all([
    supabase
      .from("leads")
      .insert({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        timeline: lead.timeline,
        message: lead.message,
      })
      .then(({ error }) => !error, () => false),
    sendEmailAlert(lead),
  ]);
  return { ok: db || mail };
}
