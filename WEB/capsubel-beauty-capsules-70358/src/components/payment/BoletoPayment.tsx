import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Barcode, Download, Copy, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:3008/api";

interface BoletoPaymentProps {
  packageData: {
    duration: string;
    price: number;
  };
}

interface BoletoData {
  id: string;
  linhaDigitavel: string;
  dataVencimento: string;
  valor: number;
  status: string;
}

const BoletoPayment = ({ packageData }: BoletoPaymentProps) => {
  const [boletoGenerated, setBoletoGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boletoData, setBoletoData] = useState<BoletoData | null>(null);
  const [formData, setFormData] = useState({
    cpf: "",
    nomeCompleto: "",
    email: ""
  });
  const { toast } = useToast();

  const handleGenerateBoleto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cpf || !formData.nomeCompleto || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pagamentos/boleto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: formData.cpf,
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          valor: packageData.price
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao gerar boleto";
        try {
          const errorData = await response.json();
          errorMessage = errorData.erro || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setBoletoData({
        id: data.id,
        linhaDigitavel: data.linhaDigitavel,
        dataVencimento: new Date(data.dataVencimento).toLocaleDateString('pt-BR'),
        valor: data.valor,
        status: data.status
      });
      setBoletoGenerated(true);
      toast({
        title: "Boleto gerado com sucesso!",
        description: "Você pode copiar o código ou fazer o download",
      });
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao gerar o boleto. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      toast({
        title: "Erro ao gerar boleto",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (boletoData) {
      navigator.clipboard.writeText(boletoData.linhaDigitavel);
      toast({
        title: "Código copiado!",
        description: "Cole no app do seu banco ou internet banking",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "O boleto será salvo em seus downloads",
    });
  };

  if (!boletoGenerated) {
    return (
      <form onSubmit={handleGenerateBoleto} className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Barcode className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            Boleto Bancário
          </h3>
          <p className="text-muted-foreground">
            Pague em qualquer banco ou app
          </p>
        </div>

        <Card className="p-4 bg-muted/30 border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total a pagar</span>
            <span className="text-2xl font-bold text-primary">
              R$ {packageData.price.toFixed(2)}
            </span>
          </div>
        </Card>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Importante sobre o boleto:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Vencimento em 3 dias úteis</li>
              <li>• Pagamento pode levar até 2 dias úteis para confirmar</li>
              <li>• Após o vencimento, gere um novo boleto</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="cpfBoleto">CPF</Label>
            <Input
              id="cpfBoleto"
              placeholder="000.000.000-00"
              maxLength={14}
              required
              className="mt-2"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="nameBoleto">Nome completo</Label>
            <Input
              id="nameBoleto"
              placeholder="Seu nome completo"
              required
              className="mt-2"
              value={formData.nomeCompleto}
              onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="emailBoleto">E-mail</Label>
            <Input
              id="emailBoleto"
              type="email"
              placeholder="seu@email.com"
              required
              className="mt-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enviaremos o boleto para este e-mail
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Pague em qualquer banco ou lotérica
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Boleto enviado por e-mail
          </p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            Sem taxas adicionais
          </p>
        </div>

        <Button
          type="submit"
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
              <Barcode className="mr-2 h-5 w-5" />
              Gerar Boleto
            </>
          )}
        </Button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          Boleto Gerado!
        </h3>
        <p className="text-muted-foreground">
          Pague até a data de vencimento
        </p>
      </div>

      <Card className="p-6 bg-muted/30 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <span className="text-muted-foreground">Valor</span>
            <span className="text-2xl font-bold text-primary">
              R$ {packageData.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Vencimento</span>
            <span className="font-semibold text-foreground">
              {boletoData?.dataVencimento}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-background">
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            Linha digitável do boleto:
          </p>
          <div className="flex gap-2">
            <code className="flex-1 p-3 bg-muted border border-border rounded text-xs break-all font-mono text-foreground">
              {boletoData?.linhaDigitavel}
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
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={handleCopyCode}
          className="w-full"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar Código
        </Button>
        <Button
          onClick={handleDownload}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <Download className="mr-2 h-4 w-4" />
          Baixar PDF
        </Button>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <p className="text-sm text-center text-foreground">
          ⚠️ Atenção: O boleto vence em <span className="font-bold">3 dias úteis</span>
        </p>
      </div>

      <div className="space-y-2 text-xs text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <p className="font-medium text-foreground">Como pagar:</p>
        <p>1. Copie o código de barras acima</p>
        <p>2. Acesse o app ou site do seu banco</p>
        <p>3. Escolha "Pagar boleto" ou "Pagamentos"</p>
        <p>4. Cole o código e confirme</p>
        <p className="pt-2 text-muted-foreground">
          💌 O boleto também foi enviado para seu e-mail
        </p>
      </div>
    </div>
  );
};

export default BoletoPayment;
