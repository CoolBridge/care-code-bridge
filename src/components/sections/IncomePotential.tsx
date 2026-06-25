import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Wallet, Award } from "lucide-react"

export function IncomePotential() {
  const trainingSalaries = [
    { year: "YEAR 01", amount: "€1,380 – €1,490" },
    { year: "YEAR 02", amount: "€1,446 – €1,552" },
    { year: "YEAR 03", amount: "€1,553 – €1,653" }
  ]

  const qualifiedSalaries = [
    { role: "ENTRY NURSE", amount: "€3,500 – €3,700" },
    { role: "EXPERIENCED", amount: "€4,000 – €4,500" },
    { role: "SPECIALIST", amount: "€5,000+" }
  ]

  return (
    <section className="py-section bg-background relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <TrendingUp className="w-[60rem] h-[60rem] text-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-24">
          <Badge variant="outline" className="border-primary text-primary font-black italic rounded-none mb-4 md:mb-6 px-4 md:px-6 py-1 tracking-widest uppercase text-fluid-sm">FINANCIAL FORCE</Badge>
          <h2 className="text-fluid-5xl md:text-fluid-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
            INCOME <br /><span className="text-primary">DOMINANCE</span>
          </h2>
          <p className="text-fluid-xl md:text-fluid-2xl font-black text-muted-foreground uppercase tracking-tight max-w-3xl mx-auto">
            Secure high-performance compensation in the world's most stable economy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[3px] md:border-[5px] border-foreground">
          {/* Training Phase */}
          <div className="p-6 md:p-12 border-b-[3px] md:border-b-0 md:border-r-0 lg:border-b-0 lg:border-r-[5px] border-foreground hover:bg-primary transition-all duration-300 group">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
              <div className="p-3 bg-foreground text-background group-hover:bg-background group-hover:text-primary">
                <Wallet className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-fluid-2xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-background">AUSBILDUNG PAY</h3>
            </div>
            <Table>
              <TableHeader className="bg-secondary group-hover:bg-background/20">
                <TableRow className="border-b-[2px] md:border-b-[3px] border-foreground group-hover:border-background">
                  <TableHead className="text-foreground group-hover:text-background font-black italic h-12 md:h-14 uppercase text-fluid-sm">YEAR</TableHead>
                  <TableHead className="text-right text-foreground group-hover:text-background font-black italic h-12 md:h-14 uppercase text-fluid-sm">MONTHLY (GROSS)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingSalaries.map((item, idx) => (
                  <TableRow key={idx} className="border-b-[2px] md:border-b-[3px] border-foreground group-hover:border-background/50 hover:bg-transparent">
                    <TableCell className="font-black italic text-fluid-lg md:text-2xl uppercase tracking-tighter group-hover:text-background py-4 md:py-6">{item.year}</TableCell>
                    <TableCell className="text-right text-primary group-hover:text-background font-black italic text-fluid-xl md:text-3xl tracking-tighter py-4 md:py-6">{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-foreground text-background group-hover:bg-background group-hover:text-primary flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 skew-x-[-10deg]">
              <span className="text-fluid-base md:text-xl font-black italic uppercase tracking-tighter skew-x-[10deg]">ANNUAL YIELD</span>
              <span className="text-fluid-2xl md:text-4xl font-black italic tracking-tighter skew-x-[10deg]">€16.5K – €19.8K</span>
            </div>
          </div>

          {/* Qualified Phase */}
          <div className="p-6 md:p-12 hover:bg-accent transition-all duration-300 group">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
              <div className="p-3 bg-foreground text-background group-hover:bg-background group-hover:text-accent">
                <Award className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 className="text-fluid-2xl md:text-4xl font-black italic uppercase tracking-tighter group-hover:text-background">QUALIFIED PAY</h3>
            </div>
            <Table>
              <TableHeader className="bg-secondary group-hover:bg-background/20">
                <TableRow className="border-b-[2px] md:border-b-[3px] border-foreground group-hover:border-background">
                  <TableHead className="text-foreground group-hover:text-background font-black italic h-12 md:h-14 uppercase text-fluid-sm">ROLE</TableHead>
                  <TableHead className="text-right text-foreground group-hover:text-background font-black italic h-12 md:h-14 uppercase text-fluid-sm">MONTHLY (GROSS)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifiedSalaries.map((item, idx) => (
                  <TableRow key={idx} className="border-b-[2px] md:border-b-[3px] border-foreground group-hover:border-background/50 hover:bg-transparent">
                    <TableCell className="font-black italic text-fluid-lg md:text-2xl uppercase tracking-tighter group-hover:text-background py-4 md:py-6">{item.role}</TableCell>
                    <TableCell className="text-right text-accent group-hover:text-background font-black italic text-fluid-xl md:text-3xl tracking-tighter py-4 md:py-6">{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-8 md:mt-12 p-4 md:p-8 bg-accent/20 border-[2px] md:border-[3px] border-accent flex items-start gap-3 md:gap-4 relative overflow-hidden">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-accent shrink-0" />
              <p className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter leading-none text-accent">
                PLUS: TECH OVERRIDE <br />
                <span className="text-foreground text-fluid-xs md:text-sm font-bold uppercase tracking-tight">ADD €1,000 – €3,000 VIA REMOTE SOFTWARE PROJECTS</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
