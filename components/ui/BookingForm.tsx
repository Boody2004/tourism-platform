'use client';

import { useState } from 'react';
import { Send, Shield } from 'lucide-react';

interface BookingFormProps {
  tripId?: string;
  tripTitle?: string;
}

export default function BookingForm({ tripId, tripTitle }: BookingFormProps) {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', travelDate: '',
    country: '', adults: 1, children: 0,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tripId, tripTitle }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', phone: '', email: '', travelDate: '', country: '', adults: 1, children: 0 });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="text-green-600" size={32} />
        </div>
        <h3 className="font-display text-xl font-bold text-dark-800 mb-2">Request Received!</h3>
        <p className="text-slate-500 text-sm">Our team will contact you within 24 hours to confirm your booking.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-brand-600 text-sm font-medium hover:underline">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {tripTitle && (
        <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-sm text-brand-700 font-medium">
          📍 Booking for: {tripTitle}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input
            type="text" name="name" required value={form.name} onChange={handleChange}
            placeholder="John Smith"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label>
          <input
            type="tel" name="phone" required value={form.phone} onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Travel Date *</label>
          <input
            type="date" name="travelDate" required value={form.travelDate} onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country of Residence *</label>
          <input
            type="text" name="country" required value={form.country} onChange={handleChange}
            placeholder="e.g. United States"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adults *</label>
            <input
              type="number" name="adults" required min={1} max={30} value={form.adults} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Children</label>
            <input
              type="number" name="children" min={0} max={20} value={form.children} onChange={handleChange}
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
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
        ) : (
          <><Send size={16} /> Send Booking Request</>
        )}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
      )}

      {/* Contact info below form */}
      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
        <a href="tel:+1234567890" className="hover:text-brand-600 transition-colors">📞 Call Us</a>
        <a href="mailto:hello@touriva.com" className="hover:text-brand-600 transition-colors">✉️ Email</a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">💬 WhatsApp</a>
      </div>
    </form>
  );
}
