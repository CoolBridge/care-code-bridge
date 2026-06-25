import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { UVP } from "@/components/sections/UVP"
import { ProgrammeOutcomes } from "@/components/sections/ProgrammeOutcomes"
import { TargetAudience } from "@/components/sections/TargetAudience"
import { Deliverables } from "@/components/sections/Deliverables"
import { ProgrammeStructure } from "@/components/sections/ProgrammeStructure"
import { PathwayOptions } from "@/components/sections/PathwayOptions"
import { IncomePotential } from "@/components/sections/IncomePotential"
import { Pricing } from "@/components/sections/Pricing"
import { ApplicationForm } from "@/components/sections/ApplicationForm"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <UVP />
        <TargetAudience />
        <ProgrammeOutcomes />
        <Deliverables />
        <ProgrammeStructure />
        <PathwayOptions />
        <IncomePotential />
        <Pricing />
        <ApplicationForm />
      </main>
      <Footer />
      <Toaster position="top-center" expand={true} richColors />
    </div>
  )
}

export default App
