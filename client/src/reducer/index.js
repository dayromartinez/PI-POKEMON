import { GET_POKEMONS, GET_POKEMON_DETAIL, ORDER_POKEMONS, FILTER_POKEMONS, TYPES_POKEMONS } from '../actions/index.js';


const initialState = {
    lista_pokemons: [],
    filtrado_pokemons: [],
    tipos_pokemons: [],
    pokemon_detalle: {},
};

//Se establecen las funcionalidaes de cada una de las acciones en este reducer
const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_POKEMONS:
            return {
                ...state,
                lista_pokemons: action.payload
            };
        
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemon_detalle: action.payload
            };
        
        case ORDER_POKEMONS:

            if(action.payload.orden === "orden_alfabetico"){
                //Metodo de ordenamiento Bubble Sort
                for(let i = 0; i < action.payload.pokemones.length; i++){
                    for(let j = 0; j < action.payload.pokemones.length - 1 - i; j++){
                        //De la A a la Z
                        if(action.payload.modo === "descendente"){
                            if(action.payload.pokemones[j].nombre > action.payload.pokemones[j + 1].nombre){
                    
                                let x = action.payload.pokemones[j];
                                let y = action.payload.pokemones[j+1];
                        
                                action.payload.pokemones[j] = y;
                                action.payload.pokemones[j+1] = x;
                            }
                        //De la Z a la A
                        }else if(action.payload.modo === "ascendente"){
                            if(action.payload.pokemones[j].nombre < action.payload.pokemones[j + 1].nombre){
                    
                                let x = action.payload.pokemones[j];
                                let y = action.payload.pokemones[j+1];
                        
                                action.payload.pokemones[j] = y;
                                action.payload.pokemones[j+1] = x;
                            }
                        }
                    }
                }
            }else if(action.payload.orden === "orden_fuerza"){
                //Aqui se ordena por fuerza
                for(let i = 0; i < action.payload.pokemones.length; i++){
                    for(let j = 0; j < action.payload.pokemones.length - 1 - i; j++){
                        //De menor a mayor fuerza
                        if(action.payload.modo === "ascendente"){
                            if(action.payload.pokemones[j].fuerza > action.payload.pokemones[j + 1].fuerza){
                    
                                let x = action.payload.pokemones[j];
                                let y = action.payload.pokemones[j+1];
                        
                                action.payload.pokemones[j] = y;
                                action.payload.pokemones[j+1] = x;
                            }
                        }else if(action.payload.modo === "descendente"){
                            //De mayor a menor fuerza
                            if(action.payload.pokemones[j].fuerza < action.payload.pokemones[j + 1].fuerza){
                    
                                let x = action.payload.pokemones[j];
                                let y = action.payload.pokemones[j+1];
                        
                                action.payload.pokemones[j] = y;
                                action.payload.pokemones[j+1] = x;
                            }
                        }
                    }
                }
            }

            return {
                ...state,
                lista_pokemons: action.payload.pokemones
            };
        
        case FILTER_POKEMONS:
            console.log("action_filtro: ",action.payload.pokemones);
            return {
                ...state,
                filtrado_pokemons: action.payload.pokemones.filter((pokemon) => {
                    for(let i = 0; i < pokemon.tipos.length; i++){
                        //Aqui se filtra tanto por tipo como por el origen del pokemon, sea de la DB o la API
                        if(pokemon.tipos[i] === action.payload.tipo && pokemon.origen === action.payload.origen){
                            return pokemon;
                        }
                    }
                })
            }
        
        case TYPES_POKEMONS:
            return{
                ...state,
                tipos_pokemons: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;