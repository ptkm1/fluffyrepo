const knex = require('knex')
const configuracao = require('../../knexfile');
const conexaoComDB = knex(configuracao.development);
module.exports = conexaoComDB;