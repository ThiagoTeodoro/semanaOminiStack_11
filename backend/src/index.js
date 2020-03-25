const express = require('express');
const routes = require('./routes');
const cors = require('cors');

//Configurações do Express.
const app = express();

/**
 * Permite todas as origens, dentro do parenteses 
 * pode se preencher as origens caso você queira 
 * restringir.
 */
app.use(cors()); 
app.use(express.json());

/**
 * Tem que ser abaixo do express.json(). Por que 
 * se não as rotas não pegam a configuração de 
 * json, pois ele executa linha a linha.
 */
app.use(routes); 


//Porta de Trabalho
app.listen(3333);