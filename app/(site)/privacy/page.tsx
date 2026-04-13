import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Touriva collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">
            Legal
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300">Last updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="prose prose-slate max-w-none space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you use Touriva's website or submit a booking request, we may
              collect the following personal information:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Full name and
                contact details (phone number, email address)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Travel
                preferences and booking information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Country of
                residence and travel dates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Group size and
                trip requirements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Usage data and
                browsing behavior on our website
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Process and
                respond to your booking requests
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Communicate with
                you about your trips and inquiries
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Send travel
                updates, offers, and newsletters (only with your consent)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Improve our
                website and services
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Comply with legal
                obligations
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              3. How We Protect Your Information
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We take the security of your personal data seriously. All data
              submitted through our website is transmitted over secure HTTPS
              connections. We do not sell, trade, or rent your personal
              information to third parties. Access to your data is restricted to
              authorized Touriva staff only.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              4. Cookies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may use cookies to enhance your browsing experience.
              Cookies are small files stored on your device that help us
              understand how visitors use our site. You can choose to disable
              cookies through your browser settings, though this may affect some
              website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may use trusted third-party services such as Google Analytics,
              payment processors, and email platforms. These services have their
              own privacy policies and we encourage you to review them. We only
              share the minimum necessary information with these providers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              6. Your Rights
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Access the
                personal data we hold about you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Request
                correction of inaccurate information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Request deletion
                of your personal data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span> Opt out of
                marketing communications at any time
              </li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:hello@touriva.com"
                className="text-brand-600 hover:underline"
              >
                hello@touriva.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              7. Changes to This Policy
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated date. We encourage you
              to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-4">
              8. Contact Us
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please
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
            href="/terms"
            className="text-slate-500 hover:text-brand-600 text-sm transition-colors"
          >
            View Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
