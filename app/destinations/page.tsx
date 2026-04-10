import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getAllTrips, getAllDestinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore all our travel destinations. From tropical islands to ancient cities — find your perfect trip.",
};

export default function DestinationsPage() {
  const trips = getAllTrips();
  const destinations = getAllDestinations();

  // Build destination cards: unique dest + first trip image + trip count
  const destCards = destinations.map((dest) => {
    const destTrips = trips.filter((t) => t.destination === dest);
    return {
      destination: dest,
      image:
        destTrips[0]?.images[0] ??
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      count: destTrips.length,
      slug: dest.toLowerCase().replace(/[,\s]+/g, "-"),
      types: [...new Set(destTrips.map((t) => t.type))],
      minPrice: Math.min(...destTrips.map((t) => t.price)),
    };
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-800 via-brand-900 to-dark-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-300 text-sm font-semibold tracking-widest uppercase mb-3">
            <MapPin size={14} />
            <span>Explore the World</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            All Destinations
          </h1>
          <p className="text-slate-300 text-lg max-w-lg mx-auto">
            {destinations.length} destinations across the globe — each one
            handpicked by our travel experts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destCards.map(
            ({ destination, image, count, slug, types, minPrice }) => (
              <Link
                key={destination}
                href={`/destinations/${slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={destination}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-display font-bold text-lg leading-tight">
                      {destination}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {count} trip{count !== 1 ? "s" : ""} available
                    </span>
                    <span className="font-semibold text-brand-600">
                      From USD {minPrice.toLocaleString()}
                    </span>
                  </div>
                  {/* Trip types */}
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
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
