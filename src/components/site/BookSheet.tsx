import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { Camera, Check, X } from "lucide-react";
import Segmented from "./Segmented";
import { submitLead } from "@/lib/submitLead";
import { SITE, smsHref } from "@/lib/site";

type Timeline = "this-week" | "next-2-weeks" | "flexible";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  serviceLabel: string;
  summary: string;
  zip: string;
  perVisit: boolean;
};

const BookSheet = ({ open, onOpenChange, total, serviceLabel, summary, zip, perVisit }: Props) => {
  const [timeline, setTimeline] = useState<Timeline>("this-week");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = photos.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [photos]);

  const addPhotos = (list: FileList | null) => {
    if (!list) return;
    setPhotos((prev) => [...prev, ...Array.from(list)].slice(0, 8));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") || "").trim();
    setLoading(true);
    setError(null);
    const { ok } = await submitLead({
      name: String(data.get("name") || "").trim(),
      phone,
      email: String(data.get("email") || "").trim(),
      timeline,
      message: [summary, String(data.get("note") || "").trim()].filter(Boolean).join(" | "),
      source: "estimator",
      service: serviceLabel,
      estimate: total,
      zip,
      photos,
    });
    setLoading(false);
    if (!ok) {
      setError(`That didn't go through. Check your connection and try again, or text us at ${SITE.phoneDisplay}.`);
      return;
    }
    setSentTo(phone);
  };

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next && sentTo) {
      setSentTo(null);
      setPhotos([]);
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={close} shouldScaleBackground={false} repositionInputs={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-slate/50" />
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[94dvh] max-w-lg flex-col rounded-t-[22px] bg-white outline-none"
        >
          <div className="mx-auto mt-2.5 h-1.5 w-10 flex-shrink-0 rounded-full bg-line" />
          <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-3">
            <div className="min-w-0">
              <Drawer.Title className="heading text-[22px] text-slate">
                {sentTo ? "Request sent" : "Get your final price"}
              </Drawer.Title>
              {!sentTo && (
                <p className="mt-1 text-[15px] text-concrete">
                  {serviceLabel}, estimate <span className="price text-slate">${total}</span>
                  {perVisit && " per visit"}
                </p>
              )}
            </div>
            <Drawer.Close aria-label="Close" className="-mr-2 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-concrete active:bg-fog">
              <X className="h-5 w-5" />
            </Drawer.Close>
          </div>

          <div className="overflow-y-auto overscroll-contain px-5 pb-safe">
            {sentTo ? (
              <div className="pb-6 pt-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal">
                  <Check className="h-7 w-7 text-slate" strokeWidth={3} />
                </span>
                <p className="mt-4 text-[17px] text-slate">
                  We'll send your final price by text to <span className="font-semibold">{sentTo}</span>, or by email if you gave
                  one. Nothing is booked or charged until you say yes.
                </p>
                <p className="mt-3 text-[15px] text-concrete">
                  Want it faster?{" "}
                  <a className="font-semibold text-slate underline underline-offset-2" href={smsHref("Hi, I just sent a request on your site.")}>
                    Text us
                  </a>{" "}
                  at {SITE.phoneDisplay}.
                </p>
                <button type="button" onClick={() => close(false)} className="btn-signal mt-6 w-full">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pb-4">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <input required name="name" autoComplete="name" placeholder="Your name" className="field" />
                </label>
                <label className="block">
                  <span className="sr-only">Mobile number</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Mobile number"
                    pattern="[0-9()+\-.\s]{7,}"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Email (optional)</span>
                  <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className="field" />
                </label>

                <div className="pt-2">
                  <p className="mb-2 text-[15px] font-semibold text-slate">When do you need it?</p>
                  <Segmented
                    label="When do you need it?"
                    value={timeline}
                    onChange={setTimeline}
                    options={[
                      { value: "this-week", label: "This week" },
                      { value: "next-2-weeks", label: "Next 2 weeks" },
                      { value: "flexible", label: "Flexible" },
                    ]}
                  />
                </div>

                <div className="pt-2">
                  <p className="mb-2 text-[15px] font-semibold text-slate">
                    Photos <span className="font-normal text-concrete">(optional, makes your final price more accurate)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {previews.map((src, i) => (
                      <span key={src} className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-fog">
                        <img src={src} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          aria-label={`Remove photo ${i + 1}`}
                          onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate/80 text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                    {photos.length < 8 && (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-concrete/50 text-[13px] font-semibold text-concrete active:bg-fog"
                      >
                        <Camera className="h-5 w-5" />
                        Add
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      addPhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>

                <label className="block pt-2">
                  <span className="sr-only">Anything we should know?</span>
                  <textarea name="note" rows={2} placeholder="Anything we should know? Stairs, parking, gate code…" className="field resize-none" />
                </label>

                {error && (
                  <p role="alert" className="text-[15px] text-destructive">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn-signal w-full">
                  {loading ? (photos.length ? "Uploading photos…" : "Sending…") : "Send request"}
                </button>
                <p className="pb-2 text-center text-[13px] text-concrete">No payment now. We send the final price by text or email first.</p>
              </form>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BookSheet;
