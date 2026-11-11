// Public price list for the instant estimator.
// Every number a customer sees lives in PRICING. Change prices here only.

export const PRICING = {
  junk: {
    donation: { label: "Donation Run", price: 99, blurb: "Donatable items only. We pick up, drop off at a local charity and send you the receipt." },
    carload: { label: "Car Load", price: 149, blurb: "Bags, boxes, chairs, small furniture, TVs. About one hatchback full." },
    double: { label: "Double Car Load", price: 249, blurb: "Two cars full in a single trip." },
    bigitem: { label: "Big Item Pickup", price: 249, blurb: "One or two large items: sofa, mattress, appliance." },
    haul: { label: "Haul-Only", price: 399, blurb: "Up to half a truck. We carry it out of the house. No sorting or organizing." },
    garage: { label: "Garage Reset", price: 699, blurb: "Two-person crew and truck. We haul the junk, donate what's usable and organize what stays." },
    organize: { label: "Organize-Only", price: 299, blurb: "Two people for two hours sorting and organizing. Nothing hauled away." },
  },
  // Large items that cost extra to dispose of. Only offered on services that use a truck.
  junkExtras: {
    fridge: { label: "Refrigerator or freezer", price: 50 },
    appliance: { label: "Washer, dryer, stove or dishwasher", price: 30 },
    mattress: { label: "Mattress or box spring", price: 20 },
    tire: { label: "Tire", price: 25 },
  },
  cleaning: {
    base: { studio: 140, two: 170, three: 220 },
    type: { standard: 1, deep: 1.5, moveout: 1.8 },
    extras: { oven: 30, fridge: 50 },
    frequency: { once: 0, biweekly: 0.1, weekly: 0.15 },
  },
} as const;

export type JunkService = keyof typeof PRICING.junk;
export type JunkExtra = keyof typeof PRICING.junkExtras;
export type CleaningSize = keyof typeof PRICING.cleaning.base;
export type CleaningType = keyof typeof PRICING.cleaning.type;
export type CleaningFrequency = keyof typeof PRICING.cleaning.frequency;

export const TRUCK_SERVICES: JunkService[] = ["bigitem", "haul", "garage"];

export const usesTruck = (service: JunkService) => TRUCK_SERVICES.includes(service);

export type JunkInput = { service: JunkService; extras: Partial<Record<JunkExtra, number>> };

export function estimateJunk({ service, extras }: JunkInput): number {
  let total = PRICING.junk[service].price;
  if (usesTruck(service)) {
    for (const key of Object.keys(PRICING.junkExtras) as JunkExtra[]) {
      total += Math.max(0, Math.floor(extras[key] ?? 0)) * PRICING.junkExtras[key].price;
    }
  }
  return total;
}

export type CleaningInput = {
  size: CleaningSize;
  type: CleaningType;
  frequency: CleaningFrequency;
  oven: boolean;
  fridge: boolean;
};

const roundTo5 = (n: number) => Math.round(n / 5) * 5;

export function estimateCleaning({ size, type, frequency, oven, fridge }: CleaningInput): number {
  const c = PRICING.cleaning;
  let total = c.base[size] * c.type[type];
  if (oven) total += c.extras.oven;
  if (fridge) total += c.extras.fridge;
  total *= 1 - c.frequency[frequency];
  return roundTo5(total);
}

export type Zone = "sf" | "peninsula" | "outside" | "unknown";

// 941xx is San Francisco. 940, 943 and 944 cover Daly City down to Palo Alto.
export function zoneForZip(zip: string): Zone {
  const z = zip.trim();
  if (!/^\d{5}$/.test(z)) return "unknown";
  const prefix = z.slice(0, 3);
  if (prefix === "941") return "sf";
  if (prefix === "940" || prefix === "943" || prefix === "944") return "peninsula";
  return "outside";
}
