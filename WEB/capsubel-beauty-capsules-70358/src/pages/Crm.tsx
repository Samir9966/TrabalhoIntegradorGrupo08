import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Users, ShoppingCart, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const API_URL = "http://localhost:3000";

interface CrmStats {
  estatisticas: {
    totalUsuarios: number;
    totalCompras: number;
    totalAprovados: number;
    valorTotalGeral: number;
    valorTotalCartao: number;
    valorTotalPix: number;
    valorTotalBoleto: number;
    porMetodo: {
      cartao: {
        total: number;
        aprovados: number;
        valorTotal: number;
      };
      pix: {
        total: number;
        pagos: number;
        valorTotal: number;
      };
      boleto: {
        total: number;
        pagos: number;
        valorTotal: number;
      };
    };
  };
  usuarios: Array<{
    id: string;
    nome: string;
    telefone: string;
    email: string;
    dataNascimento: string;
  }>;
  compras: Array<{
    id: string;
    tipo: string;
    metodo: string;
    valor: number;
    status: string;
    cpf: string | null;
    nome: string | null;
    parcelas: number | null;
    valorParcela: number | null;
  }>;
}

const Crm = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, error, refetch } = useQuery<CrmStats>({
    queryKey: ["crm-stats", refreshKey],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/crm/stats`);
      if (!response.ok) {
        throw new Error("Erro ao carregar dados do CRM");
      }
      return response.json();
    },
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      aprovado: { variant: "default", label: "Aprovado" },
      pago: { variant: "default", label: "Pago" },
      pendente: { variant: "secondary", label: "Pendente" },
      recusado: { variant: "destructive", label: "Recusado" },
      expirado: { variant: "destructive", label: "Expirado" },
      vencido: { variant: "destructive", label: "Vencido" },
    };

    const statusInfo = statusMap[status] || { variant: "outline" as const, label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getMetodoBadge = (metodo: string) => {
    const metodoMap: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
      credito: { variant: "default", label: "Crédito" },
      debito: { variant: "secondary", label: "Débito" },
      pix: { variant: "outline", label: "PIX" },
      boleto: { variant: "outline", label: "Boleto" },
    };

    const metodoInfo = metodoMap[metodo] || { variant: "outline" as const, label: metodo };
    return <Badge variant={metodoInfo.variant}>{metodoInfo.label}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Carregando dados do CRM...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle className="text-destructive">Erro ao carregar dados</CardTitle>
                <CardDescription>
                  Não foi possível conectar ao servidor. Verifique se a API está rodando.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => refetch()} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tentar novamente
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const stats = data?.estatisticas;
  const usuarios = data?.usuarios || [];
  const compras = data?.compras || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Painel CRM</h1>
              <p className="text-muted-foreground">Gestão de clientes e vendas</p>
            </div>
          </div>
          <Button onClick={() => setRefreshKey((k) => k + 1)}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsuarios || 0}</div>
              <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCompras || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.totalAprovados || 0} aprovadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? formatCurrency(stats.valorTotalGeral) : "R$ 0,00"}
              </div>
              <p className="text-xs text-muted-foreground">Receita total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats && stats.totalCompras > 0
                  ? `${Math.round((stats.totalAprovados / stats.totalCompras) * 100)}%`
                  : "0%"}
              </div>
              <p className="text-xs text-muted-foreground">Compras aprovadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas por Método de Pagamento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cartão</CardTitle>
              <CardDescription>Pagamentos por cartão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-semibold">{stats?.porMetodo.cartao.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Aprovados:</span>
                  <span className="font-semibold">{stats?.porMetodo.cartao.aprovados || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="font-semibold">
                    {stats ? formatCurrency(stats.porMetodo.cartao.valorTotal) : "R$ 0,00"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">PIX</CardTitle>
              <CardDescription>Pagamentos via PIX</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-semibold">{stats?.porMetodo.pix.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pagos:</span>
                  <span className="font-semibold">{stats?.porMetodo.pix.pagos || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="font-semibold">
                    {stats ? formatCurrency(stats.porMetodo.pix.valorTotal) : "R$ 0,00"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Boleto</CardTitle>
              <CardDescription>Pagamentos via boleto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-semibold">{stats?.porMetodo.boleto.total || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pagos:</span>
                  <span className="font-semibold">{stats?.porMetodo.boleto.pagos || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="font-semibold">
                    {stats ? formatCurrency(stats.porMetodo.boleto.valorTotal) : "R$ 0,00"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs com Usuários e Compras */}
        <Tabs defaultValue="usuarios" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="usuarios">Usuários Cadastrados ({usuarios.length})</TabsTrigger>
            <TabsTrigger value="compras">Compras Realizadas ({compras.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
                <CardDescription>Todos os clientes cadastrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {usuarios.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum usuário cadastrado ainda.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Telefone</TableHead>
                          <TableHead>Data de Nascimento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usuarios.map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell className="font-medium">{usuario.nome}</TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>{usuario.telefone}</TableCell>
                            <TableCell>{usuario.dataNascimento}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compras" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Compras</CardTitle>
                <CardDescription>Todas as compras realizadas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {compras.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma compra realizada ainda.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Método</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Nome/CPF</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Parcelas</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {compras.map((compra) => (
                          <TableRow key={compra.id}>
                            <TableCell>{getMetodoBadge(compra.metodo)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{compra.tipo}</Badge>
                            </TableCell>
                            <TableCell>
                              {compra.nome ? (
                                <div>
                                  <div className="font-medium">{compra.nome}</div>
                                  {compra.cpf && (
                                    <div className="text-xs text-muted-foreground">{compra.cpf}</div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(compra.valor)}
                            </TableCell>
                            <TableCell>
                              {compra.parcelas ? (
                                <div>
                                  <div>{compra.parcelas}x</div>
                                  {compra.valorParcela && (
                                    <div className="text-xs text-muted-foreground">
                                      {formatCurrency(compra.valorParcela)}/mês
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>{getStatusBadge(compra.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Crm;

