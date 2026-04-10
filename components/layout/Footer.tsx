import Link from "next/link";
import {
  Globe,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MapPin,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-slate-300">
      {/* Top CTA band */}
      <div className="bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Adventure never takes a season off
            </h3>
            <p className="text-brand-100 mt-1">
              Subscribe to our newsletter for first-travel inspiration.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Touriva
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your dream, fully planned. We craft unforgettable journeys that
              balance adventure, culture, and pure relaxation across every
              continent.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={14} className="text-brand-400" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={14} className="text-brand-400" />
                <a
                  href="mailto:hello@touriva.com"
                  className="hover:text-white transition-colors"
                >
                  hello@touriva.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} className="text-brand-400" />
                <span>Singapore Office — 10 Orchard Road, Singapore</span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-white font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "All Trips", "Blog", "Contact"].map((p) => (
                <li key={p}>
                  <Link
                    href={
                      p === "Home"
                        ? "/"
                        : `/${p.toLowerCase().replace(" ", "-")}`
                    }
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Dubai, UAE",
                "Paris, France",
                "Bali, Indonesia",
                "Tokyo, Japan",
                "Maldives",
              ].map((d) => (
                <li key={d}>
                  <Link
                    href={`/destination/${d.toLowerCase().replace(/[,\s]+/g, "-")}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {d}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/destinations"
                  className="text-brand-400 hover:text-brand-300 transition-colors font-medium"
                >
                  More Destinations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Trip Types */}
          <div>
            <h4 className="text-white font-semibold mb-4">Trip Types</h4>
            <ul className="space-y-2 text-sm">
              {["Adventure", "Cultural", "Luxury", "Wellness"].map((t) => (
                <li key={t}>
                  <Link
                    href={`/trips/${t.toLowerCase()}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {t} Tours
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Youtube, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Touriva. Travel Agency. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
