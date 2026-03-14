import { Trophy, DollarSign, Recycle } from "lucide-react";

const cards = [
  { icon: Trophy, title: "Complete Service", desc: "Junk removal + organization in one visit. No need to hire two companies." },
  { icon: DollarSign, title: "Fixed Price", desc: "No hidden fees, no surprises. You know the cost before we start." },
  { icon: Recycle, title: "Eco-Responsible", desc: "We donate and recycle before dumping. Goodwill, Salvation Army, and metal recyclers." },
];

const WhyUsSection = () => (
  <section className="bg-background">
    <div className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-12">
          Why SanFranCleaners
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.05)]">
              <c.icon className="h-8 w-8 text-orange mb-4" />
              <h3 className="font-bold text-lg text-primary mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyUsSection;
