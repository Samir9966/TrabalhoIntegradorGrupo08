import { CreditCard, Smartphone, Building2, Barcode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PaymentMethod } from "@/pages/Checkout";

interface PaymentMethodSelectorProps {
  onSelectMethod: (method: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ onSelectMethod }: PaymentMethodSelectorProps) => {
  const methods = [
    {
      id: "pix" as PaymentMethod,
      title: "PIX",
      description: "Aprovação instantânea",
      icon: Smartphone,
      badge: "Mais rápido",
      color: "text-primary"
    },
    {
      id: "credit" as PaymentMethod,
      title: "Cartão de Crédito",
      description: "Parcele em até 12x sem juros",
      icon: CreditCard,
      badge: "Parcelado",
      color: "text-primary"
    },
    {
      id: "debit" as PaymentMethod,
      title: "Cartão de Débito",
      description: "Débito na hora",
      icon: Building2,
      color: "text-primary"
    },
    {
      id: "boleto" as PaymentMethod,
      title: "Boleto Bancário",
      description: "Vencimento em 3 dias úteis",
      icon: Barcode,
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-6">
        Escolha a forma de pagamento que preferir
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <Card
              key={method.id}
              className="relative overflow-hidden cursor-pointer transition-all hover:shadow-elegant hover:border-primary group"
              onClick={() => onSelectMethod(method.id)}
            >
              {method.badge && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
                  {method.badge}
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-primary/10 ${method.color} group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-foreground">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-center text-muted-foreground">
          🔒 Todos os pagamentos são processados de forma segura e criptografada
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
