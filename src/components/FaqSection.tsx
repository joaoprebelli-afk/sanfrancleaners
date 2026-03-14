import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How long does the service take?", a: "Most garages are completed in one day (4–8 hours)." },
  { q: "Do you install shelves or pegboards?", a: "No. We focus on decluttering and organizing what you have. No installations or construction involved." },
  { q: "What happens to my junk?", a: "We haul it to licensed transfer stations. Usable items go to Goodwill or Salvation Army. Metals are recycled." },
  { q: "Is the $699 price all-inclusive?", a: "The service is $699. Disposal fees may apply for extra-large volumes — always discussed before we start." },
  { q: "What areas do you serve?", a: "The full San Francisco Bay Area — San Francisco, Oakland, Berkeley, Daly City, South San Francisco, San Mateo, and surrounding areas." },
];

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
  </section>
);

export default FaqSection;
