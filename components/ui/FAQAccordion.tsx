'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/lib/types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all duration-200 ${
            open === i ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'
          }`}
        >
          <button
            className="w-full flex items-center justify-between p-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className={`font-medium text-sm ${open === i ? 'text-brand-700' : 'text-dark-800'}`}>
              {faq.question}
            </span>
            <ChevronDown
              size={16}
              className={`shrink-0 ml-3 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180 text-brand-500' : ''}`}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
