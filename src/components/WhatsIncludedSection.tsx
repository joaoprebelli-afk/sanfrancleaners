import { Check, X } from "lucide-react";

const included = [
  "Junk removal and hauling",
  "Cardboard box replacement with HDX storage bins",
  "Organization by category (tools, sports, seasonal, cleaning)",
  "Full garage reset",
];

const excluded = [
  "NO shelf installation",
  "NO wall mounting systems",
];

const WhatsIncludedSection = () => (
  <section className="bg-background">
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-10">
          What's Included
        </h2>
        <ul className="space-y-4 mb-8">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-teal" />
              </span>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-4">
          {excluded.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="h-4 w-4 text-destructive" />
              </span>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default WhatsIncludedSection;
