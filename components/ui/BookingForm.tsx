"use client";

import { useState } from "react";
import { Send, Shield } from "lucide-react";
import { Phone, Mail } from "lucide-react";

interface BookingFormProps {
  tripId?: string;
  tripTitle?: string;
}

export default function BookingForm({ tripId, tripTitle }: BookingFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    country: "",
    adults: 1,
    children: 0,
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tripId, tripTitle }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        travelDate: "",
        country: "",
        adults: 1,
        children: 0,
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="text-green-600" size={32} />
        </div>
        <h3 className="font-display text-xl font-bold text-dark-800 mb-2">
          Request Received!
        </h3>
        <p className="text-slate-500 text-sm">
          Our team will contact you within 24 hours to confirm your booking.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-brand-600 text-sm font-medium hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {tripTitle && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-sm text-brand-700 font-medium">
          Booking for: {tripTitle}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preferred Travel Date *
          </label>
          <input
            type="date"
            name="travelDate"
            required
            value={form.travelDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Country of Residence *
          </label>
          <input
            type="text"
            name="country"
            required
            value={form.country}
            onChange={handleChange}
            placeholder="e.g. United States"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Adults *
            </label>
            <input
              type="number"
              name="adults"
              required
              min={1}
              max={30}
              value={form.adults}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Children
            </label>
            <input
              type="number"
              name="children"
              min={0}
              max={20}
              value={form.children}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* reCAPTCHA placeholder */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-slate-300 rounded" />
        <span className="text-sm text-slate-500">I&apos;m not a robot</span>
        <div className="ml-auto">
          <Shield size={24} className="text-slate-300" />
          <p className="text-[10px] text-slate-400">reCAPTCHA v3</p>
        </div>
      </div>
      {/* TODO: Connect real Google reCAPTCHA v3 — replace placeholder above */}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
            Sending...
          </span>
        ) : (
          <>
            <Send size={16} /> Send Booking Request
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Contact info below form */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
        <a
          href="tel:+1234567890"
          className="flex items-center gap-2 hover:text-brand-600 transition-colors"
        >
          <Phone size={13} className=" hover:text-brand-700 shrink-0" />
          Call Us
        </a>
        <a
          href="mailto:hello@touriva.com"
          className="flex items-center gap-2 hover:text-brand-600 transition-colors"
        >
          <Mail size={13} className="hover:text-brand-700 shrink-0" />
          Email
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-green-600 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-[14px] h-[14px]"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </form>
  );
}
