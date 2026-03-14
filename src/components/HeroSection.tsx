import { Phone } from "lucide-react";
import heroImage from "@/assets/hero-garage.jpg";

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

        {/* Image — 2 cols */}
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.05)] border border-border aspect-[4/3]">
            <img src={heroImage} alt="Garage cleanout service San Francisco Bay Area" className="w-full h-full object-cover" loading="eager" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
