import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Pricing() {
  const plans = [
    {
      name: "STANDARD FORCE",
      price: "₦2,550,000",
      description: "Essential training and relocation support for high-performers.",
      features: [
        "GERMAN (A1-B2) MASTERY",
        "SOFTWARE ENGINEERING",
        "NURSING PATHWAY OPS",
        "CV & MOTIVATION PREP",
        "GROUP DRILLS"
      ],
      popular: false
    },
    {
      name: "PREMIUM ELITE",
      price: "₦3,500,000",
      description: "Enhanced support and 1-on-1 mentoring for maximum velocity.",
      features: [
        "EVERYTHING IN STANDARD",
        "1-ON-1 ELITE MENTORING",
        "FULL APPLICATION OPS",
        "APS & VISA EXECUTION",
        "GOETHE MOCK DRILLS"
      ],
      popular: true
    },
    {
      name: "EXECUTIVE COMMAND",
      price: "₦5,000,000",
      description: "Priority placement and command-level coaching for absolute success.",
      features: [
        "EVERYTHING IN PREMIUM",
        "DIRECT COMMAND COACHING",
        "PRIORITY OPS SUPPORT",
        "RELOCATION & HOUSING",
        "CAREER DEPLOYMENT OPS",
        "ALUMNI NETWORK ACCESS"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-section bg-background border-t-[6px] md:border-t-[10px] border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-left mb-12 md:mb-24 border-l-[6px] md:border-l-[12px] border-primary pl-4 md:pl-10">
          <h2 className="text-fluid-5xl md:text-fluid-8xl font-black italic uppercase tracking-tighter leading-none mb-4">
            PROGRAMME <br /><span className="text-primary">INVESTMENT</span>
          </h2>
          <p className="text-fluid-xl md:text-fluid-2xl font-black text-muted-foreground uppercase tracking-tight">
            Select your tier. Execute your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] md:border-[5px] border-foreground">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col p-6 md:p-12 border-foreground ${
                idx !== 2 ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] md:border-r-[5px]' : ''
              } ${plan.popular ? "bg-primary text-background" : "bg-background text-foreground hover:bg-secondary"} transition-all duration-300 group`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Badge className="bg-foreground text-background font-black italic rounded-none px-6 py-2 tracking-widest text-sm uppercase">MOST REQUESTED</Badge>
                </div>
              )}

              <div className="mb-8 md:mb-12">
                <h3 className={`text-fluid-xl md:text-fluid-3xl font-black italic uppercase mb-2 ${plan.popular ? 'text-background' : 'text-primary'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-fluid-3xl md:text-fluid-5xl font-black italic tracking-tighter uppercase">{plan.price}</span>
                  <span className={`text-xs font-bold uppercase tracking-widest ${plan.popular ? 'text-background/60' : 'text-muted-foreground'}`}>/MISSION</span>
                </div>
                <p className={`text-fluid-sm font-bold uppercase tracking-tight leading-tight ${plan.popular ? 'text-background/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 md:space-y-6 mb-10 md:mb-16 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className={`w-3 h-3 skew-x-[-12deg] ${plan.popular ? 'bg-background' : 'bg-primary'}`} />
                    <span className="text-fluid-base md:text-fluid-xl font-black italic uppercase tracking-tighter">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-16 md:h-20 text-fluid-lg md:text-fluid-2xl font-black italic uppercase rounded-none transition-all ${
                  plan.popular 
                  ? "bg-background text-primary hover:bg-background/90 hover:skew-x-[-6deg]" 
                  : "bg-primary text-background hover:bg-primary/90 hover:skew-x-[-6deg]"
                }`}
                asChild
              >
                <a href="#apply">ENROLL NOW</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-20 bg-foreground text-background p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="bg-primary p-3 md:p-4 shrink-0">
            <Info className="w-8 h-8 md:w-12 md:h-12 text-background" />
          </div>
          <div>
            <h4 className="text-fluid-xl md:text-fluid-3xl font-black italic uppercase tracking-tighter text-primary mb-2">INSTALMENT OPS AVAILABLE</h4>
            <p className="text-fluid-base md:text-fluid-lg font-bold uppercase tracking-tight text-background/80">
              We offer high-performance payment plans to match your mission parameters. Contact admissions for tactical details.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
