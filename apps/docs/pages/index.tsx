import { Navbar } from "@/components/landing/navbar";
import { BenefitsSection } from "@/components/landing/sections/benefits";
import { CommunitySection } from "@/components/landing/sections/community";
import { ContactSection } from "@/components/landing/sections/contact";
import { FAQSection } from "@/components/landing/sections/faq";
import { FeaturesSection } from "@/components/landing/sections/features";
import { FooterSection } from "@/components/landing/sections/footer";
import { HeroSection } from "@/components/landing/sections/hero";
import { PricingSection } from "@/components/landing/sections/pricing";
import { ServicesSection } from "@/components/landing/sections/services";
import { SponsorsSection } from "@/components/landing/sections/sponsors";
import { TeamSection } from "@/components/landing/sections/team";
import { TestimonialSection } from "@/components/landing/sections/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <title>AutoForm - Instant forms for your schemas</title>

      <Navbar />
      <HeroSection />
      {/* <SponsorsSection /> */}
      {/* <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection /> */}
      {/* <FAQSection /> */}
      {/* <FooterSection /> */}
    </div>
  );
}
