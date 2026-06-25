import { motion } from "framer-motion"
import { ArrowRight, Heart, Code, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/cd6d8e41-5499-480f-b89a-3055e8814339/campaign-nurse-urban-berlin-fcc22809-1782234634560.webp" 
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          alt="Campaign"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge className="bg-primary text-background font-black italic tracking-widest px-4 py-1 mb-6 rounded-none">
              GERMANY CAREER ACCELERATION
            </Badge>
            <h1 className="text-fluid-6xl md:text-fluid-8xl font-black italic leading-[0.85] tracking-tighter text-foreground mb-8 uppercase drop-shadow-2xl">
              NURSING <br />
              <span className="text-primary">+</span> TECH <br />
              <span className="text-transparent border-t-2 border-b-2 border-primary [-webkit-text-stroke:2px_var(--color-primary)]">FORCE</span>
            </h1>
            
            <p className="text-fluid-xl md:text-fluid-2xl font-bold text-muted-foreground mb-12 max-w-2xl leading-tight border-l-4 border-primary pl-6 uppercase tracking-tight">
              A high-performance 12-month mission to secure your future in Germany. Master the language. Build the tech. Own the healthcare sector.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="h-16 md:h-20 px-8 md:px-12 text-fluid-lg md:text-fluid-2xl font-black italic rounded-none bg-primary text-background hover:bg-primary/90 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" asChild>
                <a href="#apply" className="flex items-center gap-4">
                  START TRAINING <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 md:h-20 px-8 md:px-12 text-fluid-lg md:text-fluid-2xl font-black italic rounded-none border-[3px] border-foreground text-foreground hover:bg-foreground hover:text-background transition-all" asChild>
                <a href="#overview">MISSION INTEL</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block select-none opacity-10">
        <p className="text-[12rem] font-black italic uppercase leading-none transform rotate-90 origin-center text-foreground pointer-events-none">
          PERFORMANCE
        </p>
      </div>
    </section>
  )
}
