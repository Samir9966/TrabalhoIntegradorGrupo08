import { useState } from "react";
import { Menu, X, Moon, Sun, HeadphonesIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-capsubel.jpg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src={logoImage} 
              alt="Capsubel Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Início
            </button>

            <button
              onClick={() => scrollToSection('tratamentos')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Tratamentos
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Depoimentos
            </button>

            <button
              onClick={() => scrollToSection('cadastro')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Cadastro
            </button>

            <Button
              variant="outline"
              onClick={() => navigate('/suporte')}
              className="gap-2"
            >
              <HeadphonesIcon className="h-4 w-4" />
              Suporte
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-primary/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Início
              </button>

              <button
                onClick={() => scrollToSection('tratamentos')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Tratamentos
              </button>

              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Depoimentos
              </button>

              <button
                onClick={() => scrollToSection('cadastro')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Cadastro
              </button>

              <Button
                onClick={() => navigate('/suporte')}
                variant="outline"
                className="w-full justify-start"
              >
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                Suporte
              </Button>

              <Button
                onClick={toggleTheme}
                variant="outline"
                className="w-full justify-start"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Modo Escuro
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
