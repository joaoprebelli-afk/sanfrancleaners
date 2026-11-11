import { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { submitLead } from "@/lib/submitLead";
import {
  PRICING,
  estimateCleaning,
  estimateJunk,
  usesTruck,
  zoneForZip,
  type CleaningFrequency,
  type CleaningSize,
  type CleaningType,
  type JunkExtra,
  type JunkService,
} from "@/lib/estimate";

type Mode = "junk" | "cleaning";

const JUNK_ORDER: JunkService[] = ["garage", "haul", "bigitem", "double", "carload", "donation", "organize"];
const EXTRA_ORDER: JunkExtra[] = ["fridge", "appliance", "mattress", "tire"];

const SIZE_LABELS: Record<CleaningSize, string> = { studio: "Studio or 1 bedroom", two: "2 bedrooms", three: "3 bedrooms" };
const TYPE_LABELS: Record<CleaningType, string> = { standard: "Standard", deep: "Deep clean", moveout: "Move-out" };
const FREQ_LABELS: Record<CleaningFrequency, string> = { once: "One time", biweekly: "Every 2 weeks", weekly: "Weekly" };

const optionClass = (active: boolean) =>
  `text-left rounded-lg border px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
    active ? "border-orange bg-orange/10" : "border-border bg-background hover:bg-muted"
  }`;

const pillClass = (active: boolean) =>
  `rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
    active ? "border-orange bg-orange/10 text-primary" : "border-border bg-background text-muted-foreground hover:bg-muted"
  }`;

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-orange transition-colors";

const EstimatorSection = () => {
  const [mode, setMode] = useState<Mode>("junk");
  const [service, setService] = useState<JunkService>("garage");
  const [extras, setExtras] = useState<Partial<Record<JunkExtra, number>>>({});
  const [size, setSize] = useState<CleaningSize>("two");
  const [type, setType] = useState<CleaningType>("standard");
  const [frequency, setFrequency] = useState<CleaningFrequency>("once");
  const [oven, setOven] = useState(false);
  const [fridge, setFridge] = useState(false);
  const [zip, setZip] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(
    () =>
      mode === "junk"
        ? estimateJunk({ service, extras })
        : estimateCleaning({ size, type, frequency, oven, fridge }),
    [mode, service, extras, size, type, frequency, oven, fridge],
  );

  const zone = zoneForZip(zip);
  const truck = mode === "junk" && usesTruck(service);

  const summary = useMemo(() => {
    if (mode === "junk") {
      const parts = EXTRA_ORDER.filter((k) => truck && (extras[k] ?? 0) > 0).map(
        (k) => `${extras[k]}x ${PRICING.junkExtras[k].label}`,
      );
      return `${PRICING.junk[service].label}${parts.length ? ` + ${parts.join(", ")}` : ""}`;
    }
    const addOns = [oven && "inside oven", fridge && "inside fridge"].filter(Boolean).join(", ");
    return `House cleaning, ${SIZE_LABELS[size]}, ${TYPE_LABELS[type]}, ${FREQ_LABELS[frequency]}${addOns ? `, ${addOns}` : ""}`;
  }, [mode, service, extras, truck, size, type, frequency, oven, fridge]);

  const bump = (key: JunkExtra, delta: number) =>
    setExtras((prev) => ({ ...prev, [key]: Math.max(0, Math.min(9, (prev[key] ?? 0) + delta)) }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const note = ((data.get("note") as string) || "").trim();

    const { ok } = await submitLead({
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      email: ((data.get("email") as string) || "").trim(),
      timeline: data.get("timeline") as string,
      message: `[ESTIMATE $${total}] ${summary} | ZIP ${zip || "not given"}${note ? ` | ${note}` : ""}`,
      source: "estimator",
    });

    setLoading(false);
    if (!ok) {
      setError("We couldn't save your request. Please text us at (415) 590-9677.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="estimate" className="bg-muted">
      <div className="section-padding">
        <div className="container-narrow">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-3">
              Get your price in 30 seconds
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Pick a service and see the price right away. No phone call needed. We confirm the final number from your
              photos before we book.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-6 min-w-0">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Service category">
                <button type="button" aria-pressed={mode === "junk"} onClick={() => setMode("junk")} className={pillClass(mode === "junk")}>
                  Junk removal &amp; garage
                </button>
                <button type="button" aria-pressed={mode === "cleaning"} onClick={() => setMode("cleaning")} className={pillClass(mode === "cleaning")}>
                  House cleaning
                </button>
              </div>

              {mode === "junk" ? (
                <>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">What do you need?</legend>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {JUNK_ORDER.map((key) => (
                        <button key={key} type="button" aria-pressed={service === key} onClick={() => setService(key)} className={optionClass(service === key)}>
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-bold text-primary">{PRICING.junk[key].label}</span>
                            <span className="font-bold text-primary tabular-nums">${PRICING.junk[key].price}</span>
                          </span>
                          <span className="block text-sm text-muted-foreground mt-1">{PRICING.junk[key].blurb}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {truck && (
                    <fieldset>
                      <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Any of these in the load?</legend>
                      <div className="space-y-2">
                        {EXTRA_ORDER.map((key) => (
                          <div key={key} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-4 py-2.5">
                            <span className="text-sm text-foreground min-w-0">
                              {PRICING.junkExtras[key].label}{" "}
                              <span className="text-muted-foreground">+${PRICING.junkExtras[key].price} each</span>
                            </span>
                            <span className="flex items-center gap-3 flex-shrink-0">
                              <button type="button" onClick={() => bump(key, -1)} aria-label={`Fewer: ${PRICING.junkExtras[key].label}`} className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-primary hover:bg-muted">
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-4 text-center font-bold tabular-nums text-primary">{extras[key] ?? 0}</span>
                              <button type="button" onClick={() => bump(key, 1)} aria-label={`More: ${PRICING.junkExtras[key].label}`} className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-primary hover:bg-muted">
                                <Plus className="h-4 w-4" />
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        We can't take paint, solvents or other hazardous liquids. We'll point you to the right drop-off.
                      </p>
                    </fieldset>
                  )}
                </>
              ) : (
                <>
                  <fieldset>
                    <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Home size</legend>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(SIZE_LABELS) as CleaningSize[]).map((k) => (
                        <button key={k} type="button" aria-pressed={size === k} onClick={() => setSize(k)} className={pillClass(size === k)}>
                          {SIZE_LABELS[k]}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Bathrooms are included. Bigger than 3 bedrooms? Text us for a quote.</p>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Type of clean</legend>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(TYPE_LABELS) as CleaningType[]).map((k) => (
                        <button key={k} type="button" aria-pressed={type === k} onClick={() => setType(k)} className={pillClass(type === k)}>
                          {TYPE_LABELS[k]}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">How often</legend>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(FREQ_LABELS) as CleaningFrequency[]).map((k) => (
                        <button key={k} type="button" aria-pressed={frequency === k} onClick={() => setFrequency(k)} className={pillClass(frequency === k)}>
                          {FREQ_LABELS[k]}
                          {PRICING.cleaning.frequency[k] > 0 && ` (${Math.round(PRICING.cleaning.frequency[k] * 100)}% off)`}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Add-ons</legend>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" aria-pressed={oven} onClick={() => setOven(!oven)} className={pillClass(oven)}>
                        Inside oven +${PRICING.cleaning.extras.oven}
                      </button>
                      <button type="button" aria-pressed={fridge} onClick={() => setFridge(!fridge)} className={pillClass(fridge)}>
                        Inside fridge +${PRICING.cleaning.extras.fridge}
                      </button>
                    </div>
                  </fieldset>
                </>
              )}

              <div>
                <label htmlFor="estimate-zip" className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Your ZIP code
                </label>
                <input
                  id="estimate-zip"
                  inputMode="numeric"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                  placeholder="94116"
                  className={`${inputClass} max-w-[10rem]`}
                />
                {zone === "peninsula" && (
                  <p className="text-xs text-muted-foreground mt-2">We serve the Peninsula. We'll confirm the price once we check the distance.</p>
                )}
                {zone === "outside" && (
                  <p className="text-xs text-muted-foreground mt-2">That may be outside our usual area. Send the request and we'll tell you if we can cover it.</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 lg:sticky lg:top-24 rounded-xl bg-primary text-primary-foreground p-6 sm:p-8 shadow-xl min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-[rgba(255,255,255,0.5)]">Your estimate</p>
              <p className="text-6xl font-extrabold tracking-tighter tabular-nums mt-2" aria-live="polite">
                ${total}
                {mode === "cleaning" && frequency !== "once" && (
                  <span className="text-base font-semibold tracking-normal text-[rgba(255,255,255,0.6)]"> per visit</span>
                )}
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.8)] mt-3">{summary}</p>
              <p className="text-xs text-[rgba(255,255,255,0.5)] mt-2">
                This is an estimate. We lock the final price after we see photos, before any work starts.
              </p>

              <div className="border-t border-[rgba(255,255,255,0.15)] mt-6 pt-6">
                {submitted ? (
                  <div>
                    <p className="text-lg font-bold">Request received.</p>
                    <p className="text-sm text-[rgba(255,255,255,0.8)] mt-2">
                      Next step: text a few photos to <span className="font-bold whitespace-nowrap">(415) 590-9677</span> and we'll confirm your price.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <p className="text-sm font-semibold">Lock in this price</p>
                    <input required name="name" type="text" placeholder="Your name" autoComplete="name" className={inputClass} />
                    <input required name="phone" type="tel" placeholder="Phone number" autoComplete="tel" className={inputClass} />
                    <input name="email" type="email" placeholder="Email (optional)" autoComplete="email" className={inputClass} />
                    <select required name="timeline" defaultValue="" className={inputClass}>
                      <option value="" disabled>When do you need it?</option>
                      <option value="this-week">This week</option>
                      <option value="next-2-weeks">Next 2 weeks</option>
                      <option value="next-month">Next month</option>
                    </select>
                    <input name="note" type="text" placeholder="Anything we should know? (optional)" className={inputClass} />
                    {error && <p className="text-sm text-red-300">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-orange hover:brightness-110 active:scale-[0.98] transition-all rounded-lg font-bold text-lg text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] disabled:opacity-60"
                    >
                      {loading ? "Sending..." : "Send my request"}
                    </button>
                    <p className="text-xs text-[rgba(255,255,255,0.5)]">
                      Or text photos straight to (415) 590-9677.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EstimatorSection;
