import { app } from "../server";
import { getSharedPixService } from "../service/sharedServices";

export function PixController() {
  const service = getSharedPixService();

  app.post("/pagamentos/pix", (req, res) => {
    try {
      const { valor } = req.body;
      
      if (!valor || valor <= 0) {
        return res.status(400).json({ erro: "Valor deve ser maior que zero" });
      }

      const pix = service.criarPagamentoPix(valor);
      
      res.status(201).json({
        id: pix.getId(),
        valor: pix.getValor(),
        codigoPix: pix.getCodigoPix(),
        dataExpiracao: pix.getDataExpiracao(),
        status: pix.getStatus(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.get("/pagamentos/pix", (req, res) => {
    const pagamentos = service.listarPagamentosPix();
    
    const pagamentosFormatados = pagamentos.map((pix) => ({
      id: pix.getId(),
      valor: pix.getValor(),
      codigoPix: pix.getCodigoPix(),
      dataExpiracao: pix.getDataExpiracao(),
      status: pix.getStatus(),
    }));

    res.json(pagamentosFormatados);
  });

  app.get("/pagamentos/pix/:id", (req, res) => {
    try {
      const { id } = req.params;
      const pix = service.buscarPagamentoPixPorId(id);
      
      if (!pix) {
        return res.status(404).json({ erro: "Pagamento PIX não encontrado" });
      }

      res.json({
        id: pix.getId(),
        valor: pix.getValor(),
        codigoPix: pix.getCodigoPix(),
        dataExpiracao: pix.getDataExpiracao(),
        status: pix.getStatus(),
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });
}

