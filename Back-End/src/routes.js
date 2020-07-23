const express = require('express')
const rotas = express.Router();
const middleware = require('./middlewares/auth');

const usuarios = require('./controladores/controladorUsuarios');
const livros = require('./controladores/controladorLivro');
const usuario = require('./controladores/controladorUsuario');




// Rotas Cadastro
rotas.post('/cadastro',usuarios.Cadastro);
//Rota de Listar usuários
rotas.get('/listarusuarios',usuarios.Listar);
//Rotas Login
rotas.post('/login',usuarios.Login);
//Rotas deletar
rotas.delete('/deletar/:id',usuarios.Deletar);

// CRUD LIVROS
rotas.post('/livro', livros.novoLivro);
rotas.get('/listarLivros',middleware, livros.listarLivros);
rotas.delete('/deletarlivro/:id', livros.deletarLivro);
rotas.put('/atualizarlivro/:id', livros.atualizarLivro);
// Listar Livros USUARIO ESPECIFICO
rotas.get('/perfil', usuario.Listar);
// Listar LIVRO clicado
rotas.get('/listarlivro/:id', livros.listarLivro);

//Feed de livros (sem necessidade de autenticação)
rotas.get('/feed', livros.feed);

rotas.put('/comentario/:id', livros.addComent);
rotas.get('/listacomentarios/:id', livros.listaComentarios)

module.exports = rotas;