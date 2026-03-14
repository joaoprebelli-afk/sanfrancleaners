import { Check } from "lucide-react";

const features = [
  "All junk removal & hauling",
  "HDX storage bins included",
  "Organization by category",
  "Full garage reset in one day",
];

const PricingSection = () => (
  <section id="pricing" className="bg-primary">
    <div className="section-padding">
      <div className="container-narrow flex justify-center">
        <div className="relative w-full max-w-md p-8 sm:p-10 rounded-xl bg-navy text-primary-foreground border border-[rgba(255,255,255,0.1)] shadow-2xl">
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-accent-foreground">
            Launch Special
          </div>

          <h3 className="text-center text-[rgba(255,255,255,0.5)] uppercase tracking-widest text-sm mt-2">
            Full Garage Reset
          </h3>

          <div className="flex items-center justify-center gap-4 my-6">
            <span className="text-6xl font-extrabold tracking-tighter">$699</span>
            <span className="text-2xl text-[rgba(255,255,255,0.4)] line-through">$899</span>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.8)]">
                <Check className="h-4 w-4 text-teal flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="block w-full py-4 bg-orange hover:brightness-110 transition-all active:scale-[0.98] rounded-lg font-bold text-lg text-center text-accent-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          >
            Book Your Garage Reset
          </a>

          <p className="text-center text-xs text-[rgba(255,255,255,0.4)] mt-4 italic">
            *Disposal fees may apply for extra-large volumes — always discussed before we start.
          </p>
          <p className="text-center text-xs text-orange font-semibold mt-3">
            Limited launch pricing — price increases to $899 soon
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PricingSection;
