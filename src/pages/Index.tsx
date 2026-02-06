import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";
import Testimonials from "@/components/sections/Testimonials";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Approach />
        <Testimonials />
        <Events />
        <Gallery />
        <CTA />
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
