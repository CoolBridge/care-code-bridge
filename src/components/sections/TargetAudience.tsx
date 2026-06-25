import { GraduationCap, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

export function TargetAudience() {
  return (
    <section className="py-section bg-secondary border-y-[3px] border-border relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-fluid-4xl md:text-fluid-7xl font-black italic uppercase tracking-tighter leading-none mb-6 md:mb-10">
              WHO <br />
              <span className="text-primary">DOMINATES?</span>
            </h2>
            <p className="text-fluid-lg md:text-fluid-xl font-bold text-muted-foreground uppercase leading-tight mb-8 md:mb-12">
              This is not for the complacent. We are looking for ambitious Nigerians ready to redefine their legacy in the heart of Europe.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {[
                "NURSING ASPIRANTS",
                "TECH ENTHUSIASTS",
                "CAREER TRANSFORMERS",
                "GLOBAL MIGRATION SEEKERS"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <div className="w-4 h-4 bg-primary skew-x-[-12deg]" />
                  <span className="text-fluid-lg md:text-fluid-2xl font-black italic uppercase tracking-tighter">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <motion.div 
              whileHover={{ x: 10 }}
              className="p-6 md:p-10 bg-background border-[3px] md:border-[4px] border-foreground shadow-[6px_6px_0px_0px_var(--color-primary)] md:shadow-[10px_10px_0px_0px_var(--color-primary)]"
            >
              <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-primary mb-4 md:mb-6" />
              <h3 className="text-fluid-xl md:text-fluid-3xl font-black italic uppercase mb-3 md:mb-4">THE ACADEMIC FORCE</h3>
              <p className="font-bold text-muted-foreground uppercase text-fluid-sm leading-relaxed">
                Students and graduates ready to enter the German university system or highly paid Ausbildung vocational training.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="p-6 md:p-10 bg-background border-[3px] md:border-[4px] border-foreground shadow-[6px_6px_0px_0px_var(--color-accent)] md:shadow-[10px_10px_0px_0px_var(--color-accent)]"
            >
              <Briefcase className="w-10 h-10 md:w-12 md:h-12 text-accent mb-4 md:mb-6" />
              <h3 className="text-fluid-xl md:text-fluid-3xl font-black italic uppercase mb-3 md:mb-4">THE CAREER ELITE</h3>
              <p className="font-bold text-muted-foreground uppercase text-fluid-sm leading-relaxed">
                Professionals seeking high-performance upskilling and a direct, secure route to German employment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
