const supertest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //Antes de cada teste
    beforeEach( async () => {
        await connection.migrate.rollback(); //Isso aqui zera o banco de dados.
        await connection.migrate.latest(); //Isso aqui cria as tabelas na ultima versão.
    })

    //Depois de tudo.
    afterAll(async () => {
        await connection.destroy();
    })

    //Teste 1
    it('Deveria criar uma nova ONG.', async () => {

        const response = await supertest(app).post('/ongs').
        //.set('Authorization', 's1k2j3sa') Assim que seta Header. 
        send({
            name: "APAD2",
            email: "contato@gmail.com.br",
            whatsapp: "47000000000",
            city: "Rio do Sul",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })

    //Poderia ter um outro teste aki e se você definir variaveis globais de funções um pode depender do outro em sequencia.


})