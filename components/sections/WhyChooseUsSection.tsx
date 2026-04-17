import { Hotel, UtensilsCrossed, Bus, Users, Tag, Plane } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Hotel,
    title: "Accommodation",
    desc: "Hand-selected hotels and resorts to suit every budget and style.",
  },
  {
    icon: UtensilsCrossed,
    title: "All Meals Covered",
    desc: "Breakfast and select dinners included on all our inclusive packages.",
  },
  {
    icon: Bus,
    title: "On-tour Transport",
    desc: "All ground transportation arranged — stress-free from airport to hotel.",
  },
  {
    icon: Users,
    title: "Tour Managers",
    desc: "Expert local guides who enrich every experience with insider knowledge.",
  },
  {
    icon: Tag,
    title: "Best Value Packages",
    desc: "Competitive pricing with no hidden fees — what you see is what you pay.",
  },
  {
    icon: Plane,
    title: "Flights Included",
    desc: "Select packages include return flights from major departure cities.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Why company
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Endless and hassle-free trips —
            <br />
            <span className="text-brand-400">your joy, our goal</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            Everything arranged, nothing left to chance. We handle the details
            so you can focus on the experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 bg-dark-700 rounded-2xl border border-dark-600 hover:border-brand-600/40 hover:bg-dark-700/80 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600/30 transition-colors">
                <Icon size={22} className="text-brand-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
