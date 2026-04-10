import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Globe, Heart, Shield } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Touriva — our story, our mission, and our team of travel experts.',
};

const values = [
  { icon: Globe, title: 'Global Reach', desc: 'Deep partnerships across 150+ destinations mean you get authentic local experiences that mass-market operators simply cannot offer.' },
  { icon: Heart, title: 'Passion-led', desc: 'Every member of our team is a passionate traveler. We only recommend experiences we have personally vetted and loved.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Your safety and peace of mind are our priority. Comprehensive insurance partnerships and 24/7 emergency support.' },
  { icon: Award, title: 'Award-winning', desc: 'Recognized as Asia\'s Best Boutique Tour Operator for three consecutive years by the Travel Industry Association.' },
];

const team = [
  { name: 'James Hartley', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'Priya Nair', role: 'Head of Experiences', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
  { name: 'Carlos Mendes', role: 'Adventure Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Yuki Tanaka', role: 'Asia Pacific Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80"
          alt="About Touriva"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 to-dark-900/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center pt-20">
          <div>
            <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">Our Story</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 max-w-xl">
              Travel is more than a destination
            </h1>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="Who We Are"
                title="Crafting journeys that change you"
                subtitle="Founded in 2009, Touriva began with a simple belief: the best travel experiences are deeply personal, meticulously planned, and genuinely transformative."
              />
              <p className="mt-4 text-slate-600 leading-relaxed">
                From a small Singapore office with two passionate travel lovers, we have grown into a team of 60+ specialists servicing travelers from 45 countries. Our philosophy has never changed: every trip we build should leave you different than when you arrived.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We are not a booking platform. We are travel architects — building tailored, end-to-end experiences with the precision of craftspeople and the enthusiasm of lifelong explorers.
              </p>
              <div className="mt-8 flex gap-6">
                {[{ n: '150+', l: 'Destinations' }, { n: '10K+', l: 'Travelers' }, { n: '15+', l: 'Years' }].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="font-display text-3xl font-bold text-brand-600">{s.n}</p>
                    <p className="text-slate-500 text-sm">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                alt="Our team planning trips"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Our Values" title="What drives us every day" centered />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-brand-600" />
                </div>
                <h3 className="font-semibold text-dark-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader label="Our Team" title="The people behind your adventures" centered />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {team.map(member => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-brand-200 transition-all">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-dark-800 text-sm">{member.name}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-brand-100 text-lg mb-8">
            Let our experts build the trip of your lifetime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/trips" className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-full hover:bg-brand-50 transition-colors">
              Browse Trips
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
