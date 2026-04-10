import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

const MOCK_CONTENT = `Travel has always been one of humanity's most powerful forces for connection — with the world, with other cultures, and ultimately with ourselves. In an era of increasing digital distraction and social isolation, the act of stepping out of our comfort zones and into unfamiliar landscapes has never felt more necessary.

What makes a great travel experience? It's rarely the luxury of the hotel or the prestige of the destination. The moments that stay with us are almost always unexpected: the conversation with a fisherman at dawn, the taste of a dish you can't quite name, the sunset that made you forget to check your phone.

Research consistently shows that experiential spending delivers far greater long-term satisfaction than material purchases. But not all experiences are created equal. The difference between a forgettable package holiday and a truly life-changing journey often comes down to one thing: intentionality.

Intentional travel means choosing destinations and experiences that align with your genuine interests and values. It means slowing down enough to actually absorb your surroundings. It means engaging with local communities rather than observing them from a tour bus window.

At Touriva, we design every itinerary around these principles. We obsess over the quiet moments between the landmarks — the tea house halfway up a mountain, the family kitchen where you'll learn to cook a dish that's been in their family for centuries, the off-schedule detour to a village festival that wasn't in any guidebook.

The world is extraordinarily diverse and extraordinarily beautiful. We believe it's our responsibility to help you experience it in a way that respects that beauty, supports the communities you visit, and leaves you genuinely changed.`;

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 max-w-4xl mx-auto">
          <span className="text-brand-300 text-xs font-semibold uppercase tracking-widest">{post.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mt-2 leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
          <Link href="/blog" className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14} />{post.publishedAt}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
        </div>

        {/* Article body */}
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">{post.excerpt}</p>
          {MOCK_CONTENT.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-6">{para}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-brand-50 rounded-2xl p-8 text-center border border-brand-100">
          <h3 className="font-display text-2xl font-bold text-dark-800 mb-2">Ready to start your own story?</h3>
          <p className="text-slate-500 mb-6">Browse our curated trips and find your perfect adventure.</p>
          <Link href="/trips" className="btn-primary">Explore All Trips</Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-dark-800 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-semibold text-sm text-dark-800 group-hover:text-brand-600 transition-colors leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
