import { MessageCircle } from "lucide-react";
import BeforeAfter from "./BeforeAfter";
import { smsHref } from "@/lib/site";

type Props = {
  title: React.ReactNode;
  lead: string;
  facts?: string[];
  showPhoto?: boolean;
  smsBody?: string;
  smsLabel?: string;
};

/*
  Phone:   title / lead / photo / buttons / facts   (the real before-after lands on the first screen)
  Desktop: text column on the left, photo on the right
*/
const Hero = ({ title, lead, facts = [], showPhoto = true, smsBody, smsLabel = "Text us photos" }: Props) => (
  <section className="pb-10 pt-7 sm:pb-16 sm:pt-14">
    <div
      className={`wrap grid gap-x-12 ${
        showPhoto
          ? "[grid-template-areas:'title''photo''actions'] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:[grid-template-areas:'title_photo''actions_photo']"
          : "[grid-template-areas:'title''actions']"
      }`}
    >
      <div className="[grid-area:title] lg:self-end">
        <h1 className="display text-[44px] text-slate min-[400px]:text-[50px] sm:text-[68px]">{title}</h1>
        <p className="prose-copy mt-4 text-[18px] sm:mt-5 sm:text-[19px]">{lead}</p>
      </div>
      {showPhoto && (
        <div className="mt-6 [grid-area:photo] lg:mt-0">
          <BeforeAfter eager />
        </div>
      )}
      <div className="mt-6 [grid-area:actions] lg:self-start">
        <div className="flex flex-col gap-3 min-[400px]:flex-row">
          <a href="#price" className="btn-signal">
            See your price
          </a>
          <a href={smsHref(smsBody)} className="btn-ghost">
            <MessageCircle className="h-5 w-5" /> {smsLabel}
          </a>
        </div>
        {facts.length > 0 && (
          <ul className="mt-6 space-y-1.5 text-[15px] text-concrete">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
);

export default Hero;
