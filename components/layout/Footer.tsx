import Link from "next/link";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import agencyData from "@/data/agency.json";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-slate-300">
      <div className="bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Ready to Plan Your Dream?
            </h3>
            <p className="text-brand-100 mt-1">
              Speak with our Egypt specialists for your perfect luxury journey.
            </p>
          </div>

          <Link
            href="/tailor-made"
            className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-50 transition-colors "
          >
            Tailor Made
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            {/* <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Agency Logo"
                width={35}
                height={35}
                priority
              />
              <span className="font-display text-2xl font-bold text-white">
                {agencyData.name}
              </span>
            </Link> */}
            <Link href="/">
              <Image
                src="/full-logo.png"
                alt="Agency Logo"
                width={220}
                height={220}
                priority
                className="mb-4"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your dream, fully planned. We craft unforgettable journeys across
              Egypt's most remarkable destinations.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={14} className="text-brand-400" />
                <a
                  href={`tel:+${agencyData.phone.replace(/\D/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {agencyData.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={14} className="text-brand-400" />
                <a
                  href={`mailto:${agencyData.email}`}
                  className="hover:text-white transition-colors"
                >
                  {agencyData.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} className="text-brand-400" />
                <a
                  href={agencyData.locationLink}
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  {agencyData.location}
                </a>
              </div>
            </div>
            {agencyData?.tripadvisorReview && (
              <a
                href={agencyData.tripadvisorReview}
                target="_blank"
                className="group grid grid-cols-1 content-center gap-1 w-44 h-16 rounded-full bg-[#002C1F] text-[#34E0A1] mt-6 font-bold text-sm shadow-md hover:bg-white hover:text-[#002C1F] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center gap-2">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-6 h-6 fill-[#34E0A1] group-hover:scale-110 -mb-2 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m135.050781 116.613281c-39.214843 0-71.117187 31.902344-71.117187 71.117188 0 39.214843 31.902344 71.117187 71.117187 71.117187 39.214844 0 71.117188-31.902344 71.117188-71.117187 0-39.214844-31.902344-71.117188-71.117188-71.117188zm0 112.335938c-22.726562 0-41.214843-18.492188-41.214843-41.21875 0-22.726563 18.488281-41.21875 41.214843-41.21875 22.726563 0 41.21875 18.492187 41.21875 41.21875 0 22.726562-18.492187 41.21875-41.21875 41.21875zm0 0"></path>
                    <path d="m375.253906 116.613281c-39.214844 0-71.121094 31.902344-71.121094 71.117188 0 39.214843 31.90625 71.117187 71.121094 71.117187 39.210938 0 71.117188-31.902344 71.117188-71.117187 0-39.214844-31.902344-71.117188-71.117188-71.117188zm0 112.335938c-22.730468 0-41.21875-18.492188-41.21875-41.21875 0-22.726563 18.488282-41.21875 41.21875-41.21875 22.726563 0 41.214844 18.492187 41.214844 41.21875 0 22.726562-18.488281 41.21875-41.214844 41.21875zm0 0"></path>
                    <path d="m512 52.679688h-114.492188c-34.0625-33.085938-86.695312-52.679688-142.355468-52.679688-53.390625 0-107.238282 20.0625-142.292969 52.679688h-111.914063l30.496094 48.527343c-19.613281 23.449219-31.441406 53.628907-31.441406 86.523438 0 74.46875 60.585938 135.050781 135.050781 135.050781 38.496094 0 73.277344-16.191406 97.898438-42.117188l22.203125 51.238282 22.199218-51.238282c24.625 25.929688 59.40625 42.117188 97.902344 42.117188 74.464844 0 135.050782-60.582031 135.050782-135.050781 0-32.046875-11.230469-61.515625-29.949219-84.699219zm-160.734375 2.132812c-41.917969 7.546875-77.179687 34.503906-96.113281 71.199219-18.804688-36.441407-53.710938-63.273438-95.246094-71.03125 27.382812-15.871094 61.324219-25.082031 95.246094-25.082031 35.519531 0 69.351562 9.003906 96.113281 24.914062zm-216.214844 238.070312c-57.980469 0-105.148437-47.171874-105.148437-105.152343s47.167968-105.148438 105.148437-105.148438 105.148438 47.167969 105.148438 105.148438-47.167969 105.152343-105.148438 105.152343zm240.203125 0c-57.980468 0-105.152344-47.171874-105.152344-105.152343s47.171876-105.148438 105.152344-105.148438c57.976563 0 105.148438 47.167969 105.148438 105.148438s-47.167969 105.152343-105.148438 105.152343zm0 0"></path>
                    <path d="m135.050781 172.054688c-8.644531 0-15.675781 7.03125-15.675781 15.675781 0 8.640625 7.03125 15.671875 15.675781 15.671875s15.675781-7.03125 15.675781-15.671875c0-8.644531-7.03125-15.675781-15.675781-15.675781zm0 0"></path>
                    <path d="m375.960938 172.054688c-8.644532 0-15.675782 7.03125-15.675782 15.675781 0 8.640625 7.03125 15.671875 15.675782 15.671875 8.644531 0 15.675781-7.03125 15.675781-15.671875 0-8.644531-7.03125-15.675781-15.675781-15.675781zm0 0"></path>
                  </svg>
                  Tripadvisor
                </div>
                <span className="flex justify-center text-xs">
                  Review {agencyData.name}.
                </span>
              </a>
            )}
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "All Trips", href: "/trips" },
                { label: "Destinations", href: "/destinations" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Hurghada", slug: "hurghada" },
                { name: "Luxor", slug: "luxor" },
                { name: "Aswan", slug: "aswan" },
                { name: "Sharm El Sheikh", slug: "sharm-el-sheikh" },
                { name: "Cairo", slug: "cairo" },
              ].map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {d.name}
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

          <div>
            <h4 className="text-white font-semibold mb-4">Trip Types</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Sea & Islands", slug: "sea-islands" },
                { name: "Private Riding", slug: "private-riding" },
                { name: "Culture & History", slug: "culture-history" },
                { name: "Leisure & Fun", slug: "leisure-fun" },
                { name: "Diving", slug: "diving" },
                { name: "Safari & Adventure", slug: "safari-adventure" },
              ].map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/trips/${t.slug}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: agencyData.facebookLink },
                  { icon: Instagram, href: agencyData.instagramLink },
                  { icon: Twitter, href: agencyData.twitterLink },
                  { icon: Youtube, href: agencyData.youtubeLink },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
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
            © {new Date().getFullYear()} {agencyData.name}. All rights reserved.
            Developed by{" "}
            <a
              href="https://aaaportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 transition-colors font-medium"
            >
              Launchy
            </a>
            .
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
