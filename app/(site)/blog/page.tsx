import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'Travel tips, destination guides, and inspiring stories from the Touriva team.',
};

const categories = ['All', 'Destinations', 'Tips & Advice', 'Sustainability', 'Planning'];

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-800 to-brand-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-brand-300 text-sm font-semibold tracking-widest uppercase">Our Journal</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-3 mb-4">Travel Blog</h1>
          <p className="text-slate-300 text-lg max-w-lg mx-auto">
            Inspiration, insider tips, and destination guides from our team of expert travelers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                cat === 'All'
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="group block mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 lg:h-auto min-h-64 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-brand-600 text-xs font-semibold uppercase tracking-wide mb-3">{featured.category}</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-800 mb-4 group-hover:text-brand-600 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar size={12} />{featured.publishedAt}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{featured.readTime}</span>
                </div>
                <span className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(post => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-dark-800 text-base leading-snug mb-3 group-hover:text-brand-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
