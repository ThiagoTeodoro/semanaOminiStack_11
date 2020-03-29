const crypto = require('crypto');

/**
 * Função para gerar um id Randomico.
 * 
 */
module.exports = function generateRandomicId() {
    return crypto.randomBytes(4).toString('HEX');
}