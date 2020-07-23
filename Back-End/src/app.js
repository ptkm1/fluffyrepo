const express = require('express')
const app = express();
const rotas = require('./routes')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


app.use(rotas)
app.use(express.json());

app.listen(3333,()=>console.log('Servidor Rodando'));