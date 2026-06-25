import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send, Zap } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "IDENTIFY YOURSELF (MIN 2 CHARS)." }),
  email: z.string().email({ message: "INVALID INTEL (EMAIL ADDRESS)." }),
  phone: z.string().min(10, { message: "SECURE LINE REQUIRED (PHONE)." }),
  package: z.string().min(1, { message: "SELECT YOUR MISSION TIER." }),
  pathway: z.string().min(1, { message: "SELECT YOUR DEPLOYMENT PATH." }),
  message: z.string().optional(),
})

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate mission transmission
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("INTEL RECEIVED. STANDBY FOR COMMAND CONTACT.")
      form.reset()
    }, 2000)
  }

  return (
    <section id="apply" className="py-section bg-secondary border-t-[3px] md:border-t-[5px] border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-background border-[4px] md:border-[8px] border-foreground overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-[10px_10px_0px_0px_var(--color-primary)] md:shadow-[20px_20px_0px_0px_var(--color-primary)]">
          {/* Info Side */}
          <div className="p-6 md:p-12 lg:p-20 bg-foreground text-background flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
              <Zap className="w-32 h-32 md:w-64 md:h-64 text-primary" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-fluid-4xl md:text-fluid-7xl font-black italic uppercase tracking-tighter leading-[0.85] mb-4 md:mb-8">
                ENLIST <br />FOR THE <br /><span className="text-primary">MISSION</span>
              </h2>
              <p className="text-fluid-lg md:text-xl font-bold uppercase tracking-tight text-background/70 mb-6 md:mb-12 leading-tight border-l-4 border-primary pl-4 md:pl-6">
                Transmission of this form initiates your recruitment process. Spots per cohort are strictly limited for maximum mission success.
              </p>

              <div className="space-y-4 md:space-y-8">
                {[
                  "ZERO ENLISTMENT FEES",
                  "ELITE MISSION BRIEFING",
                  "COHORT SLOTS: 20 MAX"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <div className="w-5 h-5 md:w-6 md:h-6 bg-primary skew-x-[-12deg] flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-background" />
                    </div>
                    <span className="text-fluid-lg md:text-2xl font-black italic uppercase tracking-tighter">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 md:mt-20 pt-6 md:pt-10 border-t border-background/20 relative z-10">
              <p className="text-fluid-xs font-black tracking-widest text-primary mb-2 uppercase">COMMAND LINE</p>
              <p className="text-fluid-2xl md:text-4xl font-black italic tracking-tighter text-background leading-none">+234 (0) 800 123 4567</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-6 md:p-12 lg:p-16">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">OPERATOR NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="FULL NAME" {...field} className="h-14 md:h-16 bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 focus-visible:ring-primary focus-visible:ring-4 transition-all" />
                      </FormControl>
                      <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">SECURE EMAIL</FormLabel>
                        <FormControl>
                          <Input placeholder="EMAIL" {...field} className="h-14 md:h-16 bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 focus-visible:ring-primary focus-visible:ring-4 transition-all" />
                        </FormControl>
                        <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">SECURE LINE</FormLabel>
                        <FormControl>
                          <Input placeholder="PHONE" {...field} className="h-14 md:h-16 bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 focus-visible:ring-primary focus-visible:ring-4 transition-all" />
                        </FormControl>
                        <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <FormField
                    control={form.control}
                    name="package"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">MISSION TIER</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 md:h-16 bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 focus:ring-primary focus:ring-4 transition-all">
                              <SelectValue placeholder="SELECT TIER" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-foreground text-background border-none rounded-none">
                            <SelectItem value="standard" className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter py-3 md:py-4 hover:bg-primary hover:text-background focus:bg-primary focus:text-background transition-all">STANDARD FORCE</SelectItem>
                            <SelectItem value="premium" className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter py-3 md:py-4 hover:bg-primary hover:text-background focus:bg-primary focus:text-background transition-all">PREMIUM ELITE</SelectItem>
                            <SelectItem value="executive" className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter py-3 md:py-4 hover:bg-primary hover:text-background focus:bg-primary focus:text-background transition-all">EXECUTIVE COMMAND</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pathway"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">DEPLOYMENT PATH</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 md:h-16 bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 focus:ring-primary focus:ring-4 transition-all">
                              <SelectValue placeholder="SELECT PATH" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-foreground text-background border-none rounded-none">
                            <SelectItem value="ausbildung" className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter py-3 md:py-4 hover:bg-primary hover:text-background focus:bg-primary focus:text-background transition-all">NURSING AUSBILDUNG</SelectItem>
                            <SelectItem value="university" className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter py-3 md:py-4 hover:bg-primary hover:text-background focus:bg-primary focus:text-background transition-all">NURSING UNIVERSITY</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-fluid-base md:text-lg font-black italic uppercase tracking-tighter">MISSION INTEL (OPTIONAL)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="ADDITIONAL PARAMETERS"
                          className="bg-secondary border-none rounded-none text-fluid-base md:text-xl font-bold uppercase tracking-tight px-4 md:px-6 py-3 md:py-4 min-h-[120px] md:min-h-[150px] focus-visible:ring-primary focus-visible:ring-4 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-primary font-black uppercase italic text-fluid-xs tracking-widest" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-16 md:h-24 text-fluid-xl md:text-3xl font-black italic uppercase rounded-none bg-primary text-background hover:bg-primary/90 hover:skew-x-[-6deg] transition-all" disabled={isSubmitting}>
                  {isSubmitting ? "TRANSMITTING..." : "EXECUTE ENLISTMENT"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
