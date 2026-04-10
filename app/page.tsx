import HeroSection from '@/components/sections/HeroSection';
import FeaturedTripsSection from '@/components/sections/FeaturedTripsSection';
import DestinationsSection from '@/components/sections/DestinationsSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import OffersSection from '@/components/sections/OffersSection';
import FAQHomeSectionWrapper from '@/components/sections/FAQHomeSectionWrapper';
import { getAllTripTypes, getAllDestinations } from '@/lib/data';

export default function HomePage() {
  const types = getAllTripTypes();
  const destinations = getAllDestinations();

  return (
    <>
      <HeroSection />

      {/* Quick filter bar */}
      <div className="bg-white border-b border-slate-100 sticky top-16 md:top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            <span className="text-xs text-slate-400 font-medium shrink-0 mr-2">Browse:</span>
            {types.map(type => (
              <a
                key={type}
                href={`/trips/${type.toLowerCase()}`}
                className="shrink-0 text-xs font-semibold px-4 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
              >
                {type}
              </a>
            ))}
            <span className="text-slate-200 mx-1">|</span>
            {destinations.slice(0, 5).map(dest => (
              <a
                key={dest}
                href={`/destination/${dest.toLowerCase().replace(/[,\s]+/g, '-')}`}
                className="shrink-0 text-xs font-medium px-4 py-1.5 rounded-full border border-dashed border-slate-200 text-slate-500 hover:border-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all"
              >
                {dest.split(',')[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <FeaturedTripsSection />
      <WhyChooseUsSection />
      <DestinationsSection />
      <OffersSection />
      <TestimonialsSection />
      <FAQHomeSectionWrapper />
    </>
  );
}
