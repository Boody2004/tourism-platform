import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getAllDestinations, getAllTrips } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore all our travel destinations across Egypt.",
};

export default function DestinationsPage() {
  const destinations = getAllDestinations();
  const trips = getAllTrips();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-dark-800 via-brand-900 to-dark-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-300 text-sm font-semibold tracking-widest uppercase mb-3">
            <MapPin size={14} /> Explore Egypt
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            All Destinations
          </h1>
          <p className="text-slate-300 text-lg max-w-lg mx-auto">
            {destinations.length} handpicked destinations — each one a gateway
            to Egypt&apos;s extraordinary beauty.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => {
            const destTrips = trips.filter(
              (t) => t.destination.toLowerCase() === dest.name.toLowerCase(),
            );
            const types = [...new Set(destTrips.map((t) => t.type))];
            const minPrice =
              destTrips.length > 0
                ? Math.min(...destTrips.map((t) => t.price))
                : null;
            return (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display font-bold text-2xl leading-tight">
                      {dest.name}
                    </p>
                    <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                      <MapPin size={11} /> {dest.country}
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs text-slate-400">
                        {destTrips.length} trip
                        {destTrips.length !== 1 ? "s" : ""}
                      </p>
                      {minPrice && (
                        <p className="text-sm font-bold text-brand-600">
                          From USD {minPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
