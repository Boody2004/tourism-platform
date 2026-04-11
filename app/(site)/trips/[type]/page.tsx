import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTripsByType,
  generateTripTypeParams,
  getTripTypeBySlug,
  getAllTripTypes,
} from "@/lib/data";
import TripCard from "@/components/ui/TripCard";
import Link from "next/link";

interface Props {
  params: { type: string };
}

export async function generateStaticParams() {
  return generateTripTypeParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tripType = getTripTypeBySlug(params.type);
  if (!tripType) return { title: "Trips" };
  return { title: `${tripType.name} Trips`, description: tripType.description };
}

export default function TripTypePage({ params }: Props) {
  const tripType = getTripTypeBySlug(params.type);
  if (!tripType) notFound();

  const trips = getTripsByType(params.type);
  const allTypes = getAllTripTypes();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-slate-400 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/trips" className="hover:text-white transition-colors">
              All Trips
            </Link>
            <span>/</span>
            <span className="text-white">{tripType.name}</span>
          </nav>
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">
            Trip Type
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 mb-2">
            {tripType.name}
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mb-2">
            {tripType.description}
          </p>
          <p className="text-slate-400 text-sm">
            {trips.length} trip{trips.length !== 1 ? "s" : ""} available
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {allTypes.map((t) => (
              <Link
                key={t.slug}
                href={`/trips/${t.slug}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  t.slug === params.type
                    ? "bg-white text-brand-700"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {t.name}
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
            <h3 className="font-display text-xl font-semibold text-dark-800 mb-2">
              No trips yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              We&apos;re adding {tripType.name} trips soon.
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
