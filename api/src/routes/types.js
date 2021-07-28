var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const { Pokemon, Type } = require('../db.js');
const { conn } = require('../db.js');

var contador = 1;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;
var total = 19;
var tipos = [];

var offset_db = async function(contador){

    var tipo_pi = fetch(`https://pokeapi.co/api/v2/type/${contador}`)
        .then(t => t.json())
        .then(async (tipo) => {

            let obj_tipo = {
                id: tipo.id,
                nombre: tipo.name[0].toUpperCase() + tipo.name.slice(1),
            }

            //Se añade un nuevo tipo de pokemon a la db, traido desde la api
            const nuevo_tipo = await Type.create(obj_tipo);
            return obj_tipo.nombre;
        })
        .catch(error => res.status(STATUS_USER_ERROR).send(error));
    return tipo_pi;
}

router.get('/types', async(req, res) => {
    
    const tipo_db = await Type.findAll({
        attributes: ['nombre']
    });

    if(tipo_db.length === 0){
        //Hago la peticion a la api y voy trayendo cada uno de los tipos de pokemon, los almaceno en un arreglo y una vez hecho esto, lo guardo en la db de tipos
        while (contador < total){
            tipos.push(await offset_db(contador));
            contador++;
        }
        res.status(STATUS_OK).json(tipos);

    }else{
        tipos = tipo_db.map((tipo) => {
            return tipo.dataValues.nombre;
        })
        res.status(STATUS_OK).json(tipos);
    }
})

module.exports = router;