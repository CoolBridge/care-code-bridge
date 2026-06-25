import { BookOpen, FolderKanban, Plane } from "lucide-react"

export function Deliverables() {
  const categories = [
    {
      title: "ACADEMIC INTEL",
      icon: <BookOpen className="w-6 h-6" />,
      items: ["GERMAN DRILLS (A1–B2)", "GOETHE PREPARATION", "SOFTWARE ENGINEERING"]
    },
    {
      title: "DIGITAL WEAPONRY",
      icon: <FolderKanban className="w-6 h-6" />,
      items: ["PORTFOLIO SITE", "GITHUB ECOSYSTEM", "ELITE CV & LINKEDIN"]
    },
    {
      title: "LOGISTICS OPS",
      icon: <Plane className="w-6 h-6" />,
      items: ["NURSING CONTRACTS", "APS CERTIFICATION", "VISA & RELOCATION"]
    }
  ]

  return (
    <section className="py-section bg-primary text-background overflow-hidden relative">
      <div className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none">
        <div className="grid grid-cols-12 gap-0 h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-r border-background h-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-fluid-4xl md:text-fluid-7xl font-black italic uppercase tracking-tighter leading-none mb-4">
            STANDARD <br />DELIVERABLES
          </h2>
          <p className="text-fluid-lg md:text-fluid-xl font-black uppercase tracking-widest bg-background text-primary inline-block px-4 md:px-6 py-2">
            EVERY STUDENT. EVERY TIME.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-background/10 backdrop-blur-sm p-6 md:p-12 border-[3px] border-background hover:bg-background hover:text-primary transition-all group">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                <div className="p-3 bg-background text-primary group-hover:bg-primary group-hover:text-background">
                  {category.icon}
                </div>
                <h3 className="text-fluid-xl md:text-fluid-3xl font-black italic uppercase tracking-tighter">{category.title}</h3>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 md:gap-3 text-fluid-base md:text-fluid-lg font-black italic uppercase tracking-tighter">
                    <span className="w-3 h-3 bg-background group-hover:bg-primary shrink-0" />
                    {item}
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
