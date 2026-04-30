"use client";

import { useState } from "react";
import { Send, Shield, Phone, Mail } from "lucide-react";
import agencyData from "@/data/agency.json";

interface BookingFormProps {
  tripId?: string;
  tripTitle?: string;
  adultPrice?: number;
  childPrice?: number;
}

export default function BookingForm({
  tripId,
  tripTitle,
  adultPrice = 0,
  childPrice = 0,
}: BookingFormProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    country: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const totalAdult = adults * adultPrice;
  const totalChild = children * childPrice;
  const total = totalAdult + totalChild;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tripId,
          tripTitle,
          adults,
          children,
          totalPrice: total,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", email: "", travelDate: "", country: "" });
      setAdults(1);
      setChildren(0);
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

  const inputClass =
    "w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Price per person */}
      {adultPrice > 0 && (
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-slate-400 text-sm">From</span>
            <span className="font-display text-3xl font-bold text-brand-600">
              USD {adultPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-slate-400 text-xs">per adult</p>
        </div>
      )}

      {tripTitle && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-sm text-brand-700 font-medium">
          Booking for: {tripTitle}
        </div>
      )}

      {/* Calculator */}
      {adultPrice > 0 && (
        <div className="space-y-3">
          {/* Adults counter */}
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
            <div>
              <p className="text-sm font-medium text-dark-800">Adults</p>
              <p className="text-xs text-slate-400">
                USD {adultPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAdults((a) => Math.max(1, a - 1))}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg leading-none"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-dark-800 text-sm">
                {adults}
              </span>
              <button
                type="button"
                onClick={() => setAdults((a) => Math.min(30, a + 1))}
                className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg leading-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Children counter */}
          {childPrice > 0 && (
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
              <div>
                <p className="text-sm font-medium text-dark-800">Children</p>
                <p className="text-xs text-slate-400">
                  USD {childPrice.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChildren((c) => Math.max(0, c - 1))}
                  className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg leading-none"
                >
                  −
                </button>
                <span className="w-6 text-center font-bold text-dark-800 text-sm">
                  {children}
                </span>
                <button
                  type="button"
                  onClick={() => setChildren((c) => Math.min(20, c + 1))}
                  className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-brand-400 hover:text-brand-600 transition-colors text-lg leading-none"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between bg-brand-50 rounded-xl px-4 py-3 border border-brand-100">
            <p className="text-sm font-semibold text-brand-700">
              Total ({adults} adult{adults !== 1 ? "s" : ""}
              {children > 0
                ? `, ${children} child${children !== 1 ? "ren" : ""}`
                : ""}
              )
            </p>
            <p className="font-display text-xl font-bold text-brand-600">
              USD {total.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Form fields */}
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
            className={inputClass}
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
            className={inputClass}
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
            className={inputClass}
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
            className={inputClass}
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
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
          href={`tel:+${agencyData.phone.replace(/\D/g, "")}`}
          className="flex items-center gap-2 hover:text-brand-600 transition-colors"
        >
          <Phone size={13} className=" hover:text-brand-700 shrink-0" />
          Call Us
        </a>
        <a
          href={`mailto:${agencyData.email}`}
          className="flex items-center gap-2 hover:text-brand-600 transition-colors"
        >
          <Mail size={13} className="hover:text-brand-700 shrink-0" />
          Email
        </a>
        <a
          href={`https://wa.me/${agencyData.whatsappNumber.replace(/\D/g, "")}`}
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
