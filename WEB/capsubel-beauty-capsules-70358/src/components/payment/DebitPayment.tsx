import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = "http://localhost:3000";

interface DebitPaymentProps {
  packageData: {
    duration: string;
    price: number;
  };
}

const DebitPayment = ({ packageData }: DebitPaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    numeroCartao: "",
    nomeImpresso: "",
    validade: "",
    cvv: "",
    cpf: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.numeroCartao || !formData.nomeImpresso || !formData.validade || !formData.cvv || !formData.cpf) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/pagamentos/cartao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroCartao: formData.numeroCartao.replace(/\s/g, ""),
          nomeImpresso: formData.nomeImpresso,
          validade: formData.validade,
          cvv: parseInt(formData.cvv),
          cpf: formData.cpf,
          valor: packageData.price,
          tipo: "debito",
          parcelas: 1
        }),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao processar pagamento";
        try {
          const errorData = await response.json();
          errorMessage = errorData.erro || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      toast({
        title: "Pagamento processado!",
        description: "Pagamento aprovado! O valor foi debitado da sua conta.",
      });
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao processar o pagamento. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      toast({
        title: "Erro no pagamento",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">
          Cartão de Débito
        </h3>
        <p className="text-muted-foreground">
          Débito direto na sua conta
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="debitCardNumber">Número do Cartão</Label>
          <Input
            id="debitCardNumber"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            required
            className="mt-2"
            value={formData.numeroCartao}
            onChange={(e) => setFormData({ ...formData, numeroCartao: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="debitCardName">Nome impresso no cartão</Label>
          <Input
            id="debitCardName"
            placeholder="NOME COMPLETO"
            required
            className="mt-2"
            value={formData.nomeImpresso}
            onChange={(e) => setFormData({ ...formData, nomeImpresso: e.target.value })}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="debitExpiry">Validade</Label>
            <Input
              id="debitExpiry"
              placeholder="MM/AA"
              maxLength={5}
              required
              className="mt-2"
              value={formData.validade}
              onChange={(e) => setFormData({ ...formData, validade: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="debitCvv">CVV</Label>
            <Input
              id="debitCvv"
              type="password"
              placeholder="123"
              maxLength={4}
              required
              className="mt-2"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cpf">CPF do titular</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            maxLength={14}
            required
            className="mt-2"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <p className="flex items-start gap-2 text-muted-foreground">
          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
          Débito instantâneo na sua conta
        </p>
        <p className="flex items-start gap-2 text-muted-foreground">
          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
          Aprovação imediata
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
            Processando...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Pagar com Débito
          </>
        )}
      </Button>

      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <p className="text-xs text-center text-muted-foreground">
          🔒 Transação segura e criptografada. O valor será debitado imediatamente da sua conta.
        </p>
      </div>
    </form>
  );
};

export default DebitPayment;
