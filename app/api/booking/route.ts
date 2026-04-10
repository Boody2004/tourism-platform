import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BookingRequest } from '@/lib/types';

const DATA_FILE = join(process.cwd(), 'data', 'requests.json');

function readRequests(): BookingRequest[] {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeRequests(requests: BookingRequest[]) {
  writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, travelDate, country, adults, children, tripId, tripTitle } = body;

    if (!name || !phone || !travelDate || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Verify reCAPTCHA token here before processing
    // const token = body.recaptchaToken;
    // await verifyRecaptcha(token);

    const newRequest: BookingRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      tripId,
      tripTitle,
      name,
      phone,
      email: email || '',
      travelDate,
      country,
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    // TODO: Replace with Supabase insert when ready:
    // await supabase.from('requests').insert(newRequest);
    const requests = readRequests();
    requests.unshift(newRequest);
    writeRequests(requests);

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // TODO: Add auth guard
  const requests = readRequests();
  return NextResponse.json(requests);
}
