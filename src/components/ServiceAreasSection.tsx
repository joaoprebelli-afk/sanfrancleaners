import { MapPin } from "lucide-react";

const cities = [
  "San Francisco", "Oakland", "Berkeley", "Daly City",
  "South San Francisco", "San Mateo", "and surrounding areas",
];

const ServiceAreasSection = () => (
  <section className="bg-surface-muted">
    <div className="section-padding">
      <div className="container-narrow">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-8">
          Service Areas
        </h2>
        <div className="flex flex-wrap gap-3">
          {cities.map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-teal" /> {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ServiceAreasSection;
