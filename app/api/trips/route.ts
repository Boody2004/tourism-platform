import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Trip } from '@/lib/types';

const DATA_FILE = join(process.cwd(), 'data', 'trips.json');

function readTrips(): Trip[] {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')); }
  catch { return []; }
}
function writeTrips(trips: Trip[]) {
  writeFileSync(DATA_FILE, JSON.stringify(trips, null, 2));
}

export async function GET() {
  return NextResponse.json(readTrips());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const trips = readTrips();

  const newTrip: Trip = {
    ...body,
    id: `trip_${Date.now()}`,
    slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    rating: 0,
    reviews: 0,
    featured: body.featured ?? false,
  };

  trips.push(newTrip);
  writeTrips(trips);

  // When a new trip is added with a new type or destination,
  // the dynamic routes /trips/[type] and /trips/destination/[destination]
  // automatically handle them — no manual page creation needed.
  return NextResponse.json({ success: true, trip: newTrip });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const trips = readTrips();
  const idx = trips.findIndex(t => t.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  trips[idx] = { ...trips[idx], ...body };
  writeTrips(trips);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const trips = readTrips().filter(t => t.id !== id);
  writeTrips(trips);
  return NextResponse.json({ success: true });
}
