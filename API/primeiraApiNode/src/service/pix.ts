import { Pix } from "../model/pix";

export class PixService {
  lista: Pix[] = [];

  criarPagamentoPix(valor: number): Pix {
    const pix = Pix.create(valor);
    this.lista.push(pix);
    return pix;
  }

  listarPagamentosPix(): Pix[] {
    return this.lista;
  }

  buscarPagamentoPixPorId(id: string): Pix | undefined {
    return this.lista.find((pix) => pix.getId() === id);
  }

  atualizarStatusPix(id: string, status: "pendente" | "pago" | "expirado"): Pix {
    const pix = this.buscarPagamentoPixPorId(id);
    if (!pix) {
      throw new Error("Pagamento PIX não encontrado");
    }
    pix.setStatus(status);
    return pix;
  }
}

