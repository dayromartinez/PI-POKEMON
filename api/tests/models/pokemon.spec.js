const { Pokemon, Type, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ nombre: 'Pikachu' });
      });
    });

    describe('id', () => {
      it('Debería arrojar un error si ID es null', (done) => {
        Pokemon.create({nombre: 'Benitocamelas'})
          .then(() => done(new Error('Se requiere un ID')))
          .catch(() => done());
      });
      it('Debería registrar al nuevo pokemon cuando se le suministra un ID y un Nombre', () => {
        Pokemon.create({ id: 899, nombre: 'Covidchart' });
      });
    });

    describe('Registro Completo', () => {
      it('Debería poder registrarse un Pokemon con las propiedades completas', () => {
        Pokemon.create({ id: 899, nombre: 'Meme', vitalidad: 100, fuerza: 200, defensa: 300, velocidad: 400, 
        altura: 500, peso: 600, imagen: "https://i.pinimg.com/236x/a2/4b/bb/a24bbbec077fff259b432b658a386739--el-meme-pokemon.jpg"});
      });
    });
  });
});

describe('Entidad Tipos', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Type.create({ nombre: 'Water' });
      });
    });

    describe('id', () => {

      it('Debería arrojar un error si ID es null', (done) => {
        Type.create({nombre: 'Fire'})
          .then(() => done(new Error('Se requiere un ID')))
          .catch(() => done());
      });

      it('Debería registrar un tipo de pokemon cuando se le suministra un ID y un Nombre', async() => {
        Type.create({ id: 1, nombre: 'Ghost' });
      });
    });

    describe('Evaluación datos', () => {

      it('Debería coincidir el nombre del tipo con el suministrado al momento de la creación de dicho tipo', () => {
        return Type.create({ id: 1, nombre: 'Ghost' })
        .then((tipo) => {
          expect(tipo.nombre).to.equal('Ghost');
        })
      });

      it('Debería coincidir el ID del tipo con el suministrado al momento de la creación de dicho tipo', () => {
        return Type.create({ id: 1, nombre: 'Fire' })
        .then((tipo) => {
          expect(tipo.id).to.equal(1);
        })
      });
    })
  });
});