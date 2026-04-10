import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const offers = [
  {
    title: "Up to 40% OFF + Complimentary Breakfast",
    desc: "Book any Hurghada diving package before month-end and save big with our early bird deal.",
    image:
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80",
    badge: "40% OFF",
    link: "/trip/hurghada-red-sea-diving",
  },
  {
    title: "Sharm Diving — Free Equipment with Booking",
    desc: "Get all diving gear included at no extra cost when you book any Sharm El Sheikh dive package.",
    image:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
    badge: "FREE GEAR",
    link: "/trip/sharm-diving-reef",
  },
  {
    title: "Luxor Private Tour — 15% OFF",
    desc: "Exclusive discount on our Luxor Pharaohs Private Tour. Your own Egyptologist, your schedule.",
    image:
      "https://images.unsplash.com/photo-1562679299-8f7c4b76c434?w=600&q=80",
    badge: "15% OFF",
    link: "/trip/luxor-pharaohs-private-tour",
  },
  {
    title: "Cairo + Luxor Combo — Save 25%",
    desc: "Bundle Cairo and Luxor into one unforgettable Nile Valley journey at a special combined price.",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80",
    badge: "25% OFF",
    link: "/trip/cairo-culture-history-discovery",
  },
];

export default function OffersSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Special Offers"
            title="Exclusive deals, just for you"
            subtitle="Limited-time promotions on our most popular Egypt packages."
          />
          <Link href="/trips" className="btn-outline shrink-0">
            All Offers
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <Link
              key={offer.title}
              href={offer.link}
              className="group relative h-52 rounded-2xl overflow-hidden shadow-sm card-hover block"
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="inline-flex items-center gap-1 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                  <Tag size={10} /> {offer.badge}
                </span>
                <div>
                  <h3 className="text-white font-semibold text-base leading-snug mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {offer.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-white text-xl font-semibold">
            Crystal waters, vibrant reefs & sun-kissed shores.
            <br />
            <span className="font-normal text-base text-brand-100">
              Dive into Sharm El Sheikh — Egypt&apos;s jewel of the Red Sea!
            </span>
          </p>
          <Link
            href="/trip/sharm-diving-reef"
            className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-50 transition-colors whitespace-nowrap shrink-0"
          >
            Book Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
