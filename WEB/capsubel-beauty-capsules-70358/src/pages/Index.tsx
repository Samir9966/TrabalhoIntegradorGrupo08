import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import TreatmentPackages from "@/components/TreatmentPackages";
import Testimonials from "@/components/Testimonials";
import SignupForm from "@/components/SignupForm";
import Technologies from "@/components/Technologies";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <SocialProof />
      <TreatmentPackages />
      <Testimonials />
      <Technologies />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default Index;
