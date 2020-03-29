const connection = require('../database/connection');

module.exports = {

    /**
     * Controlador para listagem de todas os incidents cadastradas.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async index(request, response){

        /**
         * Esse tipo notação indica que se não vier nada em 
         * Page ele tera o valor default de 1
         */
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset( (page -1) * 5 )
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    /**
     * Controlador para criação de uma novos incidents.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response) {

        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        //Dessa maneira capturamos o ID que foi gerado para esse registro.
        const [id] = await connection('incidents').insert({
            "title": title,
            "description": description,
            "value": value,
            "ong_id": ong_id
        });
        
        return response.json({id});        
    },

    /**
     * Controlador para deleção de um incident.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async delete(request, response){

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        //Como o id é unico, então usamos o first para garantir um unico retorno.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({ 'error' : 'Operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

}