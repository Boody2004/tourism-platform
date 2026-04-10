import Link from 'next/link';
import Image from 'next/image';
import { Tag } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const offers = [
  {
    title: 'Up to 40% OFF + Complimentary Breakfast',
    desc: 'Book any Dubai package before month-end and save big with our early bird deal.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    badge: '40% OFF',
    link: '/trip/dubai-thrill-adventure',
  },
  {
    title: 'Dubai Desert Safari Free with Booking',
    desc: 'Add a premium desert safari experience at no extra cost when you book this week.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    badge: 'FREE ADD-ON',
    link: '/trip/dubai-thrill-adventure',
  },
  {
    title: 'Get 41% OFF + Interest-free EMI',
    desc: 'Pay in installments with zero interest. Travel now, pay over time.',
    image: 'https://images.unsplash.com/photo-1499856374828-6d7e6b1d3ce0?w=600&q=80',
    badge: '41% OFF',
    link: '/trip/paris-splendid-discovery',
  },
  {
    title: 'For Worry-free Travel: Grab Up to 30% OFF',
    desc: 'US & Canada travelers get exclusive discounts on selected packages this season.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
    badge: '30% OFF',
    link: '/trip/bali-sacred-serenity',
  },
];

export default function OffersSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Special Offers"
            title="Exclusive deals, just for you"
            subtitle="Limited-time promotions on our most popular destinations."
          />
          <Link href="/trips" className="btn-outline shrink-0">
            All Offers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offers.map(offer => (
            <Link
              key={offer.title}
              href={offer.link}
              className="group relative h-52 rounded-2xl overflow-hidden shadow-sm card-hover block"
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <span className="inline-flex items-center gap-1 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit">
                  <Tag size={10} /> {offer.badge}
                </span>
                <div>
                  <h3 className="text-white font-semibold text-base leading-snug mb-1">{offer.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{offer.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Promo banner */}
        <div className="mt-6 bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-white text-xl font-semibold">
            Salty Greens, Crystal Waves and Endless Horizons. <br />
            <span className="font-normal text-base text-brand-100">Unwind with a Beach Escape in the Maldives!</span>
          </p>
          <Link href="/trip/maldives-ocean-escape" className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand-50 transition-colors whitespace-nowrap shrink-0">
            Book Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
