import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90"
          alt="Beautiful travel destination"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full mb-6 animate-fade-up">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Trusted by 10,000+ travelers worldwide
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up animate-delay-100">
            Whatever you&apos;re into,
            <br />
            <span className="text-brand-300 italic">there&apos;s a trip</span> waiting.
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed animate-fade-up animate-delay-200">
            Make this summer count. Stress less and fall in love with travel, once again.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up animate-delay-300">
            <Link href="/trips" className="btn-primary text-base">
              Explore Collections
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-white font-semibold border-2 border-white/30 hover:border-white px-6 py-3 rounded-full transition-all duration-200 hover:bg-white/10"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Play size={12} className="ml-0.5 fill-white text-white" />
              </div>
              Watch Our Story
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16 animate-fade-up animate-delay-400">
            {[
              { num: '150+', label: 'Destinations' },
              { num: '10K+', label: 'Happy Travelers' },
              { num: '98%', label: 'Satisfaction Rate' },
              { num: '15+', label: 'Years Experience' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-white">{stat.num}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
