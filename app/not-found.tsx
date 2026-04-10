import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Compass size={40} className="text-brand-400 animate-float" />
        </div>
        <h1 className="font-display text-6xl font-bold text-dark-800 mb-3">404</h1>
        <h2 className="font-display text-2xl font-semibold text-dark-700 mb-3">Page Not Found</h2>
        <p className="text-slate-500 mb-8">
          Looks like this page has gone on a trip of its own. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/trips" className="btn-outline">Browse Trips</Link>
        </div>
      </div>
    </div>
  );
}
