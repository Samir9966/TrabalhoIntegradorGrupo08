import { useState } from "react";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const faqItems = [
    {
      question: "Como faço meu pedido?",
      answer: "Para realizar seu pedido, navegue até a seção 'Tratamentos', escolha o plano ideal para você e preencha o formulário de cadastro com seus dados. Nossa equipe entrará em contato para confirmar o pedido e o pagamento."
    },
    {
      question: "Quais são as formas de pagamento?",
      answer: "Os pedidos realizados no site só são confirmados após a aprovação do pagamento. Aceitamos diversas formas de pagamento, incluindo cartão de crédito, PIX e boleto bancário. Os preços e condições podem ser alterados sem aviso prévio."
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo de entrega começa a contar após a confirmação do pagamento e pode variar entre 7 a 15 dias úteis, conforme a localidade e o serviço de transporte escolhido. Você receberá um código de rastreamento após o envio."
    },
    {
      question: "Posso trocar ou devolver o produto?",
      answer: "Sim! O cliente pode solicitar troca ou devolução dentro de 7 dias após o recebimento, conforme o Código de Defesa do Consumidor. Entre em contato conosco pelo e-mail contato@capsubel.com.br para iniciar o processo."
    },
    {
      question: "Os produtos têm registro na ANVISA?",
      answer: "Todos os nossos produtos seguem as normas da ANVISA e contêm ingredientes naturais de alta qualidade. As descrições, composição e benefícios seguem dados fornecidos pelos fabricantes certificados."
    },
    {
      question: "Como uso as cápsulas CapsuBel?",
      answer: "Recomendamos tomar 2 cápsulas por dia, preferencialmente junto com as refeições. Consulte a embalagem para instruções detalhadas. Para melhores resultados, mantenha o uso contínuo por pelo menos 3 meses."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Os primeiros resultados podem ser percebidos entre 30 a 60 dias de uso contínuo. Para resultados mais evidentes e duradouros, recomendamos o tratamento de 3 a 5 meses."
    },
    {
      question: "CapsuBel tem contraindicações?",
      answer: "Gestantes, lactantes e pessoas com alguma condição médica específica devem consultar um médico antes de usar. Nossos produtos são naturais e seguros para a maioria das pessoas."
    },
    {
      question: "Como meus dados são protegidos?",
      answer: "A Capsubel adota rigorosas medidas de segurança para proteger seus dados contra acessos não autorizados. Não vendemos nem compartilhamos suas informações pessoais com terceiros, exceto quando necessário para processamento de pagamentos e entregas."
    },
    {
      question: "Posso cancelar minha compra?",
      answer: "Sim. Se o pedido ainda não foi enviado, você pode solicitar o cancelamento entrando em contato conosco. Caso já tenha sido enviado, você pode devolver o produto em até 7 dias após o recebimento."
    },
    {
      question: "Vocês entregam em todo o Brasil?",
      answer: "Sim! Realizamos entregas para todo o território nacional. O prazo pode variar conforme sua localização."
    },
    {
      question: "Como acompanho meu pedido?",
      answer: "Após a confirmação do envio, você receberá um código de rastreamento por e-mail para acompanhar sua entrega em tempo real."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Site
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Central de Suporte Capsubel
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para ajudar! Encontre respostas rápidas ou entre em contato conosco.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">contato@capsubel.com.br</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Horário</h3>
                <p className="text-sm text-muted-foreground">Seg-Sex: 9h-18h</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Endereço</h3>
                <p className="text-sm text-muted-foreground">São Paulo/SP</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="faq" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
              <TabsTrigger value="contact">Fale Conosco</TabsTrigger>
              <TabsTrigger value="terms">Termos e Privacidade</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Perguntas Frequentes
                  </CardTitle>
                  <CardDescription>
                    Respostas para as dúvidas mais comuns sobre nossos produtos e serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Não encontrou a resposta? Entre em contato conosco diretamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nome</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Assunto</Label>
                      <Input
                        id="contact-subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Mensagem</Label>
                      <Textarea
                        id="contact-message"
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms Tab */}
            <TabsContent value="terms">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>🛡️ Política de Privacidade</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="space-y-4 text-muted-foreground">
                      <div>
                        <p className="font-semibold text-foreground">Razão Social:</p>
                        <p>Capsubel Suplementos e Cosméticos Naturais LTDA</p>
                        <p>CNPJ: 12.345.678/0001-90</p>
                        <p>Endereço: Rua das Flores, 123 – Jardim Bela Vista – São Paulo/SP – CEP 01000-000</p>
                        <p>E-mail: contato@capsubel.com.br</p>
                      </div>

                      <p>
                        A Capsubel valoriza a privacidade e a segurança das informações de seus clientes. 
                        Esta Política de Privacidade explica como coletamos, usamos e protegemos seus dados 
                        pessoais ao utilizar nosso site e serviços.
                      </p>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">1. Coleta de Informações</h3>
                        <p>
                          Coletamos dados pessoais fornecidos voluntariamente pelo usuário, como nome, CPF, 
                          endereço, telefone e e-mail, durante o cadastro ou compra. Também utilizamos cookies 
                          para melhorar a experiência de navegação e personalizar ofertas.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">2. Uso das Informações</h3>
                        <p>As informações são utilizadas para:</p>
                        <ul className="list-disc pl-6">
                          <li>Processar pedidos e pagamentos</li>
                          <li>Enviar atualizações sobre o status da compra</li>
                          <li>Oferecer promoções e novidades</li>
                          <li>Cumprir obrigações legais e fiscais</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">3. Compartilhamento de Dados</h3>
                        <p>
                          A Capsubel não vende nem compartilha dados pessoais com terceiros, exceto quando 
                          necessário para processamento de pagamentos, entregas e obrigações legais.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">4. Segurança</h3>
                        <p>
                          Adotamos medidas de segurança para proteger seus dados contra acessos não autorizados, 
                          uso indevido ou divulgação.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">5. Direitos do Usuário</h3>
                        <p>
                          O cliente pode solicitar acesso, correção ou exclusão de seus dados pessoais a qualquer 
                          momento, enviando um e-mail para contato@capsubel.com.br.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">6. Alterações nesta Política</h3>
                        <p>
                          Podemos atualizar esta Política de Privacidade periodicamente. As mudanças serão 
                          publicadas nesta página com a data da última atualização.
                        </p>
                      </div>

                      <p className="text-sm italic">📅 Última atualização: 17 de outubro de 2025</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>⚖️ Termos de Uso</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="space-y-4 text-muted-foreground">
                      <p>Ao acessar o site da Capsubel, o usuário concorda com os termos abaixo:</p>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">1. Uso do Site</h3>
                        <p>
                          O conteúdo do site é destinado apenas para uso pessoal. É proibida a reprodução, 
                          distribuição ou modificação de qualquer material sem autorização.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">2. Produtos</h3>
                        <p>
                          As descrições e imagens dos produtos são meramente ilustrativas. As informações sobre 
                          composição, benefícios e modo de uso seguem dados fornecidos pelos fabricantes.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">3. Compras e Pagamentos</h3>
                        <p>
                          Os pedidos realizados no site só são confirmados após a aprovação do pagamento. 
                          Os preços e condições de venda podem ser alterados sem aviso prévio.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">4. Entregas</h3>
                        <p>
                          O prazo de entrega começa a contar após a confirmação do pagamento e pode variar 
                          conforme a localidade e o serviço de transporte escolhido.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">5. Trocas e Devoluções</h3>
                        <p>
                          O cliente pode solicitar troca ou devolução dentro de 7 dias após o recebimento, 
                          conforme o Código de Defesa do Consumidor. Basta entrar em contato pelo e-mail 
                          contato@capsubel.com.br.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground">6. Responsabilidades</h3>
                        <p>
                          A Capsubel não se responsabiliza por eventuais indisponibilidades temporárias do 
                          site ou por erros decorrentes de problemas técnicos de terceiros.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Support;
