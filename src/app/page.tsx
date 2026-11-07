import Hero from "@/components/Hero"
import FabricationSection from "@/components/FabricationSection"
import FeaturedProducts from "@/components/FeaturedProducts"
import CTASection from "@/components/CTASection"

/** Short home: product, how we build, references, quote. Families and rooms have their own pages. */
export default function Home() {
  return (
    <>
      <Hero />
      <FabricationSection />
      <FeaturedProducts />
      <CTASection />
    </>
  )
}
