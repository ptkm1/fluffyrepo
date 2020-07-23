const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req,res,next)=>{
  const cabecalhoHTTP = req.headers.authorization;
  if(!cabecalhoHTTP){
    return res.status(401).send({mensagem:'sem token'})
  }

  const parts = cabecalhoHTTP.split(' ');

  if(!parts.lenght === 2){
    return res.status(401).send({mensagem:"Erro no token"})
  }

  const [ scheme, token ] = parts;

  if(!/^Bearer$/i.test(scheme)){
    return res.status(401).send({mensagem:"Token mal formatado"})
  }

  jwt.verify(token,authConfig.secret, (erro,decoded)=>{
    if(erro) return res.status(401).send({erro:"token inválido"})
    
    
    return next(), req.idUsuario = decoded.id;
  })
};