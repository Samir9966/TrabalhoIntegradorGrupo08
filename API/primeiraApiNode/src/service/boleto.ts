import { Boleto } from "../model/boleto";

export class BoletoService {
  lista: Boleto[] = [];

  criarPagamentoBoleto(
    cpf: string,
    nomeCompleto: string,
    email: string,
    valor: number
  ): Boleto {
    const boleto = Boleto.create(cpf, nomeCompleto, email, valor);
    this.lista.push(boleto);
    return boleto;
  }

  listarPagamentosBoleto(): Boleto[] {
    return this.lista;
  }

  buscarPagamentoBoletoPorId(id: string): Boleto | undefined {
    return this.lista.find((boleto) => boleto.getId() === id);
  }

  atualizarStatusBoleto(id: string, status: "pendente" | "pago" | "vencido"): Boleto {
    const boleto = this.buscarPagamentoBoletoPorId(id);
    if (!boleto) {
      throw new Error("Pagamento boleto não encontrado");
    }
    boleto.setStatus(status);
    return boleto;
  }
}

