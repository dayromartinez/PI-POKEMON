var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const { Pokemon, Type } = require('../db.js');
const { conn } = require('../db.js');

var pokemons = [];
var detalle_pokemon = {};
var contador = 1;
const STATUS_USER_ERROR = 404;
const STATUS_OK = 200;
var total = 898;

//Esta funcion hace el offset de los pokemones por defecto que hay que cargar, y se invoca dentro del while de la ruta /pokemons
var offset = async function(contador, origen){

    if(origen === "API"){
        let p = fetch(`https://pokeapi.co/api/v2/pokemon/${contador}`)
                .then(p => p.json())
                .then((pokemon) => {
                    
                    //Creo un objeto para cada pokemon del listado, con las propiedades que me piden para luego añadirla al arreglo de pokemones
                    let obj = {
                        nombre: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
                        imagen: pokemon.sprites.other.dream_world.front_default,
                        fuerza: pokemon.stats[1].base_stat,
                        tipos: [],
                        origen: "API"
                    }
        
                    pokemon.types.forEach(objeto => {
                        for (const key in objeto) {
                            if (key === "type") {
                                obj.tipos.push(objeto[key].name[0].toUpperCase() + objeto[key].name.slice(1));
                            }
                        }
                    });
                    
                    return obj;
                })
                .catch(error => res.status(STATUS_USER_ERROR).send(error));
        
        return p;

    }else if(origen === "DB"){
        
        //Se realiza la consulta a la db de pokemones por ID y en caso de match, se traen los datos de dicho pokemon
        const pokemon_db = await Pokemon.findByPk(contador, {include: Type});
        if(pokemon_db !== null){

            let detalle_pokemon = {
                nombre: pokemon_db.dataValues.nombre,
                imagen: pokemon_db.dataValues.imagen,
                fuerza: pokemon_db.dataValues.fuerza,
                tipos: [],
                origen: "DB"
            }
    
            pokemon_db.dataValues.types.forEach(objeto => {
                for (const key in objeto.dataValues) {
                    if (key === "nombre") {
                        detalle_pokemon.tipos.push(objeto[key]);
                    }
                }
            });
            return detalle_pokemon;
        }else{
            return pokemon_db;
        }
    }
}

//Esta funcion busca a un pokemon dentro de la api con base en nombres y ID's
var busqueda = async function(nombre, id){

    if(nombre !== ""){

        let pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(p => p.json())
        .then((pokemon) => {

            //Creo un objeto que almacenara todas las propiedades requeridas para cada pokemon
            let detalle_pokemon = {
                id: pokemon.id,
                nombre: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
                imagen: pokemon.sprites.other.dream_world.front_default,
                tipos: [],
                vitalidad: pokemon.stats[0].base_stat,
                fuerza: pokemon.stats[1].base_stat,
                defensa: pokemon.stats[2].base_stat,
                velocidad: pokemon.stats[5].base_stat,
                altura: pokemon.height,
                peso: pokemon.weight,
                origen: "API"
            }

            pokemon.types.forEach(objeto => {
                for (const key in objeto) {
                    if (key === "type") {
                        detalle_pokemon.tipos.push(objeto[key].name[0].toUpperCase() + objeto[key].name.slice(1));
                    }
                }
            });

            return detalle_pokemon;
        })
        .catch(error => res.status(STATUS_USER_ERROR).send("El pokemon que intenta buscar no existe, inténtelo de nuevo."));
        return pokemon;

    }else{

        let pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(p => p.json())
            .then(async (pokemon) => {

                //Creo un objeto que almacenara todas las propiedades requeridas para cada pokemon
                detalle_pokemon = {
                    id: id,
                    nombre: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
                    imagen: pokemon.sprites.other.dream_world.front_default,
                    tipos: [],
                    vitalidad: pokemon.stats[0].base_stat,
                    fuerza: pokemon.stats[1].base_stat,
                    defensa: pokemon.stats[2].base_stat,
                    velocidad: pokemon.stats[5].base_stat,
                    altura: pokemon.height,
                    peso: pokemon.weight,
                    origen: "API"
                }

                pokemon.types.forEach(objeto => {
                    for (const key in objeto) {
                        if (key === "type") {
                            detalle_pokemon.tipos.push(objeto[key].name[0].toUpperCase() + objeto[key].name.slice(1));
                        }
                    }
                });

                return detalle_pokemon;
            })
            .catch(error => res.status(STATUS_USER_ERROR).send(error));
        return pokemon;
    }
}

//Busqueda de pokemones en db, tanto por nombre como por ID
var busqueda_db = async function(nombre, id, Pokemon, Type){

    if(nombre !== ""){

        //Busco al pokemon en la db por nombre
        const match = await Pokemon.findOne({where: { nombre: nombre[0].toUpperCase() + nombre.slice(1) }});

        if(match !== null){

            const id = match.dataValues.id;
            const pokemon_db = await Pokemon.findByPk(id, {include: Type});
            let detalle_pokemon = {
                id: pokemon_db.dataValues.id,
                nombre: pokemon_db.dataValues.nombre,
                vitalidad: pokemon_db.dataValues.vitalidad,
                fuerza: pokemon_db.dataValues.fuerza,
                defensa: pokemon_db.dataValues.defensa,
                velocidad: pokemon_db.dataValues.velocidad,
                altura: pokemon_db.dataValues.altura,
                peso: pokemon_db.dataValues.peso,
                imagen: pokemon_db.dataValues.imagen,
                tipos: [],
                origen: "DB"
            }
    
            pokemon_db.dataValues.types.forEach(objeto => {
                for (const key in objeto.dataValues) {
                    if (key === "nombre") {
                        detalle_pokemon.tipos.push(objeto[key]);
                    }
                }
            });
            return detalle_pokemon;
        }else{
            return match;
        }

    }else if (id !== 0){

        //Se realiza la consulta a la db de pokemones por ID y en caso de match, se traen los datos de dicho pokemon
        const pokemon_db = await Pokemon.findByPk(id, {include: Type});
        
        if(pokemon_db !== null){

            let detalle_pokemon = {
                id: pokemon_db.dataValues.id,
                nombre: pokemon_db.dataValues.nombre,
                vitalidad: pokemon_db.dataValues.vitalidad,
                fuerza: pokemon_db.dataValues.fuerza,
                defensa: pokemon_db.dataValues.defensa,
                velocidad: pokemon_db.dataValues.velocidad,
                altura: pokemon_db.dataValues.altura,
                peso: pokemon_db.dataValues.peso,
                imagen: pokemon_db.dataValues.imagen,
                tipos: [],
                origen: "DB"
            }
    
            pokemon_db.dataValues.types.forEach(objeto => {
                for (const key in objeto.dataValues) {
                    if (key === "nombre") {
                        detalle_pokemon.tipos.push(objeto[key]);
                    }
                }
            });
            return detalle_pokemon;
        }else{
            return pokemon_db;
        }
    }
}

//----------------------------------- Lista Pokemones ----------------------------------------------------
router.get('/pokemons', async function(req, res) {

    //Obtener un listado con 40 pokemones
    //Debe devolver solo los datos necesarios para la ruta principal
    const { name } = req.query;

    if(name === undefined){

        //En primera instancia contabilizo la cantidad de pokemones en la db
        const p_db = await Pokemon.findAll({
            attributes: [
                [conn.fn('COUNT', conn.col('id')), 'n_pokemones'],
            ]
        });

        let c_db = 899;
        let cantidad_pokemones_db = Number(p_db[0].dataValues.n_pokemones);  
        
        //Hago el enunciado de la lista de 40 pokemones por default
        while(contador < 41){
            //En la lista por defecto primero cargo los pokemones que hay en la db
            while(c_db <= cantidad_pokemones_db + 898){
                let p_db = await offset(c_db, "DB");
                pokemons.push(p_db);
                contador++;
                c_db++;
                console.log(p_db);
            }

            //Luego voy con los pokemones de la API, hasta llegar al límite de la lista (40)
            pokemons.push(await offset(contador, "API"));
            contador++; 
        }

        res.status(STATUS_OK).json(pokemons);
        contador = 1;
        pokemons = [];
    
    }else{
        
        //---------------------------------------------- Busqueda de pokemon por nombre (query), tanto en db como en api -----------------------
        let nombre = name.toLowerCase();

        //Busco al pokemon en la db por NOMBRE y de acuerdo al resultado, se establece el metodo de busqueda
        const pokemon_db = (await busqueda_db(nombre, 0, Pokemon, Type));
        if(pokemon_db !== null){
            
            res.status(STATUS_OK).json(pokemon_db);

        }else{

            //Busco al pokemon en la API por NOMBRE y en caso de no encontrarse, se notifica del respectivo error
            try {
                detalle_pokemon = (await busqueda(nombre));
                //Respuesta API
                res.status(STATUS_OK).json(detalle_pokemon);
            } catch (error) {
                let err = "El pokemon que intenta buscar no existe, inténtelo de nuevo.";
                res.status(STATUS_USER_ERROR).json({err});
            }
        }
    }
});


//---------------------------------------- Detalle Pokemon ID--------------------------------------------------
router.get('/pokemons/:id', async (req, res) => {

    //Obtener el detalle de un pokemon en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de pokemon
    //Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

    const { id } = req.params;
    const p_db = await Pokemon.findAll({
        attributes: [
            [conn.fn('COUNT', conn.col('id')), 'n_pokemones'],
        ]
    });

    //Se consulta la cantidad de pokemones en la db y se suma al total de pokemones en la api
    let cantidad_pokemones_db = Number(p_db[0].dataValues.n_pokemones);  
    total = 898 + cantidad_pokemones_db;
    console.log(total);

    if(id <= total){

        //Se hace el request a la api, ya que sabemos de antemano que el id que ingreso el usuario, pertenece
        //a los pokemones que están registrados en la api
        if(id < 899){

            detalle_pokemon = (await busqueda("", id));
            res.status(STATUS_OK).json(detalle_pokemon);

        }else if(id > 898){

            //Se llama a la funcion para buscar al pokemon por id
            detalle_pokemon = (await busqueda_db("", id, Pokemon, Type));
            res.status(STATUS_OK).json(detalle_pokemon);
        }
    }else{
        let err = "El pokemon que intenta buscar no existe, inténtelo de nuevo.";
        res.status(STATUS_USER_ERROR).json({err});
    }
})

router.post('/pokemons', async (req, res) => {

    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
    //Crea un pokemon en la base de datos

    const { name, vitalidad, fuerza, defensa, velocidad, altura, peso, tipos, imagen} = req.body;
    console.log(name, vitalidad, fuerza, defensa, velocidad, altura, peso, tipos, imagen);
    let nombre = name[0].toUpperCase() + name.slice(1);

    try {

        const p_db = await Pokemon.findAll({
            attributes: [
                [conn.fn('COUNT', conn.col('id')), 'n_pokemones'],
            ]
        });
    
        //Se consulta la cantidad de pokemones en la db y se suma al total de pokemones en la api
        let cantidad_pokemones_db = Number(p_db[0].dataValues.n_pokemones);  
        total = 898 + cantidad_pokemones_db;
        console.log(total);
    
        const [pokemon, created] = await Pokemon.findOrCreate({
            where: { nombre: nombre },
            defaults: {
                id: total + 1,
                nombre: nombre,
                vitalidad: vitalidad,
                fuerza: fuerza,
                defensa: defensa,
                velocidad: velocidad,
                altura: altura,
                peso: peso,
                imagen: imagen
            }
        });
        
        tipos.forEach(async (tipo) => {
    
            let t =  tipo[0].toUpperCase() + tipo.slice(1);
            const tipo_db = await Type.findOne({where: { nombre: t }});
            if(tipo_db !== null){
                pokemon.setTypes(tipo_db.id);
            }else{
                res.status(STATUS_USER_ERROR).send("Uno o varios de los tipos de este pokemon es inexistente. Inténtelo de nuevo.");
            }
        })
        res.status(STATUS_OK).json(pokemon);
        
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;