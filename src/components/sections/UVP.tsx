import { Globe, Heart, Code, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function UVP() {
  const values = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: "GERMAN MASTERY",
      tag: "A1-B2",
      description: "Aggressive language training. Goethe exam preparation. Fluency is not an option, it's a requirement."
    },
    {
      icon: <Code className="w-10 h-10" />,
      title: "FULL STACK ELITE",
      tag: "REACT + FLUTTER",
      description: "Build robust web and mobile ecosystems. High-value tech skills to double your income potential."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "HEALTHCARE OPS",
      tag: "AUSBILDUNG",
      description: "Direct pathway to German nursing. Paid training. Guaranteed career placement in the EU."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "TOTAL RELOCATION",
      tag: "SUPPORT",
      description: "Visa. APS. Cultural integration. We don't just process papers; we execute your move."
    }
  ]

  return (
    <section id="overview" className="py-section bg-background border-t-[6px] md:border-t-[10px] border-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <Zap className="w-[40rem] h-[40rem] text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 md:mb-24">
          <h2 className="text-fluid-4xl md:text-fluid-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
            THE <span className="text-primary underline decoration-8 underline-offset-8">INTEGRATED</span> <br />ADVANTAGE
          </h2>
          <p className="text-fluid-xl md:text-fluid-2xl font-bold text-muted-foreground uppercase max-w-3xl">
            We don't do generic. We build elite professionals. Three high-value pillars, one unstoppable career pathway.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {values.map((item, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.02, skewX: -2 }}
              className="bg-card p-6 md:p-10 border-l-[6px] md:border-l-[8px] border-primary hover:bg-primary transition-all group"
            >
              <div className="text-primary group-hover:text-background transition-colors mb-4 md:mb-8">
                {item.icon}
              </div>
              <p className="text-fluid-xs font-black tracking-widest text-primary group-hover:text-background/80 mb-2 uppercase">
                {item.tag}
              </p>
              <h3 className="text-fluid-lg md:text-fluid-2xl font-black italic uppercase mb-3 md:mb-4 group-hover:text-background transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-background/90 text-fluid-sm font-bold uppercase tracking-tight transition-colors">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
