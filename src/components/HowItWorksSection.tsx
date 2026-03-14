import { ClipboardList, ThumbsUp, Truck, LayoutGrid, PartyPopper } from "lucide-react";

const steps = [
  { icon: ClipboardList, num: "1", title: "Free Walkthrough", desc: "We visit your garage and assess the situation." },
  { icon: ThumbsUp, num: "2", title: "You Decide", desc: "Review the plan and pricing — no obligation." },
  { icon: Truck, num: "3", title: "We Remove", desc: "All junk hauled away, responsibly." },
  { icon: LayoutGrid, num: "4", title: "We Organize", desc: "Everything categorized into HDX bins." },
  { icon: PartyPopper, num: "5", title: "Garage Reset Complete", desc: "Park your car again. Enjoy the space." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="bg-surface-muted">
    <div className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-14 text-center">
          The Garage Reset Process
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-teal" />
          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 relative z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)]">
                {s.num}
              </div>
              <h3 className="font-bold text-sm text-primary mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
