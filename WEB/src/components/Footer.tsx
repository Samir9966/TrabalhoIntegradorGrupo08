import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contato" className="bg-muted/30 border-t border-border py-12 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">
              Capsubel
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Chip da Beleza em Cápsulas. Suplementos premium para transformar sua pele de dentro para fora.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#tratamentos" className="hover:text-primary transition-colors">Tratamentos</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#cadastro" className="hover:text-primary transition-colors">Cadastro</a></li>
              <li><a href="#contato" className="hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (11) 98765-4321
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contato@capsubel.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                São Paulo, SP
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-foreground">Redes Sociais</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Siga-nos para dicas de beleza e novidades!
            </p>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Capsubel - A Beleza em Cápsula. Todos os direitos reservados.</p>
          <p className="mt-2">CNPJ: 00.000.000/0001-00 | Produtos aprovados pela ANVISA</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
