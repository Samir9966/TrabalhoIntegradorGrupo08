import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Calendar, Gift, Mail, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://grupo08projeto20252.escolatecnicaadelia.info/api";

const SignupForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthdate: ""
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.birthdate) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Aceite os termos",
        description: "Você precisa aceitar os Termos de Uso e Política de Privacidade.",
        variant: "destructive"
      });
      return;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mapear campos do formulário para o formato esperado pelo backend
      const userData = {
        nome: formData.name,
        telefone: formData.phone,
        email: formData.email,
        dataNascimento: formData.birthdate
      };

      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        let errorMessage = "Erro ao cadastrar usuário";
        try {
          const errorData = await response.json();
          errorMessage = errorData.erro || errorMessage;
        } catch {
          errorMessage = `Erro ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      await response.json();
      
      toast({
        title: "Cadastro realizado! 🎉",
        description: "Bem-vinda à família Capsubel! Em breve entraremos em contato.",
      });
      
      setFormData({ name: "", email: "", phone: "", birthdate: "" });
      setAcceptedTerms(false);
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao realizar o cadastro. Tente novamente.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      }
      
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="cadastro" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-sm border-border animate-fade-in">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
              Cadastre-se e Ganhe <span className="text-primary italic">15% OFF</span>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Receba ofertas exclusivas, dicas de beleza e novidades em primeira mão!
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold">
                  Telefone / WhatsApp
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate" className="text-base font-semibold">
                  Data de Nascimento
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="pl-10 h-12"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enviaremos um presente especial no seu aniversário! 🎂
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-md bg-muted/30 border border-border">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  Eu aceito os{" "}
                  <Link to="/suporte" className="text-primary hover:underline font-medium">
                    Termos de Uso e Política de Privacidade
                  </Link>
                  {" "}e concordo em receber comunicações da Capsubel.
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar e Ganhar Desconto"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignupForm;
