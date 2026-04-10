import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { getAllDestinations } from "@/lib/data";

export default function DestinationsSection() {
  const destinations = getAllDestinations().slice(0, 4);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionHeader
            label="Destinations"
            title="See more destinations"
            subtitle="From the Red Sea coast to the ancient Nile Valley — your next adventure awaits."
          />
          <Link href="/destinations" className="btn-outline shrink-0">
            View all destinations <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative h-56 rounded-2xl overflow-hidden shadow-sm card-hover block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-display font-semibold text-lg leading-tight">
                  {dest.name}
                </p>
                <p className="text-white/70 text-xs mt-1">{dest.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
