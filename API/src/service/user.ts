import { User } from "../model/user";

export class UserService {
  lista: User[] = [];

  criarUsuario(user: {
    nome: string;
    telefone: string;
    email: string;
    dataNascimento: string;
  }): User {
    const userCreated = User.create(
      user.nome,
      user.telefone,
      user.email,
      user.dataNascimento
    );
    this.lista.push(userCreated);
    return userCreated;
  }


  editarUsuario(
    email: string,
    dados: {
      nome?: string;
      telefone?: string;
      dataNascimento: string;
    }
  ): User {
    const user = this.lista.find((user) => user.getEmail() === email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (dados.nome) user.setNome(dados.nome);
    if (dados.telefone) user.setTelefone(dados.telefone);
    if (dados.dataNascimento !== undefined) user.setIdade(dados.dataNascimento);

    return user;
  }

  listarUsuarios(): User[] {
    return this.lista;
  }

  buscarUsuarioPorNome(nome: string): User | undefined {
    return this.lista.find((user) => user.getNome() === nome);
  }

  buscarUsuarioPorDataNascimento(dataNascimento: string): User | undefined {
    return this.lista.find((user) => user.getDataNascimento() === dataNascimento);
  }

  // Métodos de filtro que retornam listas
  filtrarUsuariosPorDataNascimento(dataNascimento: string): User[] {
    return this.lista.filter((user) => user.getDataNascimento() === dataNascimento);
  }

  

  filtrarUsuariosPorNome(nome: string): User[] {
    return this.lista.filter((user) =>
      user.getNome().toLowerCase().includes(nome.toLowerCase())
    );
  }
}
