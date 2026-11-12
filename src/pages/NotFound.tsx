import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Seo from "@/components/site/Seo";

const NotFound = () => (
  <Layout>
    <Seo title="Page not found | SanFranCleaners" description="This page doesn't exist." path="/404" noindex />
    <section className="band">
      <div className="wrap max-w-xl">
        <h1 className="display text-[44px] text-slate">This page moved or never existed.</h1>
        <p className="prose-copy mt-4">Everything is on the home page, including prices.</p>
        <Link to="/" className="btn-signal mt-8">
          Go to the home page
        </Link>
      </div>
    </section>
  </Layout>
);

export default NotFound;
