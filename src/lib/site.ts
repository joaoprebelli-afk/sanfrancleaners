export const SITE = {
  name: "SanFranCleaners",
  url: "https://sanfran-cleaners.com",
  phone: "+14155909677",
  phoneDisplay: "(415) 590-9677",
  email: "sanfrancleaners@gmail.com",
  ogImage: "https://sanfran-cleaners.com/og.jpg",
} as const;

/** iOS reads `&body=`, Android reads `?body=`. iOS is the priority. */
export const smsHref = (body = "Hi! I'd like a price for") => `sms:${SITE.phone}&body=${encodeURIComponent(body)}`;
export const telHref = `tel:${SITE.phone}`;

export const SF_NEIGHBORHOODS = [
  "Sunset",
  "Richmond",
  "Mission",
  "Noe Valley",
  "Bernal Heights",
  "Excelsior",
  "Bayview",
  "Glen Park",
  "West Portal",
  "Parkside",
  "Ingleside",
  "Portola",
  "Visitacion Valley",
  "Potrero Hill",
  "Castro",
  "Haight",
  "Marina",
  "Pacific Heights",
  "SoMa",
  "Twin Peaks",
];

export const PENINSULA_CITIES = [
  "Daly City",
  "Brisbane",
  "Colma",
  "South San Francisco",
  "Pacifica",
  "San Bruno",
  "Millbrae",
  "Burlingame",
  "San Mateo",
  "Foster City",
  "Belmont",
  "San Carlos",
  "Redwood City",
  "Menlo Park",
  "Palo Alto",
];
