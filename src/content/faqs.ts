import type { QA } from "@/components/site/Faq";
import { PRICING } from "@/lib/estimate";
import { SITE } from "@/lib/site";

const pricing: QA = {
  q: "How do you set the price?",
  a: "The price you see on this page is the price for that service. Send a few photos with your request and we confirm the final number by text before anything is booked. No hourly billing and no surprise fees on the day.",
};

const area: QA = {
  q: "Where do you work?",
  a: "Junk removal and garage jobs: all of San Francisco and the Peninsula, from Daly City down to Palo Alto. House cleaning covers the whole Bay Area.",
};

const stuff: QA = {
  q: "What happens to the things you take?",
  a: "Anything usable goes to a local donation center. Metal and electronics are recycled. The rest goes to a licensed transfer station. With the Donation Run we send you the donation receipt.",
};

const hazardous: QA = {
  q: "Is there anything you can't take?",
  a: "Paint, solvents, motor oil, propane tanks and other hazardous materials. We'll tell you where to drop those off in the city.",
};

const shelves: QA = {
  q: "Do you install shelves or wall storage?",
  a: "Yes, if you want it. Turn on the install option in the Garage Reset and send photos of the wall. We quote it with the rest of the job.",
};

const bins: QA = {
  q: "Are storage bins included?",
  a: `No, bins are optional so you only pay for what you need. We can bring HDX bins: black with a yellow lid for $${PRICING.bins.black.price} each or clear for $${PRICING.bins.clear.price} each. If you already have bins, we'll use yours.`,
};

const home: QA = {
  q: "Do I need to be home?",
  a: "For a Garage Reset, yes, at least at the start so we can walk through what stays and what goes. For pickups, you can leave the items outside or in the garage and send us the gate or door code.",
};

const howLong: QA = {
  q: "How long does a garage reset take?",
  a: "Most garages take one day. Pickups and car loads usually take under an hour.",
};

const payment: QA = {
  q: "How do I pay?",
  a: "We send a secure card payment link through Stripe. Nothing is charged when you send a request.",
};

const cleaningIncluded: QA = {
  q: "What's included in a house cleaning?",
  a: "Kitchen, bathrooms, bedrooms and living areas: dusting, surfaces, floors, sinks, toilets and showers. Bathrooms are never an extra. Inside the oven and inside the fridge are optional add-ons.",
};

const cleaningRecurring: QA = {
  q: "Do you offer recurring cleaning?",
  a: `Yes. Every two weeks saves ${PRICING.cleaning.frequency.biweekly * 100}% and weekly saves ${PRICING.cleaning.frequency.weekly * 100}% on every visit.`,
};

const cleaningDeep: QA = {
  q: "What's the difference between standard, deep and move-out?",
  a: "Standard keeps a lived-in home clean. Deep adds baseboards, door frames, built-up grime and the spots that get skipped. Move-out is a deep clean of an empty home, made for getting a deposit back.",
};

const contact: QA = {
  q: "Can I just text you?",
  a: `Yes. Text photos to ${SITE.phoneDisplay} and we'll reply with a price.`,
};

export const HOME_FAQ = [pricing, area, stuff, shelves, bins, hazardous, home, payment, contact];
export const JUNK_FAQ = [pricing, stuff, hazardous, home, area, payment];
export const GARAGE_FAQ = [pricing, howLong, shelves, bins, stuff, home, area];
export const CLEANING_FAQ = [cleaningIncluded, cleaningDeep, cleaningRecurring, pricing, payment, contact];
