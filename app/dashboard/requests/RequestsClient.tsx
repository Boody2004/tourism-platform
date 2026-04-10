'use client';

import { useState } from 'react';
import { BookingRequest } from '@/lib/types';
import { Search, Trash2, RefreshCw, Users, Calendar, Globe, Phone } from 'lucide-react';

interface Props { initialRequests: BookingRequest[] }

export default function RequestsClient({ initialRequests }: Props) {
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'New' | 'Closed'>('All');
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = requests.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      (r.tripTitle?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchFilter = filter === 'All' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleStatus = async (r: BookingRequest) => {
    const newStatus = r.status === 'New' ? 'Closed' : 'New';
    setLoading(r.id);
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id, status: newStatus }),
      });
      if (res.ok) {
        setRequests(prev => prev.map(req => req.id === r.id ? { ...req, status: newStatus } : req));
      }
    } finally {
      setLoading(null);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm('Delete this request?')) return;
    setLoading(id);
    try {
      const res = await fetch('/api/requests', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setRequests(prev => prev.filter(r => r.id !== id));
    } finally {
      setLoading(null);
    }
  };

  const newCount = requests.filter(r => r.status === 'New').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark-800">Booking Requests</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {requests.length} total · <span className="text-green-600 font-medium">{newCount} new</span>
          </p>
        </div>
        <button onClick={() => window.location.reload()} className="btn-outline text-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, trip..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {(['All', 'New', 'Closed'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === s ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold text-dark-800">No requests found</p>
          <p className="text-slate-400 text-sm mt-1">Booking submissions from the website will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(req => (
            <div
              key={req.id}
              className={`bg-white rounded-2xl border p-5 space-y-4 transition-all ${
                req.status === 'New' ? 'border-green-200 shadow-sm' : 'border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-dark-800">{req.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      req.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  {req.tripTitle && (
                    <p className="text-xs text-brand-600 font-medium mt-0.5">📍 {req.tripTitle}</p>
                  )}
                </div>
                <p className="text-xs text-slate-400 shrink-0">
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone size={11} className="text-brand-400 shrink-0" />
                  <a href={`tel:${req.phone}`} className="hover:text-brand-600 transition-colors">{req.phone}</a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Globe size={11} className="text-brand-400 shrink-0" />
                  <span>{req.country}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar size={11} className="text-brand-400 shrink-0" />
                  <span>{req.travelDate}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users size={11} className="text-brand-400 shrink-0" />
                  <span>{req.adults} adult{req.adults !== 1 ? 's' : ''}{req.children > 0 ? `, ${req.children} child${req.children !== 1 ? 'ren' : ''}` : ''}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => toggleStatus(req)}
                  disabled={loading === req.id}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-60 ${
                    req.status === 'New'
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
                >
                  {loading === req.id ? '...' : req.status === 'New' ? 'Mark as Closed' : 'Reopen'}
                </button>
                <button
                  onClick={() => deleteRequest(req.id)}
                  disabled={loading === req.id}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-60"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
