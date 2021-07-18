const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router_pokemons = require('../routes/pokemons.js');
const router_types = require('../routes/types.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//app.use('/', characters);
router.use('/', router_pokemons);
router.use('/', router_types);

module.exports = router;
