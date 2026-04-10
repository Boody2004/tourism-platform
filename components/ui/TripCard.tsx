import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Clock, Star } from 'lucide-react';
import { Trip } from '@/lib/types';

interface TripCardProps {
  trip: Trip;
  variant?: 'default' | 'horizontal';
}

export default function TripCard({ trip, variant = 'default' }: TripCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/trip/${trip.slug}`} className="group flex gap-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        <div className="relative w-40 shrink-0 overflow-hidden">
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-center py-4 pr-4 gap-1">
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{trip.type}</span>
          <h3 className="font-display font-semibold text-dark-800 text-base leading-tight group-hover:text-brand-600 transition-colors">{trip.title}</h3>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MapPin size={11} />
            <span>{trip.destination}</span>
          </div>
          <p className="text-brand-600 font-bold text-sm mt-1">From USD {trip.price.toLocaleString()}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/trip/${trip.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover block">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={trip.images[0]}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
          {trip.type}
        </span>
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/30">
          <Star size={11} className="fill-yellow-400 text-yellow-400" />
          <span>{trip.rating}</span>
        </div>
        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white/80 text-xs">From</p>
          <p className="text-white font-bold text-lg">USD {trip.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-slate-400 text-xs mb-1.5">
          <MapPin size={11} />
          <span>{trip.destination}</span>
        </div>
        <h3 className="font-display font-semibold text-dark-800 text-base leading-snug group-hover:text-brand-600 transition-colors mb-3">
          {trip.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Clock size={12} className="text-brand-400" />
            <span>{trip.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} className="text-brand-400" />
            <span>{trip.groupSize} pax</span>
          </div>
          <div className="flex items-center gap-1 ml-auto text-yellow-500">
            <Star size={12} className="fill-yellow-400" />
            <span className="font-medium text-slate-600">{trip.rating} ({trip.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
