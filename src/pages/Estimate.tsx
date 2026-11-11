import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import EstimatorSection from "@/components/EstimatorSection";
import Footer from "@/components/Footer";

const Estimate = () => (
  <>
    <Helmet>
      <title>Instant Price Estimate | SanFranCleaners</title>
      <meta
        name="description"
        content="See your price in 30 seconds. Junk removal from $99, garage reset $699 flat, and house cleaning in San Francisco. Final price confirmed from your photos."
      />
    </Helmet>
    <Navbar />
    <div className="pt-16">
      <EstimatorSection />
    </div>
    <Footer />
  </>
);

export default Estimate;
