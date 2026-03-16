import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import { Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ComparisonSliderProps {
  beforeAlt: string;
  afterAlt: string;
  beforeSrc?: string;
  afterSrc?: string;
}

const ComparisonSlider = ({ beforeAlt, afterAlt, beforeSrc, afterSrc }: ComparisonSliderProps) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-sm select-none touch-none cursor-col-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* After (full) */}
      <div className="absolute inset-0">
        {afterSrc ? (
          <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-teal/10 flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">After — Photo Coming Soon</span>
          </div>
        )}
      </div>
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {beforeSrc ? (
          <img src={beforeSrc} alt={beforeAlt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-medium">Before — Photo Coming Soon</span>
          </div>
        )}
      </div>
      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-orange -translate-x-1/2 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-orange rounded-full flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-foreground">
            <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 bg-primary/80 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full z-20">Before</span>
      <span className="absolute top-3 right-3 bg-teal/80 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full z-20">After</span>
    </div>
  );
};

const projects = [
  {
    title: "Mission District, San Francisco",
    beforeAlt: "Cluttered garage before cleanout Mission District San Francisco",
    afterAlt: "Organized garage after SanFranCleaners reset Mission District SF",
    beforeSrc: "/images/before.jpg",
    afterSrc: "/images/after.jpg",
    caption: "Full garage reset — 6 hours. Cardboard boxes removed, HDX bins installed, tools and sports equipment organized.",
  },
  {
    title: "Oakland Hills",
    beforeAlt: "Messy garage before junk removal Oakland Bay Area",
    afterAlt: "Clean organized garage after reset service Oakland",
    caption: "Estate cleanout + garage reset — 8 hours. 2 truckloads of junk removed, remainder fully organized.",
  },
  {
    title: "Berkeley",
    beforeAlt: "Garage declutter before Berkeley California",
    afterAlt: "Garage organization after service Berkeley Bay Area",
    caption: "Family garage reset — 5 hours. Sports equipment, tools, and seasonal items sorted into labeled bins.",
  },
  {
    title: "Daly City",
    beforeAlt: "Before garage cleanout Daly City San Francisco Bay Area",
    afterAlt: "After garage organization Daly City",
    caption: "Pre-sale garage cleanout — 4 hours. Home listed the following week.",
  },
];

const BeforeAfter = () => (
  <>
    <Helmet>
      <title>Garage Before & After | SanFranCleaners Bay Area</title>
      <meta name="description" content="See real garage transformations by SanFranCleaners. Before and after photos of garage cleanouts in San Francisco Bay Area. Full reset in one day." />
      <link rel="canonical" href="https://sanfrancleaners.net/before-after" />
    </Helmet>

    <Navbar />

    {/* Hero */}
    <section className="pt-16 bg-background">
      <div className="section-padding">
        <div className="container-narrow max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-primary leading-[1.08] mb-6">
            Garage Transformations —{" "}
            <span className="text-orange">Before & After</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real results from real Bay Area garages. Each project is a complete Garage Reset — junk removed, cardboard boxes replaced, everything organized. One day. Fixed price.
          </p>
        </div>
      </div>
    </section>

    {/* Projects */}
    {projects.map((p, i) => (
      <section key={i} className={i % 2 === 0 ? "bg-surface-muted" : "bg-background"}>
        <div className="section-padding">
          <div className="container-narrow max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-primary mb-6">
              {p.title}
            </h2>
            <ComparisonSlider beforeAlt={p.beforeAlt} afterAlt={p.afterAlt} />
            <p className="text-sm text-muted-foreground mt-4 italic leading-relaxed">{p.caption}</p>
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="bg-primary">
      <div className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary-foreground mb-4">
            Want results like these for your garage?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <a href="/#contact" className="inline-flex items-center justify-center px-7 py-3.5 bg-orange text-accent-foreground font-bold rounded-lg text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] hover:brightness-110 active:scale-[0.98] transition-all">
              Get Your Free Quote
            </a>
            <a href="tel:+14155909677" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[rgba(255,255,255,0.2)] text-primary-foreground font-semibold rounded-lg text-base hover:bg-[rgba(255,255,255,0.1)] transition-colors active:scale-[0.98]">
              <Phone className="h-4 w-4" /> (415) 590-9677
            </a>
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.6)]">
            Serving San Francisco, Oakland, Berkeley, Daly City, San Mateo and the full Bay Area
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default BeforeAfter;
