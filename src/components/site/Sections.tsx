import { Check } from "lucide-react";
import { PENINSULA_CITIES, SF_NEIGHBORHOODS, SITE } from "@/lib/site";
import { PRICING } from "@/lib/estimate";

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: SITE.ogImage,
  logo: `${SITE.url}/icon-512.png`,
  priceRange: "$99–$699",
  address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA", addressCountry: "US" },
  areaServed: [
    { "@type": "City", name: "San Francisco" },
    ...PENINSULA_CITIES.map((name) => ({ "@type": "City", name })),
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Junk removal and garage services",
    itemListElement: Object.values(PRICING.junk).map((s) => ({
      "@type": "Offer",
      price: s.price,
      priceCurrency: "USD",
      itemOffered: { "@type": "Service", name: s.label, description: s.blurb },
    })),
  },
};

export const serviceSchema = (name: string, description: string, path: string, lowPrice: number, areas: string[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${SITE.url}${path}`,
  provider: { "@id": `${SITE.url}/#business` },
  areaServed: areas.map((a) => ({ "@type": "City", name: a })),
  offers: { "@type": "Offer", priceCurrency: "USD", price: lowPrice, description: `From $${lowPrice}` },
});

const STEPS = [
  { t: "Pick a service and send it", d: "Choose what you need above and see your estimate. Add a few photos if you have them." },
  { t: "We send your final price", d: "We look at your photos, the address and what the job needs, then send the exact price and a time by text or email. Nothing is booked until you say yes." },
  { t: "We show up and handle it", d: "Two of us, with a truck when the job needs one. We haul, donate what's usable and organize what stays." },
];

export const Steps = () => (
  <section className="band">
    <div className="wrap">
      <h2 className="heading text-[30px] text-slate sm:text-[40px]">How booking works</h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.t} className="flex gap-4 sm:block">
            <span className="price flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-slate text-[19px] text-white">{i + 1}</span>
            <span className="block sm:mt-4">
              <span className="block text-[19px] font-semibold text-slate">{s.t}</span>
              <span className="mt-1 block text-[16px] leading-relaxed text-concrete">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const INCLUDED = [
  "Walkthrough with you to decide what stays, what's donated and what goes",
  "Two-person crew, truck rental, gas and mileage",
  "Haul-away and the dump run for a typical garage. Very large loads are quoted from photos",
  "Usable items dropped at a local donation center",
  "Up to 3 hours sorting and organizing what you keep, so you can find it again",
];

const ON_REQUEST = [
  `Storage bins: HDX black ($${PRICING.bins.black.price}) or clear ($${PRICING.bins.clear.price}), as many as you want`,
  "Shelving or wall-mounted storage installed, quoted from your photos",
  "Fridges, appliances, mattresses and tires (small disposal fee each)",
];

export const GarageIncluded = () => (
  <section className="band bg-fog">
    <div className="wrap grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="heading text-[30px] text-slate sm:text-[40px]">What the $699 Garage Reset covers</h2>
        <ul className="mt-6 space-y-3">
          {INCLUDED.map((x) => (
            <li key={x} className="flex gap-3 text-[17px] leading-snug text-slate">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-signal" strokeWidth={3} />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="heading text-[22px] text-slate">Add if you want it</h3>
        <ul className="group-list mt-4">
          {ON_REQUEST.map((x) => (
            <li key={x} className="px-4 py-3.5 text-[16px] leading-snug text-slate">
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-3 px-1 text-[15px] text-concrete">Every add-on shows up in your estimate before you send it.</p>
      </div>
    </div>
  </section>
);

export const Areas = ({ cleaning = false }: { cleaning?: boolean }) => (
  <section className="band" id="areas">
    <div className="wrap">
      <h2 className="heading text-[30px] text-slate sm:text-[40px]">Where we work</h2>
      <p className="prose-copy mt-3">
        {cleaning
          ? "House cleaning covers the whole Bay Area. Send your ZIP code with the request and we'll match you with a cleaner nearby."
          : "Junk removal and garage jobs: every San Francisco neighborhood and the Peninsula from Daly City to Palo Alto. House cleaning covers the whole Bay Area."}
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-[17px] font-semibold text-slate">San Francisco</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-concrete">{SF_NEIGHBORHOODS.join(", ")} and the rest of the city.</p>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold text-slate">Peninsula</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-concrete">{PENINSULA_CITIES.join(", ")}.</p>
        </div>
      </div>
    </div>
  </section>
);
