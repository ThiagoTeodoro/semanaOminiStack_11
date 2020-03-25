/**
 * Arquivo com as rotas da aplicação.
 */
const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentControler');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

/**
 * Recurso para realizar o Login de uma ONG (Usuário)
 */
routes.post('/sessions', SessionController.create);

/**
 * Recurso para listar todas as Ongs.
 */
routes.get('/ongs', OngController.index);

/**
 * Recurso para cadastrar uma nova Ong.
 */
routes.post('/ongs', OngController.create);

/**
 * Recurso para obter o Profile de uma ONG.
 */
routes.get('/profile', ProfileController.index);

/**
 * Recurso para listar todas os incidentes (Casos).
 */
routes.get('/incidents', IncidentsController.index);

/**
 * Recurso para cadastrar um novo Incidente (Caso)
 */
routes.post('/incidents', IncidentsController.create);

/**
 * Recurso para deletar um incidente (Caso)
 */
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;
