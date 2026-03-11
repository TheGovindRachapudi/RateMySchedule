import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import PageWrapper from "../components/layout/PageWrapper";
import FeatureBento from "../components/landing/FeatureBento";
import FinalCTA from "../components/landing/FinalCTA";
import HeroSection from "../components/landing/HeroSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import ProblemSection from "../components/landing/ProblemSection";
import SocialProofBar from "../components/landing/SocialProofBar";

export default function LandingPage() {
  return (
    <PageWrapper className="landing-page">
      <Navbar />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <HowItWorksSection />
      <FeatureBento />
      <FinalCTA />
      <Footer />
    </PageWrapper>
  );
}