import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-primary border-t border-[rgba(255,255,255,0.1)]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="SanFranCleaners" className="h-8 w-8 rounded object-cover" />
          <span className="text-primary-foreground text-sm">
            © 2026 SanFranCleaners · San Francisco Bay Area
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="mailto:hello@sanfrancleaners.com" className="inline-flex items-center gap-1.5 text-sm text-[rgba(255,255,255,0.7)] hover:text-primary-foreground transition-colors">
            <Mail className="h-4 w-4" /> hello@sanfrancleaners.com
          </a>
          <a href="tel:+14155551234" className="inline-flex items-center gap-1.5 text-sm text-[rgba(255,255,255,0.7)] hover:text-primary-foreground transition-colors">
            <Phone className="h-4 w-4" /> (415) 555-1234
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
