interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ label, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {label && (
        <span className="inline-block text-brand-600 text-sm font-semibold tracking-widest uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={`mt-4 text-slate-500 text-base md:text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
