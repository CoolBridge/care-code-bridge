import * as React from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navLinks = [
    { name: "OVERVIEW", href: "#overview" },
    { name: "CURRICULUM", href: "#curriculum" },
    { name: "PATHWAYS", href: "#pathways" },
    { name: "PRICING", href: "#pricing" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b-[3px] border-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 md:p-2 skew-x-[-12deg]">
              <Globe className="w-5 h-5 md:w-7 md:h-7 text-background" />
            </div>
            <span className="font-black text-lg md:text-2xl tracking-tighter italic text-foreground leading-none uppercase">
              Germany<span className="text-primary">Pathway</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs md:text-sm font-black tracking-widest text-foreground hover:text-primary transition-all hover:italic hover:translate-x-1"
              >
                {link.name}
              </a>
            ))}
            <Button size="lg" className="bg-primary text-background font-black italic rounded-none px-6 md:px-10 text-sm md:text-base hover:bg-primary/90 hover:skew-x-[-6deg] transition-all" asChild>
              <a href="#apply">JOIN NOW</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-primary/20"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 md:w-8 md:h-8" /> : <Menu className="w-6 h-6 md:w-8 md:h-8" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b-[3px] border-primary overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-fluid-2xl font-black italic tracking-tighter text-foreground hover:text-primary border-b border-border/50"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 md:pt-6 px-3">
                <Button className="w-full h-14 md:h-16 text-fluid-lg md:text-xl font-black italic rounded-none bg-primary text-background" asChild>
                  <a href="#apply" onClick={() => setIsOpen(false)}>JOIN THE ELITE</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
