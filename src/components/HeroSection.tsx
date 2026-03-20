import { Phone } from "lucide-react";
import { useState, useRef, useCallback } from "react";

const HeroComparisonSlider = () => {
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
        <img src="/images/after.jpg" alt="Organized garage after SanFranCleaners reset" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src="/images/before.jpg" alt="Cluttered garage before cleanout" className="absolute inset-0 w-full h-full object-cover" />
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

const HeroSection = () => (
  <section className="relative pt-16">
    <div className="section-padding">
      <div className="container-narrow grid lg:grid-cols-5 gap-12 items-center">
        {/* Text — 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-primary leading-[1.08]" style={{ textWrap: "balance" } as React.CSSProperties}>
            Your Garage, Reset.{" "}
            <span className="text-orange">In One Day.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Bay Area garage cleanout and organization service. We remove the junk and reset your garage so you can use it again.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center justify-center px-7 py-3.5 bg-orange text-accent-foreground font-bold rounded-lg text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] hover:brightness-110 active:scale-[0.98] transition-all">
              Get Your Free Quote
            </a>
            <a href="tel:+14155909677" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-primary/20 text-primary font-semibold rounded-lg text-base hover:bg-muted transition-colors active:scale-[0.98]">
              <Phone className="h-4 w-4" /> (415) 590-9677
            </a>
          </div>
          {/* Trust bar */}
          <div className="flex flex-wrap gap-4 pt-4">
            {["Bay Area Owned", "Fixed Price", "Same-Day Quotes"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Before/After Slider — 2 cols */}
        <div className="lg:col-span-2">
          <HeroComparisonSlider />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
