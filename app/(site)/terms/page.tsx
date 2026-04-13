import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Touriva travel services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using Touriva's website and services, you agree to
              be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services. These terms apply to all
              visitors, users, and customers of Touriva.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              2. Our Services
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Touriva provides travel planning and tour package services across
              Egypt and the surrounding region. We act as a travel organizer,
              arranging accommodation, transportation, guides, and activities on
              behalf of our clients. All services are subject to availability
              and confirmation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              3. Booking & Payment
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When making a booking with Touriva:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> A deposit is
                required to confirm your booking
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Full payment is
                due no later than 60 days before departure
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Prices are quoted
                in USD and are subject to change until booking is confirmed
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Bookings are only
                confirmed upon receipt of deposit and written confirmation from
                Touriva
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              4. Cancellation Policy
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Cancellation fees apply as follows:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> More than 60 days
                before departure: deposit forfeited
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> 30–60 days before
                departure: 50% of total trip cost
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Less than 30 days
                before departure: 100% of total trip cost
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              We strongly recommend purchasing comprehensive travel insurance to
              protect against unexpected cancellations.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              5. Travel Requirements
            </h2>
            <p className="text-slate-600 leading-relaxed">
              It is your responsibility to ensure you hold a valid passport, any
              required visas, and any necessary vaccinations or health
              documentation for your destination. Touriva is not liable for any
              costs or losses arising from failure to meet entry requirements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Touriva acts as an organizer and is not liable for personal
              injury, loss, damage, or additional expenses caused by events
              beyond our control, including but not limited to weather
              conditions, political unrest, natural disasters, or actions of
              third-party suppliers. Our liability is limited to the total
              amount paid for the trip.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              7. Changes to Itinerary
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Touriva reserves the right to modify itineraries, accommodation,
              or transportation arrangements due to unforeseen circumstances. We
              will notify you of any significant changes as soon as possible and
              offer suitable alternatives where available.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              8. Behavior & Conduct
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All travelers are expected to behave respectfully toward local
              cultures, fellow travelers, and Touriva staff. We reserve the
              right to remove any traveler from a tour without refund if their
              behavior is deemed disruptive, dangerous, or disrespectful.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All content on this website including text, images, logos, and
              itineraries is the property of Touriva and may not be reproduced,
              distributed, or used without written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              10. Governing Law
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These terms are governed by the laws of Egypt. Any disputes
              arising from the use of our services shall be subject to the
              exclusive jurisdiction of the courts of Egypt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              11. Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at{" "}
              <a
                href="mailto:hello@touriva.com"
                className="text-brand-600 hover:underline"
              >
                hello@touriva.com
              </a>{" "}
              or visit our{" "}
              <Link href="/contact" className="text-brand-600 hover:underline">
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-brand-600 hover:text-brand-700 text-sm font-medium"
          >
            ← Back to Home
          </Link>
          <Link
            href="/privacy"
            className="text-slate-500 hover:text-brand-600 text-sm transition-colors"
          >
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
