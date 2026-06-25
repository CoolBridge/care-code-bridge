import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, TrendingUp, GraduationCap, Briefcase } from "lucide-react"

export function PathwayOptions() {
  return (
    <section id="pathways" className="py-section bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-12 md:mb-24">
          <h2 className="text-fluid-5xl md:text-fluid-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
            CHOOSE YOUR <br /><span className="text-primary underline decoration-8 underline-offset-8">DEPLOYMENT</span>
          </h2>
          <p className="text-fluid-xl md:text-fluid-2xl font-black text-muted-foreground uppercase tracking-tight">
            Select your specialized route into the German Federation.
          </p>
        </div>

        <Tabs defaultValue="ausbildung" className="w-full">
          <TabsList className="flex flex-col md:flex-row w-full h-auto bg-transparent gap-3 md:gap-4 p-0 mb-8 md:mb-12">
            <TabsTrigger 
              value="ausbildung" 
              className="flex-grow h-16 md:h-24 text-fluid-xl md:text-3xl font-black italic uppercase tracking-tighter bg-background border-[3px] md:border-[4px] border-foreground data-[state=active]:bg-primary data-[state=active]:text-background rounded-none transition-all"
            >
              NURSING AUSBILDUNG
            </TabsTrigger>
            <TabsTrigger 
              value="university" 
              className="flex-grow h-16 md:h-24 text-fluid-xl md:text-3xl font-black italic uppercase tracking-tighter bg-background border-[3px] md:border-[4px] border-foreground data-[state=active]:bg-accent data-[state=active]:text-background rounded-none transition-all"
            >
              NURSING UNIVERSITY
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ausbildung">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[3px] md:border-[5px] border-foreground bg-background overflow-hidden">
              <div className="lg:col-span-4 bg-foreground text-background p-6 md:p-12 flex flex-col justify-between">
                <div>
                  <Badge className="bg-primary text-background font-black italic rounded-none mb-4 md:mb-6">RECOMMENDED</Badge>
                  <h3 className="text-fluid-3xl md:text-fluid-5xl font-black italic uppercase tracking-tighter leading-none mb-4 md:mb-6">EARN WHILE <br />YOU TRAIN</h3>
                  <p className="text-fluid-sm md:text-fluid-base font-bold uppercase text-muted-foreground/80 leading-tight">
                    The vocational training route where you join a German employer and get paid from Day 1.
                  </p>
                </div>
                <div className="pt-6 md:pt-10">
                  <Briefcase className="w-14 h-14 md:w-20 md:h-20 text-primary" />
                </div>
              </div>
              <div className="lg:col-span-8 p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div>
                  <h4 className="text-fluid-lg md:text-2xl font-black italic uppercase mb-4 md:mb-8 border-b-4 border-primary inline-block">THE MISSION</h4>
                  <ul className="space-y-4 md:space-y-6">
                    {[
                      "Complete programme in Nigeria",
                      "Achieve B1/B2 German proficiency",
                      "Secure Ausbildung contract",
                      "Relocate on Work/Study Visa"
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 md:gap-4">
                        <span className="text-fluid-xl md:text-3xl font-black italic text-primary leading-none">{i+1}</span>
                        <span className="text-fluid-base md:text-xl font-black italic uppercase tracking-tighter leading-none">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-fluid-lg md:text-2xl font-black italic uppercase mb-4 md:mb-8 border-b-4 border-accent inline-block">ELITE PERKS</h4>
                  <ul className="space-y-4 md:space-y-6">
                    {[
                      "PAID TRAINING (NO DEBT)",
                      "ZERO TUITION FEES",
                      "GUARANTEED EMPLOYMENT",
                      "PR PATHWAY ELIGIBILITY"
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 md:gap-4">
                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0" />
                        <span className="text-fluid-base md:text-xl font-black italic uppercase tracking-tighter leading-none">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="university">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-[3px] md:border-[5px] border-foreground bg-background overflow-hidden">
              <div className="lg:col-span-4 bg-foreground text-background p-6 md:p-12 flex flex-col justify-between">
                <div>
                  <Badge className="bg-accent text-background font-black italic rounded-none mb-4 md:mb-6">ACADEMIC</Badge>
                  <h3 className="text-fluid-3xl md:text-fluid-5xl font-black italic uppercase tracking-tighter leading-none mb-4 md:mb-6">THE DEGREE <br />PATHWAY</h3>
                  <p className="text-fluid-sm md:text-fluid-base font-bold uppercase text-muted-foreground/80 leading-tight">
                    The academic route for students seeking a Bachelor of Science from a German University.
                  </p>
                </div>
                <div className="pt-6 md:pt-10">
                  <GraduationCap className="w-14 h-14 md:w-20 md:h-20 text-accent" />
                </div>
              </div>
              <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
                <div className="mb-8 md:mb-12">
                  <h4 className="text-fluid-lg md:text-2xl font-black italic uppercase mb-4 md:mb-8 border-b-4 border-accent inline-block">THE PROCESS</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                    {[
                      "Complete programme in Nigeria",
                      "Obtain APS Certification",
                      "Secure University Admission",
                      "Deploy on Student Visa"
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-secondary border-l-4 border-accent">
                        <span className="text-fluid-xl md:text-3xl font-black italic text-accent leading-none">0{i+1}</span>
                        <span className="text-fluid-base md:text-xl font-black italic uppercase tracking-tighter leading-none">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-accent/10 p-4 md:p-8 border-[2px] border-accent/20 italic font-black text-fluid-lg md:text-xl uppercase tracking-tighter text-accent leading-none">
                  "PRESTIGIOUS ACADEMIC DEGREE + SPECIALIST CAREER OPS"
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
