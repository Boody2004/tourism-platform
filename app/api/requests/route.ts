import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BookingRequest } from '@/lib/types';

const DATA_FILE = join(process.cwd(), 'data', 'requests.json');

function readRequests(): BookingRequest[] {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')); }
  catch { return []; }
}
function writeRequests(r: BookingRequest[]) {
  writeFileSync(DATA_FILE, JSON.stringify(r, null, 2));
}

export async function GET() {
  return NextResponse.json(readRequests());
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const requests = readRequests();
  const idx = requests.findIndex(r => r.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  requests[idx].status = status;
  writeRequests(requests);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const requests = readRequests().filter(r => r.id !== id);
  writeRequests(requests);
  return NextResponse.json({ success: true });
}
