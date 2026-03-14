import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How much does garage cleanout cost in San Francisco?", a: "SanFranCleaners offers a complete garage reset for $699 (launch price). Regular price is $899. Disposal fees may apply for extra-large volumes." },
  { q: "What areas do you serve in the Bay Area?", a: "We serve San Francisco, Oakland, Berkeley, Daly City, South San Francisco, San Mateo, and surrounding Bay Area cities." },
  { q: "How long does a garage cleanout take?", a: "Most garages are completed in one day (4–8 hours) with our professional team." },
  { q: "Do you install shelves or wall systems?", a: "No. We focus exclusively on decluttering, junk removal, and organization. No installations or construction." },
  { q: "What happens to the junk you remove?", a: "We haul to licensed Bay Area transfer stations. Usable items go to Goodwill or Salvation Army. Metals are recycled responsibly." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a,
    },
  })),
};

const FaqSection = () => (
  <section id="faq" className="bg-background">
    <div className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-primary mb-10">
          Frequently Asked Questions
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  </section>
);

export default FaqSection;
