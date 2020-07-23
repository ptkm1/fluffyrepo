const conexaoComDB = require('../database/conexaodb');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const gerarToken = require('../config/geraToken');

module.exports = {
  async Cadastro(req,res){
    const {nome, email, senha, datanascimento} = req.body;
    
    //Verifica se o usuário já está cadastrado
    const verifica = await conexaoComDB('usuarios').where('email',email).select('email').first();
    /*if(email === verifica.email){
      return res.status(401).json({mensagem: "Usuário já existe"})
    } */

    //Verifica se tá vazio os campos
    if(!nome){
      return res.status(401).json({mensagem: "Não foi possível realizar a operação."})
    }
    if(!email){
      return res.status(401).json({mensagem: "não dá pra deixar em branco"})
    }
    if(!senha){
      return res.status(401).json({mensagem: "não dá pra deixar em branco"})
    }
    if(!datanascimento){
      return res.status(401).json({mensagem: "não dá pra deixar em branco"})
    }
    const id = crypto.randomBytes(5).toString('hex');
    const usuario = await conexaoComDB("usuarios").insert({id,nome,email,senha,datanascimento});
    //res.send(`${nome} Cadastrado com sucesso no banco!`)

    return res.json({id, token: gerarToken({ id: usuario.id }) });
  },

  async Login(req,res){
    const { email,senha } = req.body;
    const usuario = await conexaoComDB("usuarios")
      .where("email", email)
      .where("senha", senha)
      .select("id","nome","email","datanascimento")
      .first();

    if (!usuario) {
      return res
        .status(400)
        .json({ error: "não foi possivel logar, usuario não  foi encontrado no banco de dados" });
    }

    return res.send({
      usuario,
      token: gerarToken({ id: usuario.id }),
    });
  },

  async Listar(req,res){


    const data = await conexaoComDB('usuarios').select("*");
    return res.json(data);
  },

  async Deletar(req,res){
    const {id} = req.params;
    const nome = await conexaoComDB('usuarios').where("id",id).select("nome");
    await conexaoComDB('usuarios').where("id", id).delete();
    return res.send(`${nome[0].nome} deletado com sucesso!`)
  }
}