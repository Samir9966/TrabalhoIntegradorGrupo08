import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import PixPayment from "@/components/payment/PixPayment";
import DebitPayment from "@/components/payment/DebitPayment";
import CreditPayment from "@/components/payment/CreditPayment";
import BoletoPayment from "@/components/payment/BoletoPayment";

export type PaymentMethod = "pix" | "debit" | "credit" | "boleto" | null;

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  if (!packageData) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            Nenhum pacote selecionado
          </h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "pix":
        return <PixPayment packageData={packageData} />;
      case "debit":
        return <DebitPayment packageData={packageData} />;
      case "credit":
        return <CreditPayment packageData={packageData} />;
      case "boleto":
        return <BoletoPayment packageData={packageData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Finalizar <span className="text-primary italic">Compra</span>
            </h1>
            <p className="text-muted-foreground">
              Complete seu pagamento de forma segura
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pacote</p>
                      <p className="font-semibold text-foreground">
                        {packageData.duration} de tratamento
                      </p>
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">
                          R$ {packageData.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="font-medium text-primary">Grátis</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="font-bold text-2xl text-primary">
                          R$ {packageData.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <p className="flex items-center gap-2 text-muted-foreground">
                        ✓ Entrega gratuita
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        ✓ Garantia de 30 dias
                      </p>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        ✓ Pagamento 100% seguro
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Método de pagamento */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="border-b border-border">
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {!selectedMethod ? (
                    <PaymentMethodSelector onSelectMethod={setSelectedMethod} />
                  ) : (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedMethod(null)}
                        className="mb-6"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Trocar método de pagamento
                      </Button>
                      {renderPaymentForm()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
