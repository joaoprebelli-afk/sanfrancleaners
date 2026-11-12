import { ChevronDown } from "lucide-react";

export type QA = { q: string; a: string };

export const faqSchema = (items: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** Native details/summary so every answer is in the HTML for search engines and works without JavaScript. */
const Faq = ({ items, title = "Questions people ask us" }: { items: QA[]; title?: string }) => (
  <section className="band" id="faq">
    <div className="wrap max-w-3xl">
      <h2 className="heading text-[30px] text-slate sm:text-[40px]">{title}</h2>
      <div className="group-list mt-8">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-[17px] font-semibold text-slate [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="h-5 w-5 flex-shrink-0 text-concrete transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-4 text-[16px] leading-relaxed text-concrete">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
