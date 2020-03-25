const connection = require('../database/connection');
const crypto = require('crypto');

/**
 * Função para gerar um id Randomico.
 * 
 */
function generateRandomicId() {
    return crypto.randomBytes(4).toString('HEX');
};


/**
 * Função responsável por obter uma ONG pelo Id.
 * 
 * @param {*} id 
 */
async function getOngById(id) {

    return await connection('ongs')
        .select('*')
        .where({ 'id': id })
        .first();
};


module.exports = {

    /**
     * Controlador para listagem de todas as ongs cadastradas.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response) {

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

        //Gerando Primeiro Id Randomico
        let id = generateRandomicId();

        //Verificando se o id gerado já não existe no banco de dados
        let ongWithIdExist = await getOngById(id);
        
        //Loop de segurança que vai checar Equanto a Ong existir com aquele id de seleção, 
        //Ele vai ficar gerando novs Id's e checando novamente, dessa forma garantimos que 
        //O id será unico no Banco de dados.
        while (ongWithIdExist) {
            console.log('ONG com esse ID já existe. Solicitando novo ID');
            id = generateRandomicId();
            ongWithIdExist = await getOngById(id);            
        }

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