"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, Upload, Check } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";
import { getAllTripTypes, getAllDestinations } from "@/lib/data";

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}

function ArrayField({ label, values, onChange, placeholder }: ArrayFieldProps) {
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
          <Plus size={12} /> Add item
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
              className="flex-1 px-3 py-2 border border-slate-200 hover:border-brand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
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
              className="w-full px-3 py-2 border border-slate-200 hover:border-brand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <textarea
              value={faq.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
              placeholder="Answer..."
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 hover:border-brand-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
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

const inputClass =
  "w-full px-4 py-2.5 border border-slate-200 hover:border-brand-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-white";

export default function AddTripClient() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    title: "",
    destination: "",
    type: "",
    groupSize: "",
    duration: "",
    price: "",
    details: "",
    featured: false,
    images: [""],
    highlights: [""],
    included: [""],
    excluded: [""],
    faqs: [{ question: "", answer: "" }],
  });

  const set = (key: string, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        images: form.images.filter(Boolean),
        highlights: form.highlights.filter(Boolean),
        included: form.included.filter(Boolean),
        excluded: form.excluded.filter(Boolean),
        faqs: form.faqs.filter((f) => f.question && f.answer),
      };

      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => router.push("/dashboard/trips"), 1500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="font-display text-2xl font-bold text-dark-800 mb-2">
          Trip Added!
        </h2>
        <p className="text-slate-500 text-sm">Redirecting to trips list...</p>
        <p className="text-xs text-slate-400 mt-2">
          If this introduced a new type or destination, its route is
          automatically live.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-dark-800">
          Add New Trip
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          New types and destinations automatically create their own frontend
          routes — no manual page creation needed.
        </p>
      </div>

      {/* Images - Drag & Drop UI placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-dark-800 mb-4">Images</h2>
        {/* TODO: Connect to Supabase Storage later */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center mb-4 bg-slate-50 hover:border-brand-300 transition-colors cursor-pointer">
          <Upload size={24} className="text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400 font-medium">
            Drag & drop images here
          </p>
          <p className="text-xs text-slate-300 mt-1">
            TODO: Connect to Supabase Storage later
          </p>
        </div>
        <p className="text-xs text-slate-500 mb-3">
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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-dark-800">Basic Information</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Trip Title *
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Bali Sacred Serenity"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Trip Type *
            </label>
            <CustomSelect
              options={getAllTripTypes().map((t) => ({
                value: t.name,
                label: t.name,
              }))}
              value={form.type}
              onChange={(val) => set("type", val)}
              placeholder="Select a trip type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Destination *
            </label>
            <CustomSelect
              options={getAllDestinations().map((d) => ({
                value: d.name,
                label: d.name,
              }))}
              value={form.destination}
              onChange={(val) => set("destination", val)}
              placeholder="Select a destination"
            />
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
              placeholder="e.g. 7 Days / 6 Nights"
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
              placeholder="e.g. 1299"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Trip Details *
          </label>
          <textarea
            required
            rows={4}
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
            placeholder="Describe this trip in detail..."
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 accent-brand-600"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-slate-700"
          >
            Mark as Featured (shows on homepage)
          </label>
        </div>
      </div>

      {/* Highlights, Included, Excluded */}
      <div className="bg-white rounded-2xl border border-slate-200  p-6 space-y-6">
        <h2 className="font-semibold text-dark-800">Trip Details</h2>
        <ArrayField
          label="Highlights"
          values={form.highlights}
          onChange={(v) => set("highlights", v)}
          placeholder="e.g. Sunrise yoga in rice terraces"
        />
        <ArrayField
          label="What's Included"
          values={form.included}
          onChange={(v) => set("included", v)}
          placeholder="e.g. 4-star hotel accommodation"
        />
        <ArrayField
          label="What's Excluded"
          values={form.excluded}
          onChange={(v) => set("excluded", v)}
          placeholder="e.g. International flights"
        />
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-dark-800 mb-4">FAQs</h2>
        <FAQField faqs={form.faqs} onChange={(v) => set("faqs", v)} />
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
              Saving...
            </>
          ) : (
            <>
              <Check size={16} /> Save Trip
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline"
        >
          Cancel
        </button>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
