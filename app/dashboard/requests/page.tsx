import { Metadata } from 'next';
import RequestsClient from './RequestsClient';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BookingRequest } from '@/lib/types';

export const metadata: Metadata = { title: 'Booking Requests' };

function getRequests(): BookingRequest[] {
  try { return JSON.parse(readFileSync(join(process.cwd(), 'data', 'requests.json'), 'utf-8')); }
  catch { return []; }
}

export default function RequestsPage() {
  const requests = getRequests();
  return <RequestsClient initialRequests={requests} />;
}
