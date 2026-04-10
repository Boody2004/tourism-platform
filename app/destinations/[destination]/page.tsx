import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTripsByDestination,
  generateDestinationParams,
  paramToLabel,
  getAllDestinations,
} from "@/lib/data";
import TripCard from "@/components/ui/TripCard";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Props {
  params: { destination: string };
}

// Purely dynamic — reads from trips.json, never hardcoded
export async function generateStaticParams() {
  return generateDestinationParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = paramToLabel(params.destination);
  return {
    title: `Trips to ${label}`,
    description: `Explore tour packages to ${label}. Curated by Touriva.`,
  };
}

export default function DestinationPage({ params }: Props) {
  const label = paramToLabel(params.destination);
  const trips = getTripsByDestination(label);
  const allDestinations = getAllDestinations();

  if (trips.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark-800 via-brand-900 to-dark-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-slate-400 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/destinations"
              className="hover:text-white transition-colors"
            >
              Destinations
            </Link>
            <span>/</span>
            <span className="text-white">{label}</span>
          </nav>
          <div className="flex items-center gap-2 text-brand-300 text-sm font-semibold tracking-widest uppercase mb-3">
            <MapPin size={14} />
            <span>Destination</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {trips[0]?.destination}
          </h1>
          <p className="text-slate-300 text-lg">
            {trips.length} trip{trips.length !== 1 ? "s" : ""} available to this
            destination
          </p>

          {/* All destinations nav */}
          <div className="flex flex-wrap gap-2 mt-6 max-h-24 overflow-hidden">
            {allDestinations.slice(0, 8).map((dest) => (
              <Link
                key={dest}
                href={`/destinations/${dest.toLowerCase().replace(/[,\s]+/g, "-")}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  dest.toLowerCase().includes(label.toLowerCase().split("-")[0])
                    ? "bg-white text-brand-700"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {dest.split(",")[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
}
