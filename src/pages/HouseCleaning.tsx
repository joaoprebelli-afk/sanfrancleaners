import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";
import Hero from "@/components/site/Hero";
import Estimator from "@/components/site/Estimator";
import Faq, { faqSchema } from "@/components/site/Faq";
import { Areas, Steps, businessSchema, serviceSchema } from "@/components/site/Sections";
import { CLEANING_FAQ } from "@/content/faqs";
import { PRICING } from "@/lib/estimate";

const DESC = `House cleaning in San Francisco and the Bay Area from $${PRICING.cleaning.base.studio}. Standard, deep and move-out cleans with bathrooms included. Weekly service saves ${
  PRICING.cleaning.frequency.weekly * 100
}%. Get an instant estimate.`;

const HouseCleaning = () => (
  <Layout>
    <Seo
      title={`House Cleaning San Francisco & Bay Area, from $${PRICING.cleaning.base.studio} | SanFranCleaners`}
      description={DESC}
      path="/house-cleaning"
      schema={[
        businessSchema,
        serviceSchema("House cleaning", DESC, "/house-cleaning", PRICING.cleaning.base.studio, ["San Francisco", "Oakland", "San Jose", "San Mateo"]),
        faqSchema(CLEANING_FAQ),
      ]}
    />
    <Hero
      title="House cleaning with an instant estimate"
      lead="Standard, deep and move-out cleans across the Bay Area. Choose your home size and the kind of clean, and the estimate is right there. Bathrooms are always included."
      facts={[`From $${PRICING.cleaning.base.studio} for a studio`, `Every 2 weeks saves ${PRICING.cleaning.frequency.biweekly * 100}%, weekly saves ${PRICING.cleaning.frequency.weekly * 100}%`, "Anywhere in the Bay Area"]}
      showPhoto={false}
      smsBody="Hi! I'd like a house cleaning price."
      smsLabel="Text us"
    />
    <Estimator title="House cleaning estimate" initialMode="cleaning" lockMode intro="Estimates per visit, anywhere in the Bay Area." />
    <Steps />
    <Areas cleaning />
    <Faq items={CLEANING_FAQ} title="House cleaning questions" />
  </Layout>
);

export default HouseCleaning;
