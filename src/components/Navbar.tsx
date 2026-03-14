import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="SanFranCleaners logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-bold text-lg tracking-tight text-primary">
            SanFran<span className="text-muted-foreground">Cleaners</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:+14155551234" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
            <Phone className="h-4 w-4" /> (415) 555-1234
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-primary" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary py-1">
              {l.label}
            </a>
          ))}
          <a href="tel:+14155551234" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange">
            <Phone className="h-4 w-4" /> (415) 555-1234
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
