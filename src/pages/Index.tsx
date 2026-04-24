import { Layout } from "@/components/site/Layout";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Forms } from "@/components/site/Forms";
import { FAQ } from "@/components/site/FAQ";
import { CTABand } from "@/components/site/CTABand";
import { ContactInfo } from "@/components/site/ContactInfo";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Forms />
      <Gallery />
      <Testimonials />
      <CTABand />
      <FAQ />
      <ContactInfo />
    </Layout>
  );
};

export default Index;
