import { Button } from "./ui/button";
import heroImage from "@/assets/hero-capsubel-products.jpg";

const Hero = () => {
  const scrollToTreatments = () => {
    document.getElementById('tratamentos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${heroImage})`,
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="text-left space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
              CapsuBel
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-xl drop-shadow-md">
              O Chip da Beleza em Cápsulas - Tratamento completo para cabelos, pele e unhas
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-foreground hover:bg-foreground/90 text-background shadow-lg text-base px-12 py-7 rounded-none font-semibold uppercase tracking-wide"
                onClick={scrollToTreatments}
              >
                Ver Planos de Tratamento
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
