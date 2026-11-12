// Public price list for the instant estimator.
// Every number a customer sees lives in PRICING. Change prices here only.

export const PRICING = {
  junk: {
    garage: {
      label: "Garage Reset",
      price: 699,
      blurb: "Two-person crew and truck for the day. We haul the junk, donate what's usable and organize what stays.",
    },
    haul: { label: "Haul-Only", price: 399, blurb: "Up to half a truck, carried out of the house. No sorting or organizing." },
    bigitem: { label: "Big Item Pickup", price: 249, blurb: "One or two large items, like a sofa, mattress or appliance." },
    double: { label: "Double Car Load", price: 249, blurb: "Two cars full, in a single trip." },
    carload: { label: "Car Load", price: 149, blurb: "Bags, boxes, chairs, small furniture, TVs. About one hatchback full." },
    donation: { label: "Donation Run", price: 99, blurb: "Donatable items only. We drop them at a local charity and send you the receipt." },
    organize: { label: "Organize-Only", price: 299, blurb: "Two people, two hours, sorting and organizing. Nothing hauled away." },
  },
  // Large items that cost extra to dispose of. Only on services that use a truck.
  junkExtras: {
    fridge: { label: "Refrigerator or freezer", price: 100 },
    appliance: { label: "Washer, dryer, stove or dishwasher", price: 50 },
    mattress: { label: "Mattress or box spring", price: 25 },
    tire: { label: "Tire", price: 30 },
  },
  // Storage bins we buy and bring. Home Depot cost + sales tax + 50%, rounded.
  bins: {
    black: { label: "HDX 27 gal, black with yellow lid", price: 16 },
    clear: { label: "HDX clear bin with lid", price: 25 },
  },
  cleaning: {
    base: { studio: 140, two: 170, three: 220 },
    type: { standard: 1, deep: 1.5, moveout: 1.8 },
    extras: { oven: 30, fridge: 50 },
    frequency: { once: 0, biweekly: 0.1, weekly: 0.2 },
  },
} as const;

export type JunkService = keyof typeof PRICING.junk;
export type JunkExtra = keyof typeof PRICING.junkExtras;
export type BinType = keyof typeof PRICING.bins;
export type CleaningSize = keyof typeof PRICING.cleaning.base;
export type CleaningType = keyof typeof PRICING.cleaning.type;
export type CleaningFrequency = keyof typeof PRICING.cleaning.frequency;

export const TRUCK_SERVICES: JunkService[] = ["bigitem", "haul", "garage"];
export const BIN_SERVICES: JunkService[] = ["garage", "organize"];

export const usesTruck = (service: JunkService) => TRUCK_SERVICES.includes(service);
export const takesBins = (service: JunkService) => BIN_SERVICES.includes(service);

const count = (n: number | undefined) => Math.max(0, Math.floor(n ?? 0));

export type JunkInput = {
  service: JunkService;
  extras: Partial<Record<JunkExtra, number>>;
  bins?: Partial<Record<BinType, number>>;
};

export function estimateJunk({ service, extras, bins = {} }: JunkInput): number {
  let total = PRICING.junk[service].price;
  if (usesTruck(service)) {
    for (const key of Object.keys(PRICING.junkExtras) as JunkExtra[]) {
      total += count(extras[key]) * PRICING.junkExtras[key].price;
    }
  }
  if (takesBins(service)) {
    for (const key of Object.keys(PRICING.bins) as BinType[]) {
      total += count(bins[key]) * PRICING.bins[key].price;
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
