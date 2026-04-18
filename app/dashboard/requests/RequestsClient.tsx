"use client";

import { useState } from "react";
import { BookingRequest } from "@/lib/types";
import {
  Search,
  Trash2,
  RefreshCw,
  Users,
  Calendar,
  Globe,
  Phone,
  Mail,
  MapPin,
  FileText,
  Tag,
} from "lucide-react";

interface Props {
  initialRequests: BookingRequest[];
}

export default function RequestsClient({ initialRequests }: Props) {
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "New" | "Closed">("All");
  const [typeFilter, setTypeFilter] = useState<
    "All" | "Regular" | "Tailor Made"
  >("All");
  const [loading, setLoading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search) ||
      (r.tripTitle?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = filter === "All" || r.status === filter;
    const matchType =
      typeFilter === "All" ||
      (typeFilter === "Tailor Made" && r.isTailorMade) ||
      (typeFilter === "Regular" && !r.isTailorMade);
    return matchSearch && matchStatus && matchType;
  });

  const toggleStatus = async (r: BookingRequest) => {
    const newStatus = r.status === "New" ? "Closed" : "New";
    setLoading(r.id);
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: r.id, status: newStatus }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((req) =>
            req.id === r.id ? { ...req, status: newStatus } : req,
          ),
        );
      }
    } finally {
      setLoading(null);
    }
  };

  const deleteRequest = async (id: string) => {
    setLoading(id);
    try {
      const res = await fetch("/api/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setRequests((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setLoading(null);
      setConfirmDelete(null);
    }
  };

  const newCount = requests.filter((r) => r.status === "New").length;
  const tailorCount = requests.filter((r) => r.isTailorMade).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-dark-800">
            Booking Requests
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {requests.length} total ·{" "}
            <span className="text-green-600 font-medium">{newCount} new</span> ·{" "}
            <span className="text-brand-600 font-medium">
              {tailorCount} tailor made
            </span>
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="btn-outline text-sm"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by name, phone, trip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 hover:border-brand-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
          />
        </div>
        {/* Status filter */}
        <div className="flex gap-2">
          {(["All", "New", "Closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === s
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-brand-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {/* Type filter */}
        <div className="flex gap-2">
          {(["All", "Regular", "Tailor Made"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                typeFilter === t
                  ? "bg-dark-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="font-semibold text-dark-800">No requests found</p>
          <p className="text-slate-400 text-sm mt-1">
            Booking submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((req) =>
            req.isTailorMade ? (
              <TailorMadeCard
                key={req.id}
                req={req}
                loading={loading}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                toggleStatus={toggleStatus}
                deleteRequest={deleteRequest}
              />
            ) : (
              <RegularCard
                key={req.id}
                req={req}
                loading={loading}
                confirmDelete={confirmDelete}
                setConfirmDelete={setConfirmDelete}
                toggleStatus={toggleStatus}
                deleteRequest={deleteRequest}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ── Shared props ──────────────────────────────────────────────────────────────
interface CardProps {
  req: BookingRequest;
  loading: string | null;
  confirmDelete: string | null;
  setConfirmDelete: (id: string | null) => void;
  toggleStatus: (r: BookingRequest) => void;
  deleteRequest: (id: string) => void;
}

// ── Shared action bar ─────────────────────────────────────────────────────────
function CardActions({
  req,
  loading,
  confirmDelete,
  setConfirmDelete,
  toggleStatus,
  deleteRequest,
}: CardProps) {
  return (
    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
      <button
        onClick={() => toggleStatus(req)}
        disabled={loading === req.id}
        className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-60 ${
          req.status === "New"
            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
      >
        {loading === req.id
          ? "..."
          : req.status === "New"
            ? "Mark as Closed"
            : "Reopen"}
      </button>

      {confirmDelete === req.id ? (
        <div className="flex items-center gap-1">
          <button
            onClick={() => deleteRequest(req.id)}
            disabled={loading === req.id}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-60"
          >
            {loading === req.id ? "..." : "Confirm"}
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
          onClick={() => setConfirmDelete(req.id)}
          disabled={loading === req.id}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-60"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

// ── Regular booking card ──────────────────────────────────────────────────────
function RegularCard(props: CardProps) {
  const { req } = props;
  return (
    <div
      className={`bg-white rounded-2xl border p-5 space-y-4 transition-all ${
        req.status === "New" ? "border-green-200 shadow-sm" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-dark-800">{req.name}</h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                req.status === "New"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {req.status}
            </span>
          </div>
          {req.tripTitle && (
            <p className="text-xs text-brand-600 font-medium mt-0.5">
              {req.tripTitle}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-400 shrink-0">
          {new Date(req.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Phone size={11} className="text-brand-400 shrink-0" />
          <a href={`tel:${req.phone}`} className="hover:text-brand-600">
            {req.phone}
          </a>
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
          <span>
            {req.adults} adult{req.adults !== 1 ? "s" : ""}
            {req.children > 0
              ? `, ${req.children} child${req.children !== 1 ? "ren" : ""}`
              : ""}
          </span>
        </div>
      </div>

      <CardActions {...props} />
    </div>
  );
}

// ── Tailor Made card ──────────────────────────────────────────────────────────
function TailorMadeCard(props: CardProps) {
  const { req } = props;
  return (
    <div
      className={`bg-white rounded-2xl border-2 p-5 space-y-4 transition-all ${
        req.status === "New" ? "border-brand-200" : "border-slate-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-dark-800">{req.name}</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
              ✦ Tailor Made
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                req.status === "New"
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {req.status}
            </span>
          </div>
          {req.requestTitle && (
            <p className="text-sm font-semibold text-dark-700 mt-1">
              {req.requestTitle}
            </p>
          )}
        </div>
        <p className="text-xs text-slate-400 shrink-0">
          {new Date(req.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* All data grid */}
      <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {req.phone && (
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={11} className="text-brand-400 shrink-0" />
            <a
              href={`tel:${req.phone}`}
              className="hover:text-brand-600 font-medium"
            >
              {req.phone}
            </a>
          </div>
        )}
        {req.email && (
          <div className="flex items-center gap-2 text-slate-600">
            <Mail size={11} className="text-brand-400 shrink-0" />
            <a
              href={`mailto:${req.email}`}
              className="hover:text-brand-600 truncate"
            >
              {req.email}
            </a>
          </div>
        )}
        {req.nationality && (
          <div className="flex items-center gap-2 text-slate-600">
            <Tag size={11} className="text-brand-400 shrink-0" />
            <span>
              <span className="text-slate-400">Nationality:</span>{" "}
              {req.nationality}
            </span>
          </div>
        )}
        {req.country && (
          <div className="flex items-center gap-2 text-slate-600">
            <Globe size={11} className="text-brand-400 shrink-0" />
            <span>
              <span className="text-slate-400">Country:</span> {req.country}
            </span>
          </div>
        )}
        {req.arrivalDate && (
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={11} className="text-green-500 shrink-0" />
            <span>
              <span className="text-slate-400">Arrival:</span> {req.arrivalDate}
            </span>
          </div>
        )}
        {req.departureDate && (
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar size={11} className="text-red-400 shrink-0" />
            <span>
              <span className="text-slate-400">Departure:</span>{" "}
              {req.departureDate}
            </span>
          </div>
        )}
        {(req.adults !== undefined || req.children !== undefined) && (
          <div className="flex items-center gap-2 text-slate-600">
            <Users size={11} className="text-brand-400 shrink-0" />
            <span>
              {req.adults} adult{req.adults !== 1 ? "s" : ""}
              {req.children > 0
                ? `, ${req.children} child${req.children !== 1 ? "ren" : ""}`
                : ""}
            </span>
          </div>
        )}
        {req.wishTo && (
          <div className="flex items-center gap-2 text-slate-600 sm:col-span-2">
            <MapPin size={11} className="text-brand-400 shrink-0" />
            <span>
              <span className="text-slate-400">Where:</span> {req.wishTo}
            </span>
          </div>
        )}
      </div>

      {/* Note */}
      {req.note && (
        <div className="flex items-start gap-2 text-xs text-slate-600 bg-amber-50 border border-amber-100 rounded-xl p-3">
          <FileText size={11} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-amber-600 font-semibold block mb-0.5">
              Note
            </span>
            <span>{req.note}</span>
          </div>
        </div>
      )}

      <CardActions {...props} />
    </div>
  );
}
