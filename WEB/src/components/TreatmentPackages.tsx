import { Check, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const TreatmentPackages = () => {
  const navigate = useNavigate();

  const handleBuyNow = (pkg: typeof packages[0]) => {
    navigate("/checkout", { state: pkg });
  };

  const packages = [
    {
      duration: "1 mês",
      price: 97.00,
      installment: 9.74,
      popular: false
    },
    {
      duration: "2 meses",
      price: 157.00,
      installment: 15.76,
      popular: false
    },
    {
      duration: "3 meses",
      price: 187.00,
      installment: 18.78,
      popular: true,
      badge: "Mais Vendido"
    },
    {
      duration: "5 meses",
      price: 277.00,
      installment: 27.81,
      popular: false,
      badge: "Melhor Custo-Benefício"
    }
  ];

  return (
    <section id="tratamentos" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Escolha Seu <span className="text-primary italic">Tratamento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quanto mais tempo de tratamento, melhores os resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`group overflow-hidden transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 border-border bg-card h-full flex flex-col relative ${
                pkg.popular ? 'border-primary border-2' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.badge && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-bold shadow-md z-10">
                  {pkg.badge}
                </div>
              )}

              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    {pkg.duration}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    de tratamento com CapsuBel
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-primary mb-2">
                    R$ {pkg.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ou 12x de <span className="font-semibold text-foreground">R$ {pkg.installment.toFixed(2)}</span>
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Entrega gratuita
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Garantia de 30 dias
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Suporte especializado
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 border-t border-border">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  size="lg"
                  onClick={() => handleBuyNow(pkg)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Comprar Agora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ✓ Pagamento 100% seguro • ✓ Frete grátis para todo Brasil • ✓ Suporte 24/7
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentPackages;
