import { Metadata } from 'next';
import AddTripClient from './AddTripClient';

export const metadata: Metadata = { title: 'Add Trip' };

export default function AddTripPage() {
  return <AddTripClient />;
}
