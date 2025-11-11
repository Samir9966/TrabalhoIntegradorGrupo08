import { app } from "../server";
import {
  getSharedUserService,
  getSharedCartaoService,
  getSharedPixService,
  getSharedBoletoService,
} from "../service/sharedServices";

export function CrmController() {
  const userService = getSharedUserService();
  const cartaoService = getSharedCartaoService();
  const pixService = getSharedPixService();
  const boletoService = getSharedBoletoService();

  // Endpoint para estatísticas do CRM
  app.get("/crm/stats", (req, res) => {
    try {
      const usuarios = userService.listarUsuarios();
      const pagamentosCartao = cartaoService.listarPagamentosCartao();
      const pagamentosPix = pixService.listarPagamentosPix();
      const pagamentosBoleto = boletoService.listarPagamentosBoleto();

      // Calcular totais
      const totalUsuarios = usuarios.length;
      const totalCompras = pagamentosCartao.length + pagamentosPix.length + pagamentosBoleto.length;

      // Calcular valores totais
      const valorTotalCartao = pagamentosCartao.reduce((sum, p) => sum + p.getValor(), 0);
      const valorTotalPix = pagamentosPix.reduce((sum, p) => sum + p.getValor(), 0);
      const valorTotalBoleto = pagamentosBoleto.reduce((sum, p) => sum + p.getValor(), 0);
      const valorTotalGeral = valorTotalCartao + valorTotalPix + valorTotalBoleto;

      // Estatísticas por status
      const cartoesAprovados = pagamentosCartao.filter((p) => p.getStatus() === "aprovado").length;
      const pixPagos = pagamentosPix.filter((p) => p.getStatus() === "pago").length;
      const boletosPagos = pagamentosBoleto.filter((p) => p.getStatus() === "pago").length;
      const totalAprovados = cartoesAprovados + pixPagos + boletosPagos;

      // Formatar dados para resposta
      const usuariosFormatados = usuarios.map((usuario) => ({
        id: usuario.getId(),
        nome: usuario.getNome(),
        telefone: usuario.getTelefone(),
        email: usuario.getEmail(),
        dataNascimento: usuario.getDataNascimento(),
      }));

      const comprasFormatadas = [
        ...pagamentosCartao.map((cartao) => ({
          id: cartao.getId(),
          tipo: "cartao",
          metodo: cartao.getTipo(),
          valor: cartao.getValor(),
          status: cartao.getStatus(),
          cpf: cartao.getCpf(),
          nome: cartao.getNomeImpresso(),
          parcelas: cartao.getParcelas(),
          valorParcela: cartao.getValorParcela(),
        })),
        ...pagamentosPix.map((pix) => ({
          id: pix.getId(),
          tipo: "pix",
          metodo: "pix",
          valor: pix.getValor(),
          status: pix.getStatus(),
          cpf: null,
          nome: null,
          parcelas: null,
          valorParcela: null,
        })),
        ...pagamentosBoleto.map((boleto) => ({
          id: boleto.getId(),
          tipo: "boleto",
          metodo: "boleto",
          valor: boleto.getValor(),
          status: boleto.getStatus(),
          cpf: boleto.getCpf(),
          nome: boleto.getNomeCompleto(),
          parcelas: null,
          valorParcela: null,
        })),
      ];

      res.json({
        estatisticas: {
          totalUsuarios,
          totalCompras,
          totalAprovados,
          valorTotalGeral,
          valorTotalCartao,
          valorTotalPix,
          valorTotalBoleto,
          porMetodo: {
            cartao: {
              total: pagamentosCartao.length,
              aprovados: cartoesAprovados,
              valorTotal: valorTotalCartao,
            },
            pix: {
              total: pagamentosPix.length,
              pagos: pixPagos,
              valorTotal: valorTotalPix,
            },
            boleto: {
              total: pagamentosBoleto.length,
              pagos: boletosPagos,
              valorTotal: valorTotalBoleto,
            },
          },
        },
        usuarios: usuariosFormatados,
        compras: comprasFormatadas,
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });
}

