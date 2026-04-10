import { Metadata } from 'next';
import { getAllTrips, getAllTripTypes, getAllDestinations } from '@/lib/data';
import TripsPageClient from './TripsPageClient';

export const metadata: Metadata = {
  title: 'All Trips',
  description: 'Browse all our curated tour packages. Filter by trip type or destination.',
};

export default function TripsPage() {
  const trips = getAllTrips();
  const types = getAllTripTypes();
  const destinations = getAllDestinations();

  return <TripsPageClient trips={trips} types={types} destinations={destinations} />;
}
