import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTripsByDestination,
  generateDestinationParams,
  getDestinationBySlug,
  getAllDestinations,
} from "@/lib/data";
import TripCard from "@/components/ui/TripCard";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Props {
  params: { destination: string };
}

export async function generateStaticParams() {
  return generateDestinationParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = getDestinationBySlug(params.destination);
  if (!dest) return { title: "Destination" };
  return { title: `Trips to ${dest.name}`, description: dest.description };
}

export default function DestinationPage({ params }: Props) {
  const dest = getDestinationBySlug(params.destination);
  if (!dest) notFound();

  const trips = getTripsByDestination(params.destination);
  const allDestinations = getAllDestinations();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
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
            <span className="text-white">{dest.name}</span>
          </nav>
          <div className="flex items-center gap-2 text-brand-300 text-sm font-semibold tracking-widest uppercase mb-3">
            <MapPin size={14} />
            <span>Destination</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 mb-2">
            {dest.name}
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mb-2">
            {dest.description}
          </p>
          <p className="text-slate-400 text-sm">
            {trips.length} trip{trips.length !== 1 ? "s" : ""} available in{" "}
            {dest.name}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {allDestinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  d.slug === params.destination
                    ? "bg-white text-brand-700"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🗺️</p>
            <h3 className="font-display text-xl font-semibold text-dark-800 mb-2">
              No trips yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              We&apos;re adding trips to {dest.name} soon.
            </p>
            <Link href="/trips" className="btn-primary">
              Browse All Trips
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
