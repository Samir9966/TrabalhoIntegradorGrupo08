export class Boleto {
  constructor(
    private id: string,
    private cpf: string,
    private nomeCompleto: string,
    private email: string,
    private valor: number,
    private linhaDigitavel: string,
    private dataVencimento: Date,
    private status: "pendente" | "pago" | "vencido"
  ) {
    if (!cpf) throw new Error("CPF obrigatório");
    if (!nomeCompleto) throw new Error("Nome completo obrigatório");
    if (!email) throw new Error("Email obrigatório");
    if (nomeCompleto.length < 3) throw new Error("Nome muito curto");
    if (valor <= 0) throw new Error("Valor deve ser maior que zero");
  }

  static create(
    cpf: string,
    nomeCompleto: string,
    email: string,
    valor: number
  ): Boleto {
    const id = crypto.randomUUID();
    // Gera linha digitável simulada do boleto
    const linhaDigitavel = `23790.${Math.floor(Math.random() * 10000).toString().padStart(5, "0")} ${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}.${Math.floor(Math.random() * 100000).toString().padStart(6, "0")} ${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}.${Math.floor(Math.random() * 100000).toString().padStart(6, "0")} 8 ${valor.toFixed(2).replace(".", "").padStart(8, "0")}`;
    
    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + 3); // Vence em 3 dias úteis
    
    return new Boleto(id, cpf, nomeCompleto, email, valor, linhaDigitavel, dataVencimento, "pendente");
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getCpf(): string {
    return this.cpf;
  }

  getNomeCompleto(): string {
    return this.nomeCompleto;
  }

  getEmail(): string {
    return this.email;
  }

  getValor(): number {
    return this.valor;
  }

  getLinhaDigitavel(): string {
    return this.linhaDigitavel;
  }

  getDataVencimento(): Date {
    return this.dataVencimento;
  }

  getStatus(): "pendente" | "pago" | "vencido" {
    return this.status;
  }

  // Setters
  setStatus(status: "pendente" | "pago" | "vencido"): void {
    this.status = status;
  }

  isVencido(): boolean {
    return new Date() > this.dataVencimento;
  }
}