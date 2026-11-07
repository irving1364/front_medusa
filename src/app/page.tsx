import Hero from "@/components/Hero"
import Marquee from "@/components/Marquee"
import CategoryGrid from "@/components/CategoryGrid"
import FeaturedProducts from "@/components/FeaturedProducts"
import WhyKarven from "@/components/WhyKarven"
import ProcessSection from "@/components/ProcessSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import CTASection from "@/components/CTASection"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyKarven />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
