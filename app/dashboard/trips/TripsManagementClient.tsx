"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trip } from "@/lib/types";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Star,
  ExternalLink,
  X,
  Check,
  Minus,
} from "lucide-react";
import { getAllTripTypes, getAllDestinations } from "@/lib/data";

interface Props {
  initialTrips: Trip[];
}

const inputClass =
  "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all bg-white";

// ── Reusable array field ──────────────────────────────────────────────────────
function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}) {
  const add = () => onChange([...values, ""]);
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) =>
    onChange(values.map((v, idx) => (idx === i ? val : v)));

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <button
          type="button"
          onClick={add}
          className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
        >
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={v}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Minus size={14} />
            </button>
          </div>
        ))}
        {values.length === 0 && (
          <p className="text-xs text-slate-400 italic">
            No items yet. Click &quot;Add item&quot; to begin.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Reusable FAQ field ────────────────────────────────────────────────────────
function FAQField({
  faqs,
  onChange,
}: {
  faqs: { question: string; answer: string }[];
  onChange: (f: typeof faqs) => void;
}) {
  const add = () => onChange([...faqs, { question: "", answer: "" }]);
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i));
  const update = (i: number, key: "question" | "answer", val: string) =>
    onChange(faqs.map((f, idx) => (idx === i ? { ...f, [key]: val } : f)));

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium text-slate-700">FAQs</label>
        <button
          type="button"
          onClick={add}
          className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
        >
          <Plus size={12} /> Add FAQ
        </button>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                FAQ #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs text-red-400 hover:text-red-500"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={faq.question}
              onChange={(e) => update(i, "question", e.target.value)}
              placeholder="Question..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <textarea
              value={faq.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
              placeholder="Answer..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
            />
          </div>
        ))}
        {faqs.length === 0 && (
          <p className="text-xs text-slate-400 italic">
            No items yet. Click &quot;Add item&quot; to begin.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({
  trip,
  onClose,
  onSave,
}: {
  trip: Trip;
  onClose: () => void;
  onSave: (updated: Trip) => void;
}) {
  const [form, setForm] = useState({
    title: trip.title,
    destination: trip.destination,
    type: trip.type,
    groupSize: trip.groupSize,
    duration: trip.duration,
    price: String(trip.price),
    details: trip.details,
    featured: trip.featured,
    images: trip.images.length > 0 ? trip.images : [""],
    highlights: trip.highlights,
    included: trip.included,
    excluded: trip.excluded,
    faqs: trip.faqs,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const set = (key: string, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload = {
        ...trip,
        ...form,
        price: Number(form.price),
        images: form.images.filter(Boolean),
        highlights: form.highlights.filter(Boolean),
        included: form.included.filter(Boolean),
        excluded: form.excluded.filter(Boolean),
        faqs: form.faqs.filter((f) => f.question && f.answer),
      };
      const res = await fetch("/api/trips", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        onSave(payload as Trip);
        setTimeout(onClose, 800);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="font-display text-xl font-bold text-dark-800">
              Edit Trip
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">{trip.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-dark-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto max-h-[75vh]"
        >
          {/* Images */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Images
            </label>
            {/* Drag & drop placeholder — TODO: Connect to Supabase Storage later */}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50 hover:border-brand-300 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-300"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-sm text-slate-400 font-medium">
                  Drag & drop images here
                </p>
                <p className="text-xs text-slate-300">
                  TODO: Connect to Supabase Storage later
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Or enter image URLs directly:
            </p>
            <ArrayField
              label=""
              values={form.images}
              onChange={(v) => set("images", v)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Basic info */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Trip Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Destination *
              </label>
              <select
                required
                value={form.destination}
                onChange={(e) => set("destination", e.target.value)}
                className={inputClass}
              >
                <option value="">Select destination</option>
                {getAllDestinations().map((d) => (
                  <option key={d.slug} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Trip Type *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={inputClass}
              >
                <option value="">Select type</option>
                {getAllTripTypes().map((t) => (
                  <option key={t.slug} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Group Size
              </label>
              <input
                type="text"
                value={form.groupSize}
                onChange={(e) => set("groupSize", e.target.value)}
                placeholder="e.g. 2-15"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Duration
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="e.g. 5 Days / 4 Nights"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Price (USD) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Details *
            </label>
            <textarea
              required
              rows={4}
              value={form.details}
              onChange={(e) => set("details", e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="edit-featured"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 accent-brand-600"
            />
            <label
              htmlFor="edit-featured"
              className="text-sm font-medium text-slate-700"
            >
              Featured on homepage
            </label>
          </div>

          <ArrayField
            label="Highlights"
            values={form.highlights}
            onChange={(v) => set("highlights", v)}
            placeholder="e.g. Sunrise at the pyramids"
          />
          <ArrayField
            label="What's Included"
            values={form.included}
            onChange={(v) => set("included", v)}
            placeholder="e.g. Hotel accommodation"
          />
          <ArrayField
            label="What's Excluded"
            values={form.excluded}
            onChange={(v) => set("excluded", v)}
            placeholder="e.g. International flights"
          />
          <FAQField faqs={form.faqs} onChange={(v) => set("faqs", v)} />

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn-primary disabled:opacity-60 flex-1 justify-center"
            >
              {status === "loading" && (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                  Saving...
                </>
              )}
              {status === "success" && (
                <>
                  <Check size={16} /> Saved!
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <Check size={16} /> Save Changes
                </>
              )}
            </button>
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TripsManagementClient({ initialTrips }: Props) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const filtered = trips.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch("/api/trips", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setTrips((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setDeleting(null);
      setConfirmDelete(null);
    }
  };

  const handleSave = (updated: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <>
      {/* Edit modal */}
      {editingTrip && (
        <EditModal
          trip={editingTrip}
          onClose={() => setEditingTrip(null)}
          onSave={handleSave}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-dark-800">
              All Trips
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {trips.length} trips total
            </p>
          </div>
          <Link href="/dashboard/add-trip" className="btn-primary text-sm">
            <Plus size={16} /> Add New Trip
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Trip
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Destination
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Rating
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((trip) => (
                  <tr
                    key={trip.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={trip.images[0]}
                            alt={trip.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-dark-800 truncate max-w-[160px]">
                            {trip.title}
                          </p>
                          {trip.featured && (
                            <span className="text-xs text-brand-600 font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-xs font-medium rounded-full">
                        {trip.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 hidden lg:table-cell text-xs">
                      {trip.destination}
                    </td>
                    <td className="py-3 px-4 font-semibold text-dark-800">
                      USD {trip.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Star
                          size={11}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {trip.rating || "—"}
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
                        <button
                          onClick={() => setEditingTrip(trip)}
                          className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        {confirmDelete === trip.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(trip.id)}
                              disabled={deleting === trip.id}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-60"
                            >
                              {deleting === trip.id ? "..." : "Confirm"}
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
              <div className="text-center py-12 text-slate-400">
                No trips found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
