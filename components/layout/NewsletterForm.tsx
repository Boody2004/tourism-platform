'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Connect to email provider / Supabase
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <p className="text-white font-semibold text-sm bg-white/20 px-6 py-3 rounded-full border border-white/30">
        ✓ You&apos;re subscribed!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 md:w-64 px-4 py-3 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white text-sm"
      />
      <button
        type="submit"
        className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-50 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
