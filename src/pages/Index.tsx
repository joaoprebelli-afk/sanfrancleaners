import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";
import Hero from "@/components/site/Hero";
import Estimator from "@/components/site/Estimator";
import Faq, { faqSchema } from "@/components/site/Faq";
import { Areas, GarageIncluded, Steps, businessSchema } from "@/components/site/Sections";
import { HOME_FAQ } from "@/content/faqs";
import { PRICING } from "@/lib/estimate";

const Index = () => (
  <Layout>
    <Seo
      title="Junk Removal & Garage Cleanout in San Francisco | SanFranCleaners"
      description="Junk removal from $99 and full garage resets for $699 in San Francisco and the Peninsula. See your price in seconds, send photos, and we confirm by text. House cleaning too."
      path="/"
      schema={[businessSchema, faqSchema(HOME_FAQ)]}
    />
    <Hero
      title="Junk out. Garage back."
      lead="Junk removal, garage resets and house cleaning in San Francisco and the Peninsula. See your price right here, no call needed."
      facts={["Price shown before you book", "Usable items go to local donation centers", "Locally owned in San Francisco"]}
    />
    <Estimator />
    <Steps />
    <GarageIncluded />
    <section className="band">
      <div className="wrap grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="heading text-[30px] text-slate sm:text-[40px]">House cleaning, too</h2>
          <p className="prose-copy mt-3">
            Standard, deep and move-out cleans anywhere in the Bay Area, from ${PRICING.cleaning.base.studio} for a studio. Bathrooms are
            always included. Weekly service saves {PRICING.cleaning.frequency.weekly * 100}%.
          </p>
        </div>
        <Link to="/house-cleaning" className="btn-ghost">
          House cleaning prices
        </Link>
      </div>
    </section>
    <Areas />
    <Faq items={HOME_FAQ} />
  </Layout>
);

export default Index;
