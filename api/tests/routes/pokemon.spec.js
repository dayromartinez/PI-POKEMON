/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const tipo = {
  id: 1,
  nombre: 'Water',
};

const pokemon = {
  id: 899, 
  nombre: 'Meme', 
  vitalidad: 100, 
  fuerza: 200, 
  defensa: 300, 
  velocidad: 400, 
  altura: 500,
  peso: 600, 
  imagen: "https://i.pinimg.com/236x/a2/4b/bb/a24bbbec077fff259b432b658a386739--el-meme-pokemon.jpg"
};

describe('Ruta Tipos Pokemon', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Type.sync({ force: true })
    .then(() => Type.create(tipo)));
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    );
    it('Debería coincidir el nombre del tipo con el suministrado al momento de la creación de dicho tipo', () => {
      agent.get('/types').then((res) => {
        expect(res.body).to.be.equal('Water');
      });
    });
  });
});

describe('Ruta Pokemones', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));

  describe('GET /pokemons/:id', () => {

    it('should get 200', () =>
      agent.get(`/pokemons/${pokemon.id}`)
      .expect(200)
    );

    it('Debería coincidir el nombre del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        expect(res.body.nombre).to.be.equal('Meme')
      });
    });

    it('Debería coincidir el ID del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        expect(res.body.id).to.be.equal(899)
      });
    });

    it('Debería coincidir la propiedad vitalidad del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        expect(res.body.vitalidad).to.be.equal(100)
      });
    });

    it('Debería coincidir la propiedad fuerza del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        expect(res.body.fuerza).to.be.equal(200)
      });
    });

    it('Debería coincidir la propiedad defensa del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.defensa).to.be.equal(300)
      });
    });

    it('Debería coincidir la propiedad velocidad del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.velocidad).to.be.equal(400)
      });
    });

    it('Debería coincidir la propiedad altura del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.altura).to.be.equal(500)
      });
    });

    it('Debería coincidir la propiedad peso del pokemón con el suministrado al momento de la creación de dicho pokemón', () => {
      agent.get(`/pokemons/${pokemon.id}`)
      .then((res) => {
        console.log(res.body);
        expect(res.body.peso).to.be.equal(600)
      });
    });
  });
});
