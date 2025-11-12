import { randomUUID } from "node:crypto";

export class Pix {
  constructor(
    private id: string,
    private valor: number,
    private codigoPix: string,
    private dataExpiracao: Date,
    private status: "pendente" | "pago" | "expirado"
  ) {
    if (valor <= 0) throw new Error("Valor deve ser maior que zero");
    if (!codigoPix) throw new Error("Código PIX obrigatório");
  }

  static create(valor: number): Pix {
    const id = randomUUID();
    const codigoPix = `00020126580014br.gov.bcb.pix0136${id.replace(/-/g, "")}520400005303986540${valor.toFixed(2)}`;
    const dataExpiracao = new Date();
    dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 30); // Expira em 30 minutos
    
    return new Pix(id, valor, codigoPix, dataExpiracao, "pendente");
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getValor(): number {
    return this.valor;
  }

  getCodigoPix(): string {
    return this.codigoPix;
  }

  getDataExpiracao(): Date {
    return this.dataExpiracao;
  }

  getStatus(): "pendente" | "pago" | "expirado" {
    return this.status;
  }

  // Setters
  setStatus(status: "pendente" | "pago" | "expirado"): void {
    this.status = status;
  }

  isExpirado(): boolean {
    return new Date() > this.dataExpiracao;
  }
}

