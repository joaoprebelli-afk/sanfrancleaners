import { Suspense, lazy, useMemo, useState } from "react";
import { Check } from "lucide-react";
import Segmented from "./Segmented";
import Stepper from "./Stepper";
import {
  PRICING,
  estimateCleaning,
  estimateJunk,
  takesBins,
  usesTruck,
  zoneForZip,
  type BinType,
  type CleaningFrequency,
  type CleaningSize,
  type CleaningType,
  type JunkExtra,
  type JunkService,
} from "@/lib/estimate";

// The booking sheet pulls in the drawer and the Supabase client. Load it only when someone books.
const BookSheet = lazy(() => import("./BookSheet"));
const preloadSheet = () => void import("./BookSheet");

export type Mode = "junk" | "cleaning";

const JUNK_ORDER: JunkService[] = ["donation", "carload", "double", "bigitem", "haul", "garage", "organize"];
const EXTRA_ORDER: JunkExtra[] = ["fridge", "appliance", "mattress", "tire"];
const BIN_ORDER: BinType[] = ["black", "clear"];

const SIZE_LABELS: Record<CleaningSize, string> = { studio: "Studio / 1 bd", two: "2 bd", three: "3 bd" };
const TYPE_LABELS: Record<CleaningType, string> = { standard: "Standard", deep: "Deep", moveout: "Move-out" };
const FREQ_LABELS: Record<CleaningFrequency, string> = { once: "One time", biweekly: "Every 2 wks", weekly: "Weekly" };

type Props = {
  initialMode?: Mode;
  initialService?: JunkService | null;
  lockMode?: boolean;
  title?: string;
  intro?: string;
};

const Toggle = ({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) => (
  <label className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 px-4 py-3">
    <span className="min-w-0">
      <span className="block text-[17px] text-slate">{label}</span>
      {hint && <span className="block text-[14px] text-concrete">{hint}</span>}
    </span>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
    <span
      aria-hidden
      className={`relative h-[31px] w-[51px] flex-shrink-0 rounded-full transition-colors peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal ${
        checked ? "bg-signal" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </span>
  </label>
);

const GroupTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-2 mt-7 px-1 text-[15px] font-semibold text-concrete">{children}</h3>
);

const Estimator = ({ initialMode = "junk", initialService = null, lockMode = false, title, intro }: Props) => {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [service, setService] = useState<JunkService | null>(initialService);
  const [extras, setExtras] = useState<Partial<Record<JunkExtra, number>>>({});
  const [bins, setBins] = useState<Partial<Record<BinType, number>>>({});
  const [install, setInstall] = useState(false);
  const [size, setSize] = useState<CleaningSize>("two");
  const [type, setType] = useState<CleaningType>("standard");
  const [frequency, setFrequency] = useState<CleaningFrequency>("once");
  const [oven, setOven] = useState(false);
  const [fridge, setFridge] = useState(false);
  const [zip, setZip] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetUsed, setSheetUsed] = useState(false);
  const openSheet = () => {
    setSheetUsed(true);
    setSheetOpen(true);
  };
  const pick = (key: JunkService) => {
    setService(key);
    preloadSheet();
  };

  const ready = mode === "cleaning" || service !== null;
  const truck = mode === "junk" && service !== null && usesTruck(service);
  const binsOn = mode === "junk" && service !== null && takesBins(service);

  const total = useMemo(() => {
    if (mode === "cleaning") return estimateCleaning({ size, type, frequency, oven, fridge });
    return service ? estimateJunk({ service, extras, bins }) : 0;
  }, [mode, service, extras, bins, size, type, frequency, oven, fridge]);

  const serviceLabel =
    mode === "cleaning" ? `${TYPE_LABELS[type]} house cleaning` : service ? PRICING.junk[service].label : "";

  const summary = useMemo(() => {
    if (mode === "cleaning") {
      const addOns = [oven && "inside oven", fridge && "inside fridge"].filter(Boolean).join(", ");
      return `House cleaning: ${SIZE_LABELS[size]}, ${TYPE_LABELS[type]}, ${FREQ_LABELS[frequency]}${addOns ? `, ${addOns}` : ""}`;
    }
    if (!service) return "";
    const parts: string[] = [];
    if (truck) EXTRA_ORDER.forEach((k) => (extras[k] ?? 0) > 0 && parts.push(`${extras[k]}x ${PRICING.junkExtras[k].label}`));
    if (binsOn) BIN_ORDER.forEach((k) => (bins[k] ?? 0) > 0 && parts.push(`${bins[k]}x ${PRICING.bins[k].label}`));
    if (service === "garage" && install) parts.push("wants shelving / wall-mount install quote");
    return `${PRICING.junk[service].label}${parts.length ? ` + ${parts.join(", ")}` : ""}`;
  }, [mode, service, truck, binsOn, extras, bins, install, size, type, frequency, oven, fridge]);

  const zone = zoneForZip(zip);
  const perVisit = mode === "cleaning" && frequency !== "once";

  return (
    <section id="price" className="band bg-fog">
      <div className="wrap">
        <div className="max-w-2xl">
          <h2 className="heading text-[30px] text-slate sm:text-[40px]">{title ?? "Pick what you need. See your estimate."}</h2>
          <p className="prose-copy mt-3">
            {intro ??
              "Prices for San Francisco and the Peninsula."}
          </p>
          <p className="mt-4 rounded-[14px] bg-white px-4 py-3 text-[15px] leading-snug text-slate ring-1 ring-line">
            <span className="font-semibold">These are estimates.</span> The final price depends on your city, how much there is,
            what the job needs and how far we drive. We send you the exact price by text or email before anything is booked.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            {!lockMode && (
              <Segmented
                label="Service type"
                value={mode}
                onChange={setMode}
                options={[
                  { value: "junk", label: "Junk & garage" },
                  { value: "cleaning", label: "House cleaning" },
                ]}
              />
            )}

            {mode === "junk" ? (
              <>
                <GroupTitle>What's going?</GroupTitle>
                <div className="group-list" role="radiogroup" aria-label="Junk removal service">
                  {JUNK_ORDER.map((key) => {
                    const active = service === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => pick(key)}
                        className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors active:bg-fog ${active ? "bg-signal/[0.07]" : ""}`}
                      >
                        <span
                          aria-hidden
                          className={`mt-1 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full ${
                            active ? "bg-signal" : "ring-[1.5px] ring-inset ring-line"
                          }`}
                        >
                          {active && <Check className="h-3.5 w-3.5 text-slate" strokeWidth={3.5} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="text-[17px] font-semibold text-slate">{PRICING.junk[key].label}</span>
                            <span className="price text-[19px] text-slate">${PRICING.junk[key].price}</span>
                          </span>
                          <span className="mt-0.5 block text-[15px] leading-snug text-concrete">{PRICING.junk[key].blurb}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {truck && (
                  <>
                    <GroupTitle>Any of these in the load?</GroupTitle>
                    <div className="group-list">
                      {EXTRA_ORDER.map((key) => (
                        <div key={key} className="flex items-center justify-between gap-3 py-1.5 pl-4 pr-2">
                          <span className="min-w-0 text-[16px] leading-snug text-slate">
                            {PRICING.junkExtras[key].label}
                            <span className="block text-[14px] text-concrete">+${PRICING.junkExtras[key].price} each</span>
                          </span>
                          <Stepper
                            label={PRICING.junkExtras[key].label}
                            value={extras[key] ?? 0}
                            onChange={(v) => setExtras((p) => ({ ...p, [key]: v }))}
                            max={9}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 px-1 text-[14px] text-concrete">
                      We can't take paint, solvents or other hazardous liquids. We'll tell you where to drop them off.
                    </p>
                  </>
                )}

                {binsOn && (
                  <>
                    <GroupTitle>Storage bins (optional)</GroupTitle>
                    <div className="group-list">
                      {BIN_ORDER.map((key) => (
                        <div key={key} className="flex items-center justify-between gap-3 py-1.5 pl-4 pr-2">
                          <span className="min-w-0 text-[16px] leading-snug text-slate">
                            {PRICING.bins[key].label}
                            <span className="block text-[14px] text-concrete">${PRICING.bins[key].price} each</span>
                          </span>
                          <Stepper
                            label={PRICING.bins[key].label}
                            value={bins[key] ?? 0}
                            onChange={(v) => setBins((p) => ({ ...p, [key]: v }))}
                          />
                        </div>
                      ))}
                      {service === "garage" && (
                        <Toggle
                          checked={install}
                          onChange={setInstall}
                          label="Shelving or wall-mount install"
                          hint="Priced from your photos, added to your final price"
                        />
                      )}
                    </div>
                    <p className="mt-2 px-1 text-[14px] text-concrete">
                      Bins aren't included in the estimate. Skip them if you have your own; we'll reuse what you've got.
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                <GroupTitle>Home size</GroupTitle>
                <Segmented
                  label="Home size"
                  value={size}
                  onChange={setSize}
                  options={(Object.keys(SIZE_LABELS) as CleaningSize[]).map((k) => ({ value: k, label: SIZE_LABELS[k] }))}
                />
                <p className="mt-2 px-1 text-[14px] text-concrete">Bathrooms included. Bigger home? Send the request and we'll quote it.</p>

                <GroupTitle>Type of clean</GroupTitle>
                <Segmented
                  label="Type of clean"
                  value={type}
                  onChange={setType}
                  options={(Object.keys(TYPE_LABELS) as CleaningType[]).map((k) => ({ value: k, label: TYPE_LABELS[k] }))}
                />

                <GroupTitle>How often</GroupTitle>
                <Segmented
                  label="How often"
                  value={frequency}
                  onChange={setFrequency}
                  options={(Object.keys(FREQ_LABELS) as CleaningFrequency[]).map((k) => ({ value: k, label: FREQ_LABELS[k] }))}
                />
                <p className="mt-2 px-1 text-[14px] text-concrete">Every 2 weeks saves 10%. Weekly saves 20%.</p>

                <GroupTitle>Add-ons</GroupTitle>
                <div className="group-list">
                  <Toggle checked={oven} onChange={setOven} label="Inside the oven" hint={`+$${PRICING.cleaning.extras.oven}`} />
                  <Toggle checked={fridge} onChange={setFridge} label="Inside the fridge" hint={`+$${PRICING.cleaning.extras.fridge}`} />
                </div>
              </>
            )}

            <GroupTitle>
              <label htmlFor="zip">Your ZIP code</label>
            </GroupTitle>
            <input
              id="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              placeholder="94116"
              className="field max-w-[11rem]"
            />
            {zone === "peninsula" && mode === "junk" && (
              <p className="mt-2 px-1 text-[14px] text-concrete">You're in our Peninsula area. The drive is factored into your final price.</p>
            )}
            {zone === "outside" && mode === "junk" && (
              <p className="mt-2 px-1 text-[14px] text-concrete">
                Junk jobs are San Francisco and the Peninsula only for now. Send the request anyway and we'll tell you if we can make it work.
              </p>
            )}
          </div>

          {/* Desktop summary */}
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="rounded-[20px] bg-slate p-6 text-white">
              <p className="text-[15px] text-white/70">{ready ? serviceLabel : "Your estimate"}</p>
              <p className={`price mt-1 leading-none ${ready ? "text-[56px]" : "text-[40px] text-white/80"}`} aria-live="polite">
                {ready ? `$${total}` : "From $99"}
                {perVisit && <span className="ml-1 text-[17px] font-semibold tracking-normal text-white/70">per visit</span>}
              </p>
              {(!ready || summary !== serviceLabel) && (
                <p className="mt-3 text-[15px] leading-snug text-white/80">{ready ? summary : "Pick a service on the left."}</p>
              )}
              <button type="button" disabled={!ready} onClick={openSheet} className="btn-signal mt-6 w-full disabled:bg-white/15 disabled:text-white/60 disabled:opacity-100">
                Get my final price
              </button>
              <p className="mt-3 text-[13px] text-white/60">Estimate only. We send the final price by text or email. No payment now.</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile price bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl pb-safe lg:hidden">
        <div className="wrap flex items-center gap-3 pt-3">
          <div className="min-w-0 flex-1">
            {ready ? (
              <>
                <p className="price text-[28px] leading-none text-slate" aria-live="polite">
                  ${total}
                  {perVisit && <span className="ml-1 text-[14px] font-semibold tracking-normal text-concrete">/visit</span>}
                </p>
                <p className="mt-1 truncate text-[14px] text-concrete">Estimate, {serviceLabel}</p>
              </>
            ) : (
              <p className="text-[15px] leading-snug text-slate">
                Junk removal from <span className="price">$99</span>
                <span className="block text-concrete">Pick a service to see yours</span>
              </p>
            )}
          </div>
          {ready ? (
            <button type="button" onClick={openSheet} className="btn-signal flex-shrink-0">
              Get price
            </button>
          ) : (
            <a href="#price" className="btn-signal flex-shrink-0">
              See prices
            </a>
          )}
        </div>
      </div>

      {sheetUsed && (
        <Suspense fallback={null}>
          <BookSheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            total={total}
            serviceLabel={serviceLabel}
            summary={summary}
            zip={zip}
            perVisit={perVisit}
          />
        </Suspense>
      )}
    </section>
  );
};

export default Estimator;
