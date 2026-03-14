import { Package, Car, RefreshCw } from "lucide-react";

const problems = [
  { icon: Package, title: "Cardboard boxes from years ago", desc: "Stacked, crushed, and falling apart — taking up space for nothing." },
  { icon: Car, title: "No room to park your car", desc: "Your garage became a storage unit. Your car stays outside." },
  { icon: RefreshCw, title: "Random clutter with no system", desc: "Holiday decorations mixed with tools mixed with who-knows-what." },
];

const ProblemSection = () => (
  <section className="bg-primary text-primary-foreground">
    <div className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-12" style={{ textWrap: "balance" } as React.CSSProperties}>
          Does This Sound Like Your Garage?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((p) => (
            <div key={p.title} className="rounded-xl p-6 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
              <p.icon className="h-8 w-8 text-orange mb-4" />
              <h3 className="font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-[rgba(255,255,255,0.7)] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ProblemSection;
