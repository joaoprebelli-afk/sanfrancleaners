import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const anchorLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const pageLinks = [
    { label: "Instant Estimate", to: "/estimate" },
    { label: "San Francisco", to: "/san-francisco" },
    { label: "Before & After", to: "/before-after" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SanFranCleaners logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-bold text-lg tracking-tight text-primary">
            SanFran<span className="text-muted-foreground">Cleaners</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {anchorLinks.map((l) => (
            <a key={l.href} href={isHome ? l.href : `/${l.href}`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
          <a href="tel:+14155909677" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
            <Phone className="h-4 w-4" /> (415) 590-9677
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-primary" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {anchorLinks.map((l) => (
            <a key={l.href} href={isHome ? l.href : `/${l.href}`} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-1">
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-1">
              {l.label}
            </Link>
          ))}
          <a href="tel:+14155909677" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
            <Phone className="h-4 w-4" /> (415) 590-9677
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
