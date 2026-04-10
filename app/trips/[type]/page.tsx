import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTripsByType,
  generateTripTypeParams,
  paramToLabel,
  getAllTripTypes,
} from "@/lib/data";
import TripCard from "@/components/ui/TripCard";
import Link from "next/link";

interface Props {
  params: { type: string };
}

// Purely dynamic — reads from trips.json, never hardcoded
export async function generateStaticParams() {
  return generateTripTypeParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = paramToLabel(params.type);
  return {
    title: `${label} Trips`,
    description: `Browse all ${label} tour packages curated by Touriva.`,
  };
}

export default function TripTypePage({ params }: Props) {
  const label = paramToLabel(params.type);
  const trips = getTripsByType(label);
  const allTypes = getAllTripTypes();

  if (trips.length === 0) {
    // Type doesn't exist in current data
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-slate-400 mb-4 flex gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/trips" className="hover:text-white transition-colors">
              Trips
            </Link>
            <span>/</span>
            <span className="text-white">{label}</span>
          </nav>
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">
            Trip Type
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
            {label} Trips
          </h1>
          <p className="text-slate-300 text-lg">
            {trips.length} curated {label.toLowerCase()} experience
            {trips.length !== 1 ? "s" : ""} available
          </p>

          {/* Other types navigation — all generated from JSON */}
          <div className="flex flex-wrap gap-2 mt-6">
            {allTypes.map((t) => (
              <Link
                key={t}
                href={`/trips/${t.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  t.toLowerCase() === label.toLowerCase()
                    ? "bg-white text-brand-700"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                }`}
              >
                {t}
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
