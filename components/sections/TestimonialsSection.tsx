import Image from "next/image";
import { Star, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Adventure Traveler",
    country: "India",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "Unforgettable journey! The Bali trip exceeded every expectation. The guides were knowledgeable, accommodation impeccable, and the cultural experiences left me breathless. I've already booked my next trip with company.",
    rating: 5,
    trip: "Bali Sacred Serenity",
  },
  {
    name: "Marcus Thompson",
    role: "Family Traveler",
    country: "Australia",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Took my family to Japan and it was the trip of a lifetime. Every detail was perfectly arranged — the kids loved it, the adults loved it, and the value was extraordinary. company made it seamless.",
    rating: 5,
    trip: "Tokyo Modern & Ancient",
  },
  {
    name: "Sophia Laurent",
    role: "Solo Traveler",
    country: "France",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "As a solo female traveler, safety and quality are paramount. company delivered both without compromise. The Maldives escape was pure magic — the most relaxing week of my life.",
    rating: 5,
    trip: "Maldives Ocean Escape",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <SectionHeader
            label="What Our Travelers Say"
            title="Real experiences from real people"
            subtitle="Join thousands of satisfied travelers who discovered the world with company."
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              {/* Quote icon */}
              <Quote size={20} className="text-brand-200 mb-3" />
              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                {t.text}
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-dark-800 text-sm">
                    {t.name}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {t.role} · {t.country}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full font-medium">
                    {t.trip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
