import Header from "@/components/layout/Header";
import TeamSection from "@/components/sections/Team";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";

const TeamPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <TeamSection />
        <CTA />
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  );
};

export default TeamPage;
