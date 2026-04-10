'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trip } from '@/lib/types';
import { Search, Plus, Pencil, Trash2, Star, ExternalLink } from 'lucide-react';

interface Props { initialTrips: Trip[] }

export default function TripsManagementClient({ initialTrips }: Props) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = trips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch('/api/trips', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setTrips(prev => prev.filter(t => t.id !== id));
      }
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark-800">All Trips</h1>
          <p className="text-slate-500 text-sm mt-0.5">{trips.length} trips total</p>
        </div>
        <Link href="/dashboard/add-trip" className="btn-primary text-sm">
          <Plus size={16} /> Add New Trip
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Trip</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Destination</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Rating</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(trip => (
                <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0">
                        <Image src={trip.images[0]} alt={trip.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-dark-800 truncate max-w-[160px]">{trip.title}</p>
                        {trip.featured && (
                          <span className="text-xs text-brand-600 font-medium">Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">{trip.type}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 hidden lg:table-cell text-xs">{trip.destination}</td>
                  <td className="py-3 px-4 font-semibold text-dark-800">USD {trip.price.toLocaleString()}</td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      {trip.rating || '—'}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/trip/${trip.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="View on site"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        href={`/dashboard/trips/edit/${trip.id}`}
                        className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      {confirmDelete === trip.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(trip.id)}
                            disabled={deleting === trip.id}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-60"
                          >
                            {deleting === trip.id ? '...' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg hover:bg-slate-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(trip.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">No trips found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
