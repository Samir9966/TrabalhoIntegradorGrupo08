import { Shield } from "lucide-react";
import result1 from "@/assets/result-1.jpg";
import result2 from "@/assets/result-2.jpg";
import result3 from "@/assets/result-3.jpg";
import result4 from "@/assets/result-4.jpg";

const SocialProof = () => {
  const customerPhotos = [
    {
      id: 1,
      src: result1,
      alt: "Transformação capilar com CapsuBel - Resultados em 4 meses",
      className: "aspect-square object-cover"
    },
    {
      id: 2,
      src: result2,
      alt: "Crescimento capilar e fortalecimento das unhas com CapsuBel",
      className: "aspect-square object-cover"
    },
    {
      id: 3,
      src: result3,
      alt: "Tratamento capilar antes e depois com CapsuBel",
      className: "aspect-square object-cover"
    },
    {
      id: 4,
      src: result4,
      alt: "Resultados reais com tratamento de 4 meses CapsuBel",
      className: "aspect-square object-cover"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Resultados <span className="text-primary italic">Reais</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja a transformação de quem já usa CapsuBel
          </p>
        </div>

        {/* Customer Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {customerPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={photo.className}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* 30-Day Guarantee */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border-2 border-primary/20 rounded-lg p-8 text-center shadow-elegant">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Garantia de 30 Dias
            </h3>
            <p className="text-lg text-muted-foreground">
              Não ficou satisfeita? Devolvemos seu dinheiro, sem perguntas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
