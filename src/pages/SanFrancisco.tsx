import { Helmet } from "react-helmet-async";
import { MapPin, Car, DollarSign, Recycle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const neighborhoods = [
  "Mission District", "Pacific Heights", "Marina District", "Sunset District",
  "Richmond District", "SoMa", "Noe Valley", "Castro",
  "Bernal Heights", "Potrero Hill", "Inner/Outer Sunset", "Haight-Ashbury",
];

const whyCards = [
  {
    icon: Car,
    title: "SF Parking Is Precious",
    desc: "Most SF garages hold significant value as parking space. We clear the clutter so you can actually use it.",
  },
  {
    icon: DollarSign,
    title: "One Day, Fixed Price",
    desc: "No hourly rates, no surprises. $699 covers the full garage reset.",
  },
  {
    icon: Recycle,
    title: "Eco-Responsible Disposal",
    desc: "We donate to SF Goodwill and Salvation Army before dumping at Recology.",
  },
];

const faqs = [
  { q: "Do you serve all San Francisco neighborhoods?", a: "Yes. We serve all SF neighborhoods including the Mission, Sunset, Richmond, Pacific Heights, Marina, SoMa, Castro, Noe Valley, and more." },
  { q: "How much does garage cleanout cost in San Francisco?", a: "Our complete Garage Reset Service is $699 (launch price). This includes junk removal, organization, and garage reset. No hourly rates." },
  { q: "Do I need to be home during the service?", a: "Yes, we start with a walkthrough with you to decide what stays, what gets donated, and what gets removed." },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Garage Cleanout San Francisco",
  provider: { "@type": "LocalBusiness", name: "SanFranCleaners" },
  areaServed: "San Francisco, CA",
  description: "Complete garage cleanout and reset service in San Francisco. Junk removal, organization, and garage reset in one day.",
  offers: { "@type": "Offer", price: "699", priceCurrency: "USD" },
};

const SanFrancisco = () => (
  <>
    <Helmet>
      <title>Garage Cleanout San Francisco | SanFranCleaners</title>
      <meta name="description" content="Professional garage cleanout and reset service in San Francisco. We remove junk, organize your garage, and reset the space in one day. Fixed price $699. Serving all SF neighborhoods." />
      <link rel="canonical" href="https://sanfrancleaners.net/san-francisco" />
    </Helmet>

    <Navbar />

    {/* Hero */}
    <section className="pt-16 bg-background">
      <div className="section-padding">
        <div className="container-narrow max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-primary leading-[1.08] mb-6">
            Garage Cleanout Service in{" "}
            <span className="text-orange">San Francisco</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SanFranCleaners provides professional garage cleanout and reset services throughout San Francisco. Whether you're in the Mission, Pacific Heights, Sunset, Richmond, or any other SF neighborhood — we come to you, remove the junk, and reset your garage in one day.
          </p>
        </div>
      </div>
    </section>

    {/* Neighborhoods */}
    <section className="bg-surface-muted">
      <div className="section-padding">
        <div className="container-narrow">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-10">
            San Francisco Neighborhoods We Serve
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {neighborhoods.map((n) => (
              <span key={n} className="inline-flex items-center gap-1.5 bg-background border border-border rounded-full px-4 py-2.5 text-sm font-medium text-foreground shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-teal flex-shrink-0" /> {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Why SF Homeowners */}
    <section className="bg-background">
      <div className="section-padding">
        <div className="container-narrow">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-12">
            Why San Francisco Homeowners Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((c) => (
              <div key={c.title} className="bg-surface-muted border border-border rounded-xl p-6 sm:p-8">
                <c.icon className="h-8 w-8 text-teal mb-4" />
                <h3 className="font-bold text-primary text-lg mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <HowItWorksSection />
    <PricingSection />

    {/* FAQ */}
    <section className="bg-background">
      <div className="section-padding">
        <div className="container-narrow max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-10">
            Frequently Asked Questions — San Francisco
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-5 data-[state=open]:shadow-sm">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline py-4">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary">
      <div className="section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary-foreground mb-6">
            Ready to reclaim your San Francisco garage?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#contact" className="inline-flex items-center justify-center px-7 py-3.5 bg-orange text-accent-foreground font-bold rounded-lg text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.08)] hover:brightness-110 active:scale-[0.98] transition-all">
              Get Your Free Quote
            </a>
            <a href="tel:+14155909677" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[rgba(255,255,255,0.2)] text-primary-foreground font-semibold rounded-lg text-base hover:bg-[rgba(255,255,255,0.1)] transition-colors active:scale-[0.98]">
              <Phone className="h-4 w-4" /> (415) 590-9677
            </a>
          </div>
        </div>
      </div>
    </section>

    <Footer />

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </>
);

export default SanFrancisco;
