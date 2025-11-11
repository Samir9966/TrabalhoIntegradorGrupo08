import { app } from "../server";
import { getSharedCartaoService } from "../service/sharedServices";

export function CartaoController() {
  const service = getSharedCartaoService();

  app.post("/pagamentos/cartao", (req, res) => {
    try {
      const { numeroCartao, nomeImpresso, validade, cvv, cpf, valor, tipo, parcelas } = req.body;
      
      if (!numeroCartao) return res.status(400).json({ erro: "Número do cartão obrigatório" });
      if (!nomeImpresso) return res.status(400).json({ erro: "Nome impresso obrigatório" });
      if (!validade) return res.status(400).json({ erro: "Validade obrigatória" });
      if (!cvv) return res.status(400).json({ erro: "CVV obrigatório" });
      if (!cpf) return res.status(400).json({ erro: "CPF obrigatório" });
      if (!valor || valor <= 0) return res.status(400).json({ erro: "Valor deve ser maior que zero" });
      if (!tipo || (tipo !== "credito" && tipo !== "debito")) {
        return res.status(400).json({ erro: "Tipo deve ser 'credito' ou 'debito'" });
      }
      if (!parcelas || parcelas < 1) return res.status(400).json({ erro: "Número de parcelas deve ser maior que zero" });

      const cartao = service.criarPagamentoCartao(
        numeroCartao,
        nomeImpresso,
        validade,
        cvv,
        cpf,
        valor,
        tipo,
        parcelas
      );
      
      res.status(201).json({
        id: cartao.getId(),
        numeroCartao: cartao.getNumeroCartao(),
        nomeImpresso: cartao.getNomeImpresso(),
        validade: cartao.getValidade(),
        cpf: cartao.getCpf(),
        valor: cartao.getValor(),
        tipo: cartao.getTipo(),
        parcelas: cartao.getParcelas(),
        valorParcela: cartao.getValorParcela(),
        status: cartao.getStatus(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.get("/pagamentos/cartao", (req, res) => {
    const pagamentos = service.listarPagamentosCartao();
    
    const pagamentosFormatados = pagamentos.map((cartao) => ({
      id: cartao.getId(),
      numeroCartao: cartao.getNumeroCartao(),
      nomeImpresso: cartao.getNomeImpresso(),
      validade: cartao.getValidade(),
      cpf: cartao.getCpf(),
      valor: cartao.getValor(),
      tipo: cartao.getTipo(),
      parcelas: cartao.getParcelas(),
      valorParcela: cartao.getValorParcela(),
      status: cartao.getStatus(),
    }));

    res.json(pagamentosFormatados);
  });

  app.get("/pagamentos/cartao/:id", (req, res) => {
    try {
      const { id } = req.params;
      const cartao = service.buscarPagamentoCartaoPorId(id);
      
      if (!cartao) {
        return res.status(404).json({ erro: "Pagamento cartão não encontrado" });
      }

      res.json({
        id: cartao.getId(),
        numeroCartao: cartao.getNumeroCartao(),
        nomeImpresso: cartao.getNomeImpresso(),
        validade: cartao.getValidade(),
        cpf: cartao.getCpf(),
        valor: cartao.getValor(),
        tipo: cartao.getTipo(),
        parcelas: cartao.getParcelas(),
        valorParcela: cartao.getValorParcela(),
        status: cartao.getStatus(),
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });
}

