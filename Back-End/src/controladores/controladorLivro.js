const conexaoComDB = require("../database/conexaodb");
module.exports = {
  async novoLivro(req, res) {
    const {
      nome_livro,
      descricao_livro,
      datapostagem,
      conteudo,
      categoria,
    } = req.body;
    const usuario = req.headers.user;
    const id_usuario = usuario;
    const nome = await conexaoComDB("usuarios")
      .where("id", id_usuario)
      .select("nome")
      .first();
    const curtidas = 0;

    const comentario = [];

    const comentarios = JSON.stringify(comentario);
    console.log(comentarios);
    //Transformando o nome do usuário no autor
    const autor = nome.nome;
    //Desestruturação em vetor, pra ir incrementando por id++
    const [id] = await conexaoComDB("livros").insert({
      nome_livro,
      descricao_livro,
      autor,
      datapostagem,
      conteudo,
      categoria,
      comentarios,
      curtidas,
      id_usuario,
    });
    return res.json({ id });
  },
  async listarLivros(req, res) {
    const { page = 1 } = req.query;
    const [contadorDeLivros] = await conexaoComDB("livros").count();
    //Contador de TOTAL de livros adicionados a conta
    res.header("X-Total-Count", contadorDeLivros["count(*)"]);
    const livros = await conexaoComDB("livros")
      .join("usuarios", "usuarios.id", "=", "livros.id_usuario")
      .limit(5)
      .offset((page - 1) * 5)
      .select(["livros.*", "usuarios.nome", "usuarios.email"]);
    return res.send(livros);
  },
  async deletarLivro(req, res) {
    const { id } = req.params;
    const id_usuario = req.headers.user;
    const livro = await conexaoComDB("livros")
      .where("id", id)
      .select("id_usuario")
      .first();
    if (livro.id_usuario !== id_usuario) {
      return res
        .status(401)
        .json({ mensagem: "Não foi possível realizar a operação." });
    }
    await conexaoComDB("livros").where("id", id).delete();
    return res.status(204).send();
  },
  async atualizarLivro(req, res) {
    const { id } = req.params;
    const { nome_livro, descricao_livro, conteudo } = req.body;
    await conexaoComDB("livros").where("id", id).update({
      nome_livro: nome_livro,
      descricao_livro: descricao_livro,
      conteudo: conteudo,
    });
    return res.status(204).send();
  },
  async listarLivro(req, res) {
    const { id } = req.params;
    const livro = await conexaoComDB("livros").where("id", id).select("*");
    return res.send(livro);
  },

  async listaComentarios(req, res) {
    const { id } = req.params;
    const livro = await conexaoComDB("livros")
      .where("id", id)
      .select("comentarios");

    if (!livro) {
      console.log("sem comentarios");
    }
    if (!id) {
      console.log("id nao reconhecido");
    }

    return res.send(livro);
  },

  async addComent(req, res) {
    const { id } = req.params;
    //comentario, e usuario
    const data = req.body;
    const comentario = data.comentarioNovo;
    const usuario = req.headers.user;
    const id_usuario = usuario;
    const nome = await conexaoComDB("usuarios")
      .where("id", id_usuario)
      .select("nome")
      .first(); // Resgatando o Nome do usuario no banco
    const livros = await conexaoComDB("livros")
      .where("id", id)
      .select("comentarios");
    const LivrosMapeado = livros[0].comentarios;
    const toObject = JSON.parse(LivrosMapeado);

    const novocomentario = { usuario: nome, comentario: comentario };
    const rest = [...toObject, novocomentario];

    //Agora transformo em string
    const comentarios = JSON.stringify(rest);
    console.log(rest);

    await conexaoComDB("livros").where("id", id).update({ comentarios });

    return res.json({ mensagem: "aplicado!" });
  },

  async feed(req, res) {
    const livros = await conexaoComDB("livros").select("*");
    return res.json(livros);
  },
};
