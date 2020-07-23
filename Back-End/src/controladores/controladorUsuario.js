const conexaoComDB = require('../database/conexaodb');
const auth = require('../middlewares/auth');

module.exports = {
  async Listar(req,res){
    const livros = await conexaoComDB('livros').select("*");
    return res.json({livros});
  },
}