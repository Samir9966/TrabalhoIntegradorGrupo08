import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      age: 32,
      text: "Uso o CapsuBel há 3 meses e a diferença na minha pele é incrível! Mais firme, menos linhas de expressão. Recomendo demais!",
      rating: 5,
      product: "Tratamento 3 meses"
    },
    {
      name: "Ana Paula",
      age: 28,
      text: "O CapsuBel transformou minha pele! Ficou muito mais hidratada e luminosa. Não consigo mais ficar sem!",
      rating: 5,
      product: "Tratamento 2 meses"
    },
    {
      name: "Juliana Costa",
      age: 35,
      text: "Meu cabelo estava caindo muito. Comecei o tratamento com CapsuBel e em 2 meses já vi resultados! Cabelo mais forte e crescendo.",
      rating: 5,
      product: "Tratamento 2 meses"
    },
    {
      name: "Carla Mendes",
      age: 40,
      text: "O CapsuBel é sensacional! Minha pele está muito mais hidratada e as linhas finas diminuíram bastante.",
      rating: 5,
      product: "Tratamento 5 meses"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            O Que Nossas <span className="text-primary italic">Clientes</span> Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos reais de mulheres que transformaram sua beleza com Capsubel
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="animate-fade-in-up hover:shadow-sm transition-all duration-300 border-border bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.age} anos</p>
                  <p className="text-xs text-primary font-semibold mt-1">{testimonial.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground">
            Junte-se a mais de <span className="text-primary font-bold">5.000 mulheres</span> que já transformaram sua beleza
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
