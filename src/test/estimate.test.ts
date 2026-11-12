import { describe, it, expect } from "vitest";
import { estimateJunk, estimateCleaning, zoneForZip } from "@/lib/estimate";

describe("estimateJunk", () => {
  it("returns the flat price for each service", () => {
    expect(estimateJunk({ service: "donation", extras: {} })).toBe(99);
    expect(estimateJunk({ service: "garage", extras: {} })).toBe(699);
  });
  it("adds large-item extras on truck services", () => {
    expect(estimateJunk({ service: "bigitem", extras: { fridge: 1 } })).toBe(349);
    expect(estimateJunk({ service: "haul", extras: { mattress: 2, tire: 1 } })).toBe(479);
  });
  it("adds storage bins on garage and organize jobs only", () => {
    expect(estimateJunk({ service: "garage", extras: {}, bins: { black: 2, clear: 1 } })).toBe(756);
    expect(estimateJunk({ service: "carload", extras: {}, bins: { black: 5 } })).toBe(149);
  });
  it("ignores extras on services without a truck", () => {
    expect(estimateJunk({ service: "carload", extras: { fridge: 3 } })).toBe(149);
  });
});

describe("estimateCleaning", () => {
  const base = { size: "two", type: "standard", frequency: "once", oven: false, fridge: false } as const;
  it("prices a standard two bedroom", () => {
    expect(estimateCleaning(base)).toBe(170);
  });
  it("applies type, extras and recurring discount", () => {
    expect(estimateCleaning({ ...base, type: "deep" })).toBe(255);
    expect(estimateCleaning({ ...base, oven: true, fridge: true })).toBe(250);
    expect(estimateCleaning({ ...base, frequency: "weekly" })).toBe(135);
    expect(estimateCleaning({ ...base, frequency: "biweekly" })).toBe(155);
    expect(estimateCleaning({ ...base, size: "three", type: "moveout" })).toBe(395);
  });
});

describe("zoneForZip", () => {
  it("classifies ZIP codes", () => {
    expect(zoneForZip("94116")).toBe("sf");
    expect(zoneForZip("94401")).toBe("peninsula");
    expect(zoneForZip("94014")).toBe("peninsula");
    expect(zoneForZip("94601")).toBe("outside");
    expect(zoneForZip("941")).toBe("unknown");
  });
});
