import { User } from "../model/user";
import { app } from "../server";
import { getSharedUserService } from "../service/sharedServices";

export function UserController() {
  const service = getSharedUserService();

  app.get("/usuarios", (req, res) => {
    const usuarios = service.listarUsuarios();

    const usuariosSemSenha = usuarios.map((usuario) => ({
      id: usuario.getId(),
      nome: usuario.getNome(),
      telefone: usuario.getTelefone(),
      email: usuario.getEmail(),
      idade: usuario.getDataNascimento(),
    }));

    res.json(usuariosSemSenha);
  });

  app.post("/usuarios", (req, res) => {
    try {
      const dadosUsuario = req.body;
      const novoUsuario = service.criarUsuario(dadosUsuario);
      res.status(201).json({
        status: "Usuário criado com sucesso",
        id: novoUsuario.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.put("/usuarios/:email", (req, res) => {
    try {
      const { email } = req.params;
      const dados = req.body;
      const usuarioAtualizado = service.editarUsuario(email, dados);

      res.json({
        status: "Usuário atualizado com sucesso",
        dados: {
          id: usuarioAtualizado.getId(),
          nome: usuarioAtualizado.getNome(),
          telefone: usuarioAtualizado.getTelefone(),
          email: usuarioAtualizado.getEmail(),
          idade: usuarioAtualizado.getDataNascimento(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  

  app.get("/usuarios/buscar", (req, res) => {
    const { nome, idade, idadeMin, idadeMax } = req.query;

    // Filtro por nome (retorna lista)
    if (nome) {
      const usuarios = service.filtrarUsuariosPorNome(nome as string);
      const usuariosSemSenha = usuarios.map((usuario) => ({
        id: usuario.getId(),
        nome: usuario.getNome(),
        telefone: usuario.getTelefone(),
        email: usuario.getEmail(),
        idade: usuario.getDataNascimento(),
      }));
      return res.status(200).json(usuariosSemSenha);
    }

    // Filtro por faixa etária (retorna lista)
    

    // Filtro por idade exata (retorna lista)
    

    return res.status(400).json({
      mensagem:
        "Parâmetros de busca inválidos. Use: nome, idade, ou idadeMin/idadeMax",
    });
  });
}
