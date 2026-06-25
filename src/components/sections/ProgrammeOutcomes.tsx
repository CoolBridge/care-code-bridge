import { CheckCircle2, Languages, Monitor, Plane } from "lucide-react"

export function ProgrammeOutcomes() {
  const categories = [
    {
      title: "GERMAN MASTERY",
      icon: <Languages className="w-8 h-8" />,
      items: ["A1–B2 CERTIFICATION", "GOETHE EXAM PREP", "EXAM REGISTRATION", "FLUENT COMMUNICATION"]
    },
    {
      title: "TECH DOMINANCE",
      icon: <Monitor className="w-8 h-8" />,
      items: ["JS / REACT MASTERY", "FLUTTER MOBILE DEV", "GITHUB PORTFOLIO", "SCALABLE ARCHITECTURE"]
    },
    {
      title: "GERMAN MISSION",
      icon: <Plane className="w-8 h-8" />,
      items: ["CV & MOTIVATION PREP", "CULTURAL DRILL", "AUSBILDUNG CONTRACTS", "VISA EXECUTION"]
    }
  ]

  return (
    <section className="py-section bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-24 text-center">
          <h2 className="text-fluid-5xl md:text-fluid-8xl font-black italic uppercase tracking-tighter leading-none mb-6">
            THE <span className="text-primary">MISSION</span> <br />OUTCOMES
          </h2>
          <div className="w-16 md:w-24 h-2 md:h-3 bg-primary mx-auto mb-6 md:mb-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] md:border-[5px] border-foreground">
          {categories.map((category, idx) => (
            <div key={idx} className={`p-6 md:p-12 ${idx !== 2 ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] md:border-r-[5px]' : ''} border-foreground group hover:bg-primary transition-all duration-300`}>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 group-hover:text-background transition-colors">
                <div className="p-3 bg-foreground text-background group-hover:bg-background group-hover:text-primary">
                  {category.icon}
                </div>
                <h3 className="text-fluid-xl md:text-fluid-3xl font-black italic uppercase tracking-tighter leading-none">{category.title}</h3>
              </div>
              <ul className="space-y-4 md:space-y-6">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 group-hover:text-background transition-colors">
                    <div className="w-3 h-3 bg-primary group-hover:bg-background" />
                    <span className="text-fluid-base md:text-fluid-xl font-black italic uppercase tracking-tighter">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
