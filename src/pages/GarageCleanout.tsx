import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";
import Hero from "@/components/site/Hero";
import Estimator from "@/components/site/Estimator";
import Faq, { faqSchema } from "@/components/site/Faq";
import { Areas, GarageIncluded, Steps, businessSchema, serviceSchema } from "@/components/site/Sections";
import { GARAGE_FAQ } from "@/content/faqs";
import { PENINSULA_CITIES } from "@/lib/site";

const DESC =
  "Garage cleanout and organization in San Francisco and the Peninsula: $699 for a two-person crew and truck for the day. We haul the junk, donate what's usable and organize what stays.";

const GarageCleanout = () => (
  <Layout>
    <Seo
      title="Garage Cleanout & Organization San Francisco, $699 | SanFranCleaners"
      description={DESC}
      path="/garage-cleanout"
      schema={[
        businessSchema,
        serviceSchema("Garage cleanout and organization", DESC, "/garage-cleanout", 699, ["San Francisco", ...PENINSULA_CITIES]),
        faqSchema(GARAGE_FAQ),
      ]}
    />
    <Hero
      title="Get your garage back in one day"
      lead="A two-person crew and a truck for the day. We clear out the junk, take donations to a local center, and organize what you keep so you can park, work or store things again."
      facts={["$699 for the full reset", "Bins and shelving only if you want them", "SF and the Peninsula"]}
      smsBody="Hi! I'd like a garage reset. Here are some photos:"
    />
    <Estimator title="Price your garage" initialMode="junk" initialService="garage" lockMode />
    <GarageIncluded />
    <Steps />
    <Areas />
    <Faq items={GARAGE_FAQ} title="Garage cleanout questions" />
  </Layout>
);

export default GarageCleanout;
