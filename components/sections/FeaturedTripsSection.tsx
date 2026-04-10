import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TripCard from '@/components/ui/TripCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { getFeaturedTrips } from '@/lib/data';

export default function FeaturedTripsSection() {
  const trips = getFeaturedTrips().slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="All Inclusive Tour Packages"
            title="Handpicked trips for you"
            subtitle="Curated experiences across the world's most remarkable destinations."
          />
          <Link href="/trips" className="btn-outline shrink-0">
            See more packages <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map(trip => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
