"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { getAllDestinations, getAllTripTypes } from "@/lib/data";
import agencyData from "@/data/agency.json";

const destinations = getAllDestinations();
const tripTypes = getAllTripTypes();

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Trip Types",
    href: "/trips",
    children: [
      { label: "All Trips", href: "/trips" },
      ...tripTypes.map((t) => ({ label: t.name, href: `/trips/${t.slug}` })),
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "All Destinations", href: "/destinations" },
      ...destinations.map((d) => ({
        label: d.name,
        href: `/destinations/${d.slug}`,
      })),
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Tailor Made", href: "/tailor-made" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome || menuOpen
          ? "bg-white shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Agency Logo"
              width={35}
              height={35}
              priority
            />
            <span
              className={`font-display text-2xl font-bold transition-colors ${scrolled || !isHome || menuOpen ? "text-dark-800" : "text-white"}`}
            >
              {agencyData.name}
            </span>
          </Link>
          {/* <Link href="/">
            <Image
              src={
                scrolled || !isHome || menuOpen ? "/logo.png" : "/full-logo.png"
              }
              alt="Agency Logo"
              width={scrolled || !isHome || menuOpen ? 50 : 220}
              height={scrolled || !isHome || menuOpen ? 50 : 220}
              priority
            />
          </Link> */}

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.children ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      scrolled || !isHome
                        ? "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-brand-600 bg-brand-50"
                        : scrolled || !isHome
                          ? "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
                {link.children && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-200 ${
                      dropdown === link.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
              Let's Talk
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || !isHome || menuOpen ? "text-dark-800 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-700 hover:text-brand-600 hover:bg-brand-50"
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.children.slice(1).map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/contact"
                className="btn-primary w-full justify-center text-sm"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
