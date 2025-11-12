import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, QrCode, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:3008/api";

interface PixPaymentProps {
  packageData: {
    duration: string;
    price: number;
  };
}

interface PixData {
  id: string;
  codigoPix: string;
  dataExpiracao: string;
  valor: number;
  status: string;
}

const PixPayment = ({ packageData }: PixPaymentProps) => {
  const [pixGenerated, setPixGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const { toast } = useToast();

  const handleGeneratePix = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pagamentos/pix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valor: packageData.price
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao gerar código PIX";
        try {
          const errorData = await response.json();
          errorMessage = errorData.erro || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setPixData({
        id: data.id,
        codigoPix: data.codigoPix,
        dataExpiracao: new Date(data.dataExpiracao).toLocaleString('pt-BR'),
        valor: data.valor,
        status: data.status
      });
      setPixGenerated(true);
      toast({
        title: "Código PIX gerado!",
        description: "Use o QR Code ou copie o código para pagar",
      });
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao gerar o código PIX. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      toast({
        title: "Erro ao gerar PIX",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.codigoPix);
      toast({
        title: "Código copiado!",
        description: "Cole no app do seu banco para pagar",
      });
    }
  };

  if (!pixGenerated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            Pagamento via PIX
          </h3>
          <p className="text-muted-foreground">
            Aprovação instantânea e segura
          </p>
        </div>

        <Card className="p-6 bg-muted/30 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total a pagar</span>
              <span className="text-3xl font-bold text-primary">
                R$ {packageData.price.toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Confirmação instantânea do pagamento
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Código válido por 30 minutos
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Pedido processado automaticamente
          </p>
        </div>

        <Button
          onClick={handleGeneratePix}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <QrCode className="mr-2 h-5 w-5" />
              Gerar Código PIX
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Clock className="h-8 w-8 text-primary animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          Aguardando Pagamento
        </h3>
        <p className="text-muted-foreground">
          Escaneie o QR Code ou copie o código abaixo
        </p>
      </div>

      {/* QR Code simulado */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-elegant">
          <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <QrCode className="h-32 w-32 text-primary" />
          </div>
        </div>
      </div>

      <Card className="p-4 bg-muted/30">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-xl font-bold text-primary">
              R$ {packageData.price.toFixed(2)}
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Código PIX Copia e Cola:</p>
            <div className="flex gap-2">
              <code className="flex-1 p-3 bg-background border border-border rounded text-xs break-all font-mono">
                {pixData?.codigoPix}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-center text-foreground">
          ⏱️ Este código expira em <span className="font-bold">30 minutos</span>
        </p>
      </div>

      <div className="space-y-2 text-xs text-muted-foreground">
        <p>1. Abra o app do seu banco</p>
        <p>2. Escolha pagar com PIX</p>
        <p>3. Escaneie o QR Code ou cole o código</p>
        <p>4. Confirme o pagamento</p>
      </div>
    </div>
  );
};

export default PixPayment;
