import { Globe, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-12 md:pt-24 pb-8 md:pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-12 md:mb-24">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary p-1.5 md:p-2 skew-x-[-12deg]">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-background" />
              </div>
              <span className="font-black text-xl md:text-3xl tracking-tighter italic leading-none uppercase">
                Germany<span className="text-primary">Pathway</span>
              </span>
            </div>
            <p className="text-fluid-base md:text-xl font-bold uppercase tracking-tight leading-tight text-background/60 max-w-md">
              Nigeria's elite high-performance migration, education, and career development platform for healthcare and technology professionals.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter text-primary mb-4 md:mb-8 underline decoration-2 underline-offset-4">COMMANDS</h3>
            <ul className="space-y-3 md:space-y-4">
              {["OVERVIEW", "CURRICULUM", "PATHWAYS", "PRICING"].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter text-primary mb-4 md:mb-8 underline decoration-2 underline-offset-4">INTEL LINE</h3>
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
                <span className="text-fluid-sm md:text-lg font-bold uppercase tracking-tight leading-tight">admissions@germanypathway.ng</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
                <span className="text-fluid-sm md:text-lg font-bold uppercase tracking-tight leading-tight">+234 (0) 800 123 4567</span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
                <span className="text-fluid-sm md:text-lg font-bold uppercase tracking-tight leading-tight">LAGOS, NG | BERLIN, DE</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter text-primary mb-4 md:mb-8 underline decoration-2 underline-offset-4">SOCIAL</h3>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-3 md:p-4 bg-background/10 border-2 border-background/20 hover:border-primary hover:text-primary transition-all rounded-none skew-x-[-12deg]">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 skew-x-[12deg]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <p className="text-fluid-xs md:text-sm font-black italic uppercase tracking-tighter opacity-40 text-center md:text-left">
            © {new Date().getFullYear()} GERMANY PATHWAY FORCE. NO COMPROMISE.
          </p>
          <div className="flex gap-6 md:gap-10 text-fluid-xs md:text-sm font-black italic uppercase tracking-tighter opacity-40">
            <a href="#" className="hover:text-primary transition-colors hover:opacity-100">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors hover:opacity-100">TERMS</a>
          </div>
        </div>
      </div>

      {/* Large Decorative Text */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] select-none pointer-events-none">
        <p className="text-[15rem] md:text-[30rem] font-black italic uppercase leading-none">FORCE</p>
      </div>
    </footer>
  )
}
