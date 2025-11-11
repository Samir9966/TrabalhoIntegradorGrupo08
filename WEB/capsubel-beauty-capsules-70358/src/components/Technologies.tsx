import { Shield, Award, Sparkles, HeartPulse, Leaf, FlaskConical } from "lucide-react";

const Technologies = () => {
  const technologies = [
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Produtos aprovados pela ANVISA"
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Matéria-prima importada"
    },
    {
      icon: Sparkles,
      title: "Resultados Visíveis",
      description: "Em até 30 dias de uso"
    },
    {
      icon: HeartPulse,
      title: "Bem-Estar",
      description: "Beleza de dentro para fora"
    },
    {
      icon: Leaf,
      title: "Sustentável",
      description: "Embalagens recicláveis"
    },
    {
      icon: FlaskConical,
      title: "Tecnologia",
      description: "Fórmulas cientificamente testadas"
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Por Que Escolher a <span className="text-primary italic">Capsubel</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologia, qualidade e compromisso com sua beleza
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group p-8 bg-card border border-border rounded-lg hover:shadow-sm transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <tech.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{tech.title}</h3>
              <p className="text-muted-foreground text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
