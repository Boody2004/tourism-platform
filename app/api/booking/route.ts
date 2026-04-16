import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { BookingRequest } from "@/lib/types";

const DATA_FILE = join(process.cwd(), "data", "requests.json");

function readRequests(): BookingRequest[] {
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8"));
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

    const {
      // shared fields
      name,
      phone,
      email,
      travelDate,
      country,
      adults,
      children,
      tripId,
      tripTitle,
      status,
      // tailor made fields
      isTailorMade,
      requestTitle,
      arrivalDate,
      departureDate,
      nationality,
      wishTo,
      note,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newRequest: BookingRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      phone,
      email: email || "",
      travelDate: travelDate || "",
      country: country || "",
      adults: Number(adults) || 1,
      children: Number(children) || 0,
      status: "New",
      createdAt: new Date().toISOString(),
      // regular booking fields
      tripId: tripId || undefined,
      tripTitle: tripTitle || undefined,
      // tailor made fields — only saved if present
      ...(isTailorMade && {
        isTailorMade: true,
        requestTitle: requestTitle || undefined,
        arrivalDate: arrivalDate || undefined,
        departureDate: departureDate || undefined,
        nationality: nationality || undefined,
        wishTo: wishTo || undefined,
        note: note || undefined,
      }),
    };

    const requests = readRequests();
    requests.unshift(newRequest);
    writeRequests(requests);

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const requests = readRequests();
  return NextResponse.json(requests);
}
