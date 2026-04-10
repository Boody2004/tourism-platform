import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTripBySlug, getAllTrips } from '@/lib/data';
import ImageSlider from '@/components/ui/ImageSlider';
import FAQAccordion from '@/components/ui/FAQAccordion';
import BookingForm from '@/components/ui/BookingForm';
import TripCard from '@/components/ui/TripCard';
import Link from 'next/link';
import { MapPin, Users, Clock, Star, Check, X, ChevronRight } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllTrips().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trip = getTripBySlug(params.slug);
  if (!trip) return { title: 'Trip Not Found' };
  return {
    title: trip.title,
    description: trip.details.slice(0, 155) + '...',
  };
}

export default function TripDetailPage({ params }: Props) {
  const trip = getTripBySlug(params.slug);
  if (!trip) notFound();

  // Related trips: same type, different slug
  const related = getAllTrips()
    .filter(t => t.type === trip.type && t.slug !== trip.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/trips" className="hover:text-brand-600 transition-colors">Trips</Link>
            <ChevronRight size={14} />
            <Link href={`/trips/${trip.type.toLowerCase()}`} className="hover:text-brand-600 transition-colors">{trip.type}</Link>
            <ChevronRight size={14} />
            <span className="text-dark-800 font-medium truncate max-w-48">{trip.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Slider */}
            <ImageSlider images={trip.images} title={trip.title} />

            {/* Trip Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wide">
                  {trip.type}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} className="fill-yellow-400" />
                  <span className="text-sm font-semibold text-dark-800">{trip.rating}</span>
                  <span className="text-slate-400 text-sm">({trip.reviews} reviews)</span>
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-800 mb-4">
                {trip.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-brand-500" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-brand-500" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-brand-500" />
                  <span>Group: {trip.groupSize} pax</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div>
              <h2 className="font-display text-xl font-bold text-dark-800 mb-3">About This Trip</h2>
              <p className="text-slate-600 leading-relaxed">{trip.details}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-display text-xl font-bold text-dark-800 mb-4">Trip Highlights</h2>
              <ul className="space-y-2.5">
                {trip.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-brand-600" />
                    </div>
                    <span className="text-slate-700 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included / Excluded */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> What's Included
                </h3>
                <ul className="space-y-2">
                  {trip.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                      <Check size={13} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-5">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <X size={16} className="text-red-500" /> Not Included
                </h3>
                <ul className="space-y-2">
                  {trip.excluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                      <X size={13} className="text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-display text-xl font-bold text-dark-800 mb-4">Frequently Asked Questions</h2>
              <FAQAccordion faqs={trip.faqs} />
            </div>
          </div>

          {/* Right: Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-2xl border-2 border-brand-100 shadow-lg p-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-slate-400 text-sm">From</span>
                  <span className="font-display text-3xl font-bold text-brand-600">
                    USD {trip.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mb-6">per person · all inclusive</p>
                <BookingForm tripId={trip.id} tripTitle={trip.title} />
              </div>

              {/* Contact card */}
              <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-600 space-y-2 border border-slate-200">
                <p className="font-semibold text-dark-800">Need help booking?</p>
                <p>Our travel experts are available 7 days a week</p>
                <div className="flex flex-col gap-2 pt-1">
                  <a href="tel:+1234567890" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                    📞 +1 (234) 567-890
                  </a>
                  <a href="mailto:hello@touriva.com" className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium">
                    ✉️ hello@touriva.com
                  </a>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
                    💬 WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related trips */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-6">
              More {trip.type} Trips You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(t => (
                <TripCard key={t.id} trip={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
