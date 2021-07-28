export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const ORDER_POKEMONS = "ORDER_POKEMONS";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const TYPES_POKEMONS = "TYPES_POKEMONS";

//Obtencion pokemones por defecto, por ID o nombre tanto en API como en DB
export function getPokemons() {

    return async function(dispatch) {
        let response = await fetch("http://localhost:3001/pokemons")
        let json = await response.json();    
        dispatch({ type: GET_POKEMONS, payload: json })
    };
}

//Obtencion de los detalles de un pokemon tanto por ID como por Nombre tanto en API como en dB
export function getPokemonDetail(dato) {

    let tipo_dato = typeof(dato);

    if(tipo_dato === "string"){
        var tipo_string = Number(dato);
        if(isNaN(tipo_string)){
            return async function(dispatch) {
                return await fetch(`http://localhost:3001/pokemons?name=${dato}`)
                    .then(response => response.json())
                    .then(json => {
                        dispatch({ type: GET_POKEMON_DETAIL, payload: json })
                    })
                    .catch(error => console.log(error));
            };
        }else{
            return async function(dispatch) {
                return await fetch(`http://localhost:3001/pokemons/${dato}`)
                    .then(response => response.json())
                    .then(json => {
                        dispatch({ type: GET_POKEMON_DETAIL, payload: json })
                    })
                    .catch(error => console.log(error));
            };  
        }
    }
}

//Ordenamiento de pokemones
export function orderPokemons(orden, modo, pokemones){
    return {
        type: ORDER_POKEMONS,
        payload: {orden, modo, pokemones}
    }
}

//Filtramiento de pokemones
export function filterPokemons(tipo, origen_pokemon, pokemones){
    return {
        type: FILTER_POKEMONS,
        payload: {tipo: tipo, origen: origen_pokemon, pokemones: pokemones}
    }
}

//Importacion de los tipos de pokemones
export function typesPokemons(){
    return async function(dispatch) {
        return await fetch("http://localhost:3001/types")
            .then(response => response.json())
            .then(json => {
                dispatch({ type: TYPES_POKEMONS, payload: json });
            })
            .catch(error => console.log(error));
    };
}

