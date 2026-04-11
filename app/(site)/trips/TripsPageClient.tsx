"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import TripCard from "@/components/ui/TripCard";
import { Trip } from "@/lib/types";

interface TripsPageClientProps {
  trips: Trip[];
  typeNames: string[];
  destinationNames: string[];
}

export default function TripsPageClient({
  trips,
  typeNames,
  destinationNames,
}: TripsPageClientProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDest, setSelectedDest] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result = [...trips];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.type.toLowerCase().includes(q),
      );
    }
    if (selectedType) result = result.filter((t) => t.type === selectedType);
    if (selectedDest)
      result = result.filter((t) => t.destination === selectedDest);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  }, [trips, search, selectedType, selectedDest, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setSelectedType("");
    setSelectedDest("");
    setSortBy("featured");
  };
  const hasFilters =
    search || selectedType || selectedDest || sortBy !== "featured";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">
            Explore
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 mb-4">
            All Trips
          </h1>
          <p className="text-slate-300 text-lg max-w-lg mx-auto">
            {trips.length} curated experiences across {destinationNames.length}{" "}
            destinations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search trips, destinations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white text-slate-600 md:w-48"
          >
            <option value="">All Trip Types</option>
            {typeNames.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={selectedDest}
            onChange={(e) => setSelectedDest(e.target.value)}
            className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white text-slate-600 md:w-48"
          >
            <option value="">All Destinations</option>
            {destinationNames.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white text-slate-600 md:w-40"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low–High</option>
            <option value="price-desc">Price: High–Low</option>
            <option value="rating">Top Rated</option>
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors px-2"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6 text-sm text-slate-500 flex-wrap">
          <SlidersHorizontal size={14} />
          <span>
            Showing{" "}
            <span className="font-semibold text-dark-800">
              {filtered.length}
            </span>{" "}
            trips
          </span>
          {selectedType && (
            <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedType}
            </span>
          )}
          {selectedDest && (
            <span className="bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {selectedDest}
            </span>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🗺️</p>
            <h3 className="font-display text-xl font-semibold text-dark-800 mb-2">
              No trips found
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Try adjusting your search or filters
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
