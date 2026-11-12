import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import mark from "@/assets/mark.webp";
import { SITE, smsHref, telHref } from "@/lib/site";

const NAV = [
  { to: "/junk-removal", label: "Junk removal" },
  { to: "/garage-cleanout", label: "Garage cleanout" },
  { to: "/house-cleaning", label: "House cleaning" },
];

const Wordmark = () => (
  <span className="flex items-center gap-2">
    <img src={mark} alt="" width={36} height={36} className="h-9 w-9 rounded-[9px] bg-slate p-1" />
    <span className="whitespace-nowrap text-[17px] font-bold tracking-tight text-slate min-[400px]:text-[18px]" style={{ fontStretch: "108%" }}>
      SanFran<span className="text-concrete">Cleaners</span>
    </span>
  </span>
);

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="wrap flex h-[60px] items-center justify-between gap-3">
        <Link to="/" aria-label="SanFranCleaners home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>
        <nav aria-label="Services" className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `text-[15px] font-medium ${isActive ? "text-slate" : "text-concrete hover:text-slate"}`}
            >
              {n.label}
            </NavLink>
          ))}
          <a href={telHref} className="text-[15px] font-semibold text-slate">
            {SITE.phoneDisplay}
          </a>
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <a href={smsHref()} className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-full bg-fog px-3.5 text-[15px] font-semibold text-slate">
            <MessageCircle className="h-4 w-4" /> Text us
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Services" className="wrap pb-4 md:hidden">
          <div className="group-list">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex min-h-[52px] items-center px-4 text-[17px] text-slate active:bg-fog">
                {n.label}
              </Link>
            ))}
            <a href={telHref} className="flex min-h-[52px] items-center gap-2 px-4 text-[17px] text-slate active:bg-fog">
              <Phone className="h-4 w-4 text-concrete" /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="bg-slate pb-32 pt-12 text-white lg:pb-12">
    <div className="wrap grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <p className="heading text-[24px]">SanFranCleaners</p>
        <p className="mt-2 max-w-sm text-[15px] text-white/70">
          Junk removal and garage resets in San Francisco and the Peninsula. House cleaning across the Bay Area.
        </p>
      </div>
      <div>
        <p className="text-[15px] font-semibold">Services</p>
        <ul className="mt-3 space-y-2 text-[15px] text-white/70">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="hover:text-white">
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/estimate" className="hover:text-white">
              Instant price
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-[15px] font-semibold">Contact</p>
        <ul className="mt-3 space-y-2 text-[15px] text-white/70">
          <li>
            <a href={smsHref()} className="hover:text-white">
              Text {SITE.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={telHref} className="hover:text-white">
              Call {SITE.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
              {SITE.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <p className="wrap mt-10 text-[13px] text-white/50">© {new Date().getFullYear()} SanFranCleaners. San Francisco, CA.</p>
  </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
      Skip to content
    </a>
    <Header />
    <main id="main">{children}</main>
    <Footer />
  </>
);

export default Layout;
