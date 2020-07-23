const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');


function gerarToken(params = {}){
    return jwt.sign(params, auth.secret, {
      expiresIn: 86400,
    } );
}

module.exports = gerarToken;