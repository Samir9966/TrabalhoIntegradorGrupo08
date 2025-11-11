import { Cartao } from "../model/cartao";

export class CartaoService {
  lista: Cartao[] = [];

  criarPagamentoCartao(
    numeroCartao: string,
    nomeImpresso: string,
    validade: string,
    cvv: number,
    cpf: string,
    valor: number,
    tipo: "credito" | "debito",
    parcelas: number
  ): Cartao {
    const cartao = Cartao.create(
      numeroCartao,
      nomeImpresso,
      validade,
      cvv,
      cpf,
      valor,
      tipo,
      parcelas
    );
    this.lista.push(cartao);
    return cartao;
  }

  listarPagamentosCartao(): Cartao[] {
    return this.lista;
  }

  buscarPagamentoCartaoPorId(id: string): Cartao | undefined {
    return this.lista.find((cartao) => cartao.getId() === id);
  }

  atualizarStatusCartao(id: string, status: "pendente" | "aprovado" | "recusado"): Cartao {
    const cartao = this.buscarPagamentoCartaoPorId(id);
    if (!cartao) {
      throw new Error("Pagamento cartão não encontrado");
    }
    cartao.setStatus(status);
    return cartao;
  }
}

