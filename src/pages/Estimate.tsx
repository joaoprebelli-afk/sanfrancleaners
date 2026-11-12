import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";
import Estimator from "@/components/site/Estimator";
import BeforeAfter from "@/components/site/BeforeAfter";
import { Steps } from "@/components/site/Sections";

// Landing page for ads and the flyer QR code. Kept out of search results; the home page covers the same content.
const Estimate = () => (
  <Layout>
    <Seo
      title="Instant Price | SanFranCleaners"
      description="See your junk removal, garage reset or house cleaning price in seconds. San Francisco and the Peninsula."
      path="/estimate"
      noindex
    />
    <Estimator title="See your price in 30 seconds" />
    <section className="band">
      <div className="wrap max-w-3xl">
        <BeforeAfter />
      </div>
    </section>
    <Steps />
  </Layout>
);

export default Estimate;
