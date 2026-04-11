import { Metadata } from "next";
import { getAllTrips, getAllTripTypes, getAllDestinations } from "@/lib/data";
import { readFileSync } from "fs";
import { join } from "path";
import { BookingRequest } from "@/lib/types";
import Link from "next/link";
import { Map, Inbox, Globe, Tag, PlusCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Overview" };

function getRequests(): BookingRequest[] {
  try {
    return JSON.parse(
      readFileSync(join(process.cwd(), "data", "requests.json"), "utf-8"),
    );
  } catch {
    return [];
  }
}

export default function DashboardOverview() {
  const trips = getAllTrips();
  const types = getAllTripTypes(); // TripType[]  ← objects now
  const destinations = getAllDestinations(); // Destination[] ← objects now
  const requests = getRequests();
  const newRequests = requests.filter((r) => r.status === "New");

  const stats = [
    {
      label: "Total Trips",
      value: trips.length,
      icon: Map,
      color: "bg-brand-50 text-brand-600",
      href: "/dashboard/trips",
    },
    {
      label: "Trip Types",
      value: types.length,
      icon: Tag,
      color: "bg-purple-50 text-purple-600",
      href: "/dashboard/overview",
    },
    {
      label: "Destinations",
      value: destinations.length,
      icon: Globe,
      color: "bg-teal-50 text-teal-600",
      href: "/dashboard/overview",
    },
    {
      label: "New Requests",
      value: newRequests.length,
      icon: Inbox,
      color: "bg-orange-50 text-orange-600",
      href: "/dashboard/requests",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all hover:-translate-y-0.5 block"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon size={18} />
            </div>
            <p className="font-display text-3xl font-bold text-dark-800">
              {s.value}
            </p>
            <p className="text-slate-500 text-sm mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Types */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark-800">Trip Types</h2>
            <span className="text-xs text-slate-400">From trip-types.json</span>
          </div>
          <div className="space-y-2">
            {types.map((type) => {
              const count = trips.filter((t) => t.type === type.name).length;
              return (
                <div
                  key={type.slug}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <span className="w-8 h-8 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center text-xs font-bold">
                    {type.name[0]}
                  </span>
                  <span className="font-medium text-dark-800 text-sm flex-1">
                    {type.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    {count} trip{count !== 1 ? "s" : ""}
                  </span>
                  <Link
                    href={`/trips/${type.slug}`}
                    target="_blank"
                    className="text-brand-500 hover:text-brand-600"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            ✨ Manage types in data/trip-types.json — routes update
            automatically
          </p>
        </div>

        {/* Destinations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-dark-800">Destinations</h2>
            <span className="text-xs text-slate-400">
              From destinations.json
            </span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {destinations.map((dest) => {
              const count = trips.filter(
                (t) => t.destination === dest.name,
              ).length;
              return (
                <div
                  key={dest.slug}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <Globe size={14} className="text-teal-500 shrink-0" />
                  <span className="font-medium text-dark-800 text-sm flex-1 truncate">
                    {dest.name}
                  </span>
                  <span className="text-xs text-slate-400 shrink-0">
                    {count} trip{count !== 1 ? "s" : ""}
                  </span>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    target="_blank"
                    className="text-brand-500 hover:text-brand-600 shrink-0"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            ✨ Manage destinations in data/destinations.json — routes update
            automatically
          </p>
        </div>
      </div>

      {/* Recent requests */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-dark-800">
            Recent Booking Requests
          </h2>
          <Link
            href="/dashboard/requests"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            View all →
          </Link>
        </div>
        {requests.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-6">
            No requests yet. Booking form submissions will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Trip
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-3 font-medium text-dark-800">
                      {r.name}
                    </td>
                    <td className="py-3 px-3 text-slate-500 max-w-[180px] truncate">
                      {r.tripTitle || "—"}
                    </td>
                    <td className="py-3 px-3 text-slate-500">{r.travelDate}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          r.status === "New"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
