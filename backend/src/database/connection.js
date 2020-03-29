const knex = require('knex');
const configuration = require('../../knexfile');

//Pegando a váriavel de ambiente NODE_ENV setada por meio do cross-env
const env = process.env.NODE_ENV;

let connection;

if(env === 'test'){

    //Conexão de Teste
    connection = knex(configuration.test);

} else {

    //Conexão padrão
    connection = knex(configuration.development);
}


module.exports = connection;