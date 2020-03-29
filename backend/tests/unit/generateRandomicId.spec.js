const generateRandomicId = require('../../src/utils/generateRandomicId');

describe('Generate Randomic ID', () => {
    it('Isso deveria gerar um ID Randômico', () => {
        const id = generateRandomicId();

        expect(id).toHaveLength(8);
    })
});