const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    /**
     * Controlador para listagem de todas as ongs cadastradas.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){

        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    /**
     * Controlador para criação de uma nova Ong.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response) {

        const { name, email, whatsapp, city, uf } = request.body;

        let id = crypto.randomBytes(4).toString('HEX');

        //Precisa verificar se o id já não existe no banco de dados, a chance é minima
        // mas pode acontecer, de ele gerar o mesmo id e ai ele não pode cadstrar uma mesma
        //ong com o mesmo id.

        await connection('ongs').insert({
            "id": id,
            "name": name,
            "email": email,
            "whatsapp": whatsapp,
            "city": city,
            "uf": uf
        })

        return response.json({ "id": id });
    },

}