import { randomUUID } from "node:crypto";

export class Cartao {
  constructor(
    private id: string,
    private numeroCartao: string,
    private nomeImpresso: string,
    private validade: string,
    private cvv: number,
    private cpf: string,
    private valor: number,
    private tipo: "credito" | "debito",
    private parcelas: number,
    private status: "pendente" | "aprovado" | "recusado"
  ) {
    if (!numeroCartao) throw new Error("Número do cartão obrigatório");
    if (!nomeImpresso) throw new Error("Nome impresso obrigatório");
    if (!validade) throw new Error("Validade obrigatória");
    const cvvStr = cvv.toString();
    if (cvvStr.length < 3 || cvvStr.length > 4) throw new Error("CVV inválido (deve ter 3 ou 4 dígitos)");
    if (!cpf) throw new Error("CPF obrigatório");
    if (valor <= 0) throw new Error("Valor deve ser maior que zero");
    if (parcelas < 1) throw new Error("Número de parcelas deve ser maior que zero");
  }

  static create(
    numeroCartao: string,
    nomeImpresso: string,
    validade: string,
    cvv: number,
    cpf: string,
    valor: number,
    tipo: "credito" | "debito",
    parcelas: number
  ): Cartao {
    const id = randomUUID();
    return new Cartao(id, numeroCartao, nomeImpresso, validade, cvv, cpf, valor, tipo, parcelas, "pendente");
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNumeroCartao(): string {
    return this.numeroCartao;
  }

  getNomeImpresso(): string {
    return this.nomeImpresso;
  }

  getValidade(): string {
    return this.validade;
  }

  getCvv(): number {
    return this.cvv;
  }

  getCpf(): string {
    return this.cpf;
  }

  getValor(): number {
    return this.valor;
  }

  getTipo(): "credito" | "debito" {
    return this.tipo;
  }

  getParcelas(): number {
    return this.parcelas;
  }

  getStatus(): "pendente" | "aprovado" | "recusado" {
    return this.status;
  }

  // Setters
  setStatus(status: "pendente" | "aprovado" | "recusado"): void {
    this.status = status;
  }

  getValorParcela(): number {
    return this.valor / this.parcelas;
  }
}