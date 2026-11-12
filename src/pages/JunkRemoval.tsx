import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";
import Hero from "@/components/site/Hero";
import Estimator from "@/components/site/Estimator";
import Faq, { faqSchema } from "@/components/site/Faq";
import { Areas, Steps, businessSchema, serviceSchema } from "@/components/site/Sections";
import { JUNK_FAQ } from "@/content/faqs";
import { PENINSULA_CITIES } from "@/lib/site";

const DESC =
  "Junk removal in San Francisco and the Peninsula with up-front prices: donation runs from $99, car loads $149, big item pickup $249, half a truck $399. Send photos and we confirm by text.";

const JunkRemoval = () => (
  <Layout>
    <Seo
      title="Junk Removal San Francisco, from $99 | SanFranCleaners"
      description={DESC}
      path="/junk-removal"
      schema={[
        businessSchema,
        serviceSchema("Junk removal", DESC, "/junk-removal", 99, ["San Francisco", ...PENINSULA_CITIES]),
        faqSchema(JUNK_FAQ),
      ]}
    />
    <Hero
      title="Junk removal in San Francisco, from $99"
      lead="From one old couch to half a truck. Pick the size of the job, see the price, and we pick it up. Usable things get donated, not dumped."
      facts={["Flat prices by job size, not by the hour", "Fridges, mattresses and appliances welcome", "SF and the Peninsula"]}
      smsBody="Hi! I need junk removal. Here are some photos:"
    />
    <Estimator title="Junk removal prices" initialMode="junk" lockMode />
    <Steps />
    <Areas />
    <Faq items={JUNK_FAQ} title="Junk removal questions" />
  </Layout>
);

export default JunkRemoval;
