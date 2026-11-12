import { useCallback, useRef, useState } from "react";

const Picture = ({ name, alt, eager }: { name: "before" | "after"; alt: string; eager?: boolean }) => (
  <picture>
    <source type="image/webp" srcSet={`/img/${name}-760.webp 760w, /img/${name}-1280.webp 1280w`} sizes="(min-width: 1024px) 640px, 100vw" />
    <img
      src={`/img/${name}-760.jpg`}
      srcSet={`/img/${name}-760.jpg 760w, /img/${name}-1280.jpg 1280w`}
      sizes="(min-width: 1024px) 640px, 100vw"
      alt={alt}
      width={1280}
      height={714}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
  </picture>
);

/** Drag (or use arrow keys) to compare. Real job photos, same garage, same angle. */
const BeforeAfter = ({ eager = false }: { eager?: boolean }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <figure>
      <div
        ref={ref}
        className="relative aspect-[1280/714] w-full touch-pan-y select-none overflow-hidden rounded-[18px] bg-fog"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Picture name="after" alt="The same San Francisco garage after: floor clear, bikes racked, items in labeled bins on shelves" eager={eager} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Picture name="before" alt="A San Francisco garage before: boxes, bikes and tools covering the floor" eager={eager} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M5 3L2 8L5 13M11 3L14 8L11 13" stroke="#252C32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate/80 px-3 py-1 text-[13px] font-semibold text-white">Before</span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold text-slate">After</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="sr-only"
        />
      </div>
      <figcaption className="mt-3 px-1 text-[15px] text-concrete">A real garage reset in San Francisco. Drag to compare.</figcaption>
    </figure>
  );
};

export default BeforeAfter;
