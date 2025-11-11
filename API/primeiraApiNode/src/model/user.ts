import bcrypt from "bcryptjs";

export class User {
  constructor(
    private id: string,
    private nome: string,
    private telefone: string,
    private email: string,
    private dataNascimento: string
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (!telefone) throw new Error("telefone obrigatório");
    if (!email) throw new Error("email obrigatório");
    if (!dataNascimento) throw new Error("data de nascimento obrigado")
    if (nome.length < 3) throw new Error("nome muito curto");
  }

  static create(
    nome: string,
    telefone: string,
    email: string,
    dataNascimento: string
  ) {
    const id = crypto.randomUUID();
    return new User(id, nome, telefone, email, dataNascimento);
  }

  

  // Getters
  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getDataNascimento(): string {
    return this.dataNascimento;
  }

  getEmail(): string {
    return this.email;
  }

  // Setters
  setNome(nome: string): void {
    this.nome = nome;
  }

  setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setIdade(dataNascimento: string): void {
    this.dataNascimento = dataNascimento;
  }
}
