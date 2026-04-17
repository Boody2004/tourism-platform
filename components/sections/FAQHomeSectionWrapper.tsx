"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const faqs = [
  {
    q: "What types of travel packages do you offer?",
    a: "We offer adventure, cultural, luxury, and wellness packages across 150+ destinations worldwide. Each package is fully customizable to suit your travel style and budget.",
  },
  {
    q: "What's included in the trip packages?",
    a: "Most packages include accommodation, daily breakfast, select meals, ground transportation, guided tours, and all entry fees. Full inclusions are listed on each trip page.",
  },
  {
    q: "Do you offer payment plans or travel early?",
    a: "Yes! We offer flexible payment plans including interest-free EMI on select packages. A 20% deposit secures your booking with the balance due 60 days before departure.",
  },
  {
    q: "Can customers mix trip packages?",
    a: "Absolutely. We can create bespoke itineraries combining multiple destinations or trip types. Contact our team to discuss your dream custom journey.",
  },
  {
    q: "How do we ensure safety?",
    a: "All our guides are certified professionals. We monitor travel advisories 24/7, maintain comprehensive travel insurance partnerships, and have emergency protocols for every destination.",
  },
  {
    q: "Why should I choose company for my travel needs?",
    a: "With 15+ years of experience, 10,000+ satisfied travelers, and a 98% satisfaction rate, company delivers expertly planned trips with unmatched value and personal service.",
  },
];

export default function FAQHomeSectionWrapper() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionHeader
            title="Everything you need to know before touring with us."
            subtitle="Have more questions? Our team is available 24/7 via chat, phone, or email."
            centered
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                open === i
                  ? "border-brand-200 bg-brand-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <button
                className="w-full flex items-start gap-3 p-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div
                  className={`w-5 h-5 rounded-full shrink-0 mt-0.5 border-2 flex items-center justify-center transition-colors ${open === i ? "border-brand-500 bg-brand-500" : "border-slate-300"}`}
                >
                  {open === i && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
                <span
                  className={`font-medium text-sm flex-1 ${open === i ? "text-brand-700" : "text-dark-800"}`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-slate-400 transition-transform mt-0.5 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-4 pb-4 pl-12 text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
