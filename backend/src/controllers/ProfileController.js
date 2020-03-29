const connection = require('../database/connection');

module.exports = {

    /**
     * Controlador responsável por retornar os incidentes de uma unica ONG especifica,
     * afím de fornecer os dados para montar um perfil.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidentes = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidentes);
    },
    
}