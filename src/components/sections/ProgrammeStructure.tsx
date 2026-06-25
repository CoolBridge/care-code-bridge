import { motion } from "framer-motion"

export function ProgrammeStructure() {
  const phases = [
    {
      title: "PHASE 01: FOUNDATION",
      months: "01–03",
      details: [
        { label: "GERMAN", value: "A1 Mastery, Communication Drills" },
        { label: "TECH", value: "HTML, CSS, GIT, Logic Training" },
        { label: "INTEL", value: "Culture & Systems Orientation" }
      ]
    },
    {
      title: "PHASE 02: DEVELOPMENT",
      months: "04–06",
      details: [
        { label: "GERMAN", value: "A2 Level Proficiency" },
        { label: "TECH", value: "JS Mastery, Responsive Systems" },
        { label: "OPS", value: "Research & Employer Match-making" }
      ]
    },
    {
      title: "PHASE 03: PROFESSIONAL",
      months: "07–09",
      details: [
        { label: "GERMAN", value: "B1 Level Proficiency" },
        { label: "TECH", value: "React & Flutter Ecosystems" },
        { label: "MISSION", value: "CV Ops, Interview Drills, Applications" }
      ]
    },
    {
      title: "PHASE 04: EXECUTION",
      months: "10–12",
      details: [
        { label: "GERMAN", value: "B2 Mastery & Goethe Final" },
        { label: "TECH", value: "Capstone Project & Global Portfolio" },
        { label: "MISSION", value: "APS, Visa, Deployment to Germany" }
      ]
    }
  ]

  return (
    <section id="curriculum" className="py-section bg-background relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 md:mb-24 text-left border-l-[6px] md:border-l-[12px] border-primary pl-4 md:pl-10">
          <h2 className="text-fluid-5xl md:text-fluid-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
            THE 12-MONTH <br /><span className="text-primary">BLUEPRINT</span>
          </h2>
          <p className="text-fluid-xl md:text-fluid-2xl font-black uppercase tracking-tight text-muted-foreground">
            A structured deployment plan from foundation to full relocation.
          </p>
        </div>

        <div className="space-y-6 md:space-y-12">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row gap-0 border-[3px] md:border-[4px] border-foreground">
                <div className="md:w-48 bg-foreground text-background p-6 md:p-10 flex items-center justify-center shrink-0">
                  <span className="text-fluid-4xl md:text-fluid-7xl font-black italic tracking-tighter">{phase.months}</span>
                </div>
                <div className="flex-grow bg-card p-6 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:bg-primary transition-all">
                    <span className="text-fluid-2xl md:text-fluid-4xl font-black italic text-foreground tracking-tighter">PHASE {index + 1}</span>
                  </div>
                  <h3 className="text-fluid-2xl md:text-fluid-4xl font-black italic uppercase mb-4 md:mb-8 group-hover:text-primary transition-colors">{phase.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {phase.details.map((detail, i) => (
                      <div key={i} className="space-y-1 md:space-y-2 border-t border-border pt-3 md:pt-4">
                        <p className="text-fluid-xs font-black tracking-widest text-primary uppercase">{detail.label}</p>
                        <p className="text-fluid-base md:text-fluid-xl font-black italic uppercase tracking-tighter leading-none">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
