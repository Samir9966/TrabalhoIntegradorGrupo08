import { app } from "../server";
import { getSharedBoletoService } from "../service/sharedServices";

export function BoletoController() {
  const service = getSharedBoletoService();

  app.post("/pagamentos/boleto", (req, res) => {
    try {
      const { cpf, nomeCompleto, email, valor } = req.body;
      
      if (!cpf) return res.status(400).json({ erro: "CPF obrigatório" });
      if (!nomeCompleto) return res.status(400).json({ erro: "Nome completo obrigatório" });
      if (!email) return res.status(400).json({ erro: "Email obrigatório" });
      if (!valor || valor <= 0) return res.status(400).json({ erro: "Valor deve ser maior que zero" });

      const boleto = service.criarPagamentoBoleto(cpf, nomeCompleto, email, valor);
      
      res.status(201).json({
        id: boleto.getId(),
        cpf: boleto.getCpf(),
        nomeCompleto: boleto.getNomeCompleto(),
        email: boleto.getEmail(),
        valor: boleto.getValor(),
        linhaDigitavel: boleto.getLinhaDigitavel(),
        dataVencimento: boleto.getDataVencimento(),
        status: boleto.getStatus(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.get("/pagamentos/boleto", (req, res) => {
    const pagamentos = service.listarPagamentosBoleto();
    
    const pagamentosFormatados = pagamentos.map((boleto) => ({
      id: boleto.getId(),
      cpf: boleto.getCpf(),
      nomeCompleto: boleto.getNomeCompleto(),
      email: boleto.getEmail(),
      valor: boleto.getValor(),
      linhaDigitavel: boleto.getLinhaDigitavel(),
      dataVencimento: boleto.getDataVencimento(),
      status: boleto.getStatus(),
    }));

    res.json(pagamentosFormatados);
  });

  app.get("/pagamentos/boleto/:id", (req, res) => {
    try {
      const { id } = req.params;
      const boleto = service.buscarPagamentoBoletoPorId(id);
      
      if (!boleto) {
        return res.status(404).json({ erro: "Pagamento boleto não encontrado" });
      }

      res.json({
        id: boleto.getId(),
        cpf: boleto.getCpf(),
        nomeCompleto: boleto.getNomeCompleto(),
        email: boleto.getEmail(),
        valor: boleto.getValor(),
        linhaDigitavel: boleto.getLinhaDigitavel(),
        dataVencimento: boleto.getDataVencimento(),
        status: boleto.getStatus(),
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });
}

