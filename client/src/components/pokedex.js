import React, { useEffect, useState } from 'react';
import { getPokemons, getPokemonDetail, typesPokemons } from "../actions/index.js";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import "../styles/pokedex.css";

const Pokedex = () => {

    const tipos = useSelector( state => state.tipos_pokemons);
    const offset = useSelector( state => state.lista_pokemons);
    const pokemon = useSelector( state => state.pokemon_detalle);
    const cards_page = 12;

    let history = useHistory();

    const redirect = () => {
        history.push(`/pokemon/detalles`)
    }

    //Funciones paginado
    const nextPage = (e) => {

        e.preventDefault();
        const n_pokemones = offset.length;
        const next_page = state.current_page + 1;
        const pokemon_inicial = next_page * cards_page;
        if(pokemon_inicial === n_pokemones) return;
        setState({
            ...state,
            items: [...offset].splice(pokemon_inicial, cards_page),
            current_page: state.current_page + 1
        })
    }

    const prevPage = (e) => {

        e.preventDefault();
        const prev_page = state.current_page - 1;
        if(prev_page < 0) return;
        const pokemon_inicial = prev_page * cards_page;
        setState({
            ...state,
            items: [...offset].splice(pokemon_inicial, cards_page),
            current_page: state.current_page - 1
        })
    }

    //Estado general del componente
    const [state, setState] = useState({
        buscador: "",
        boton: 0,
        tipo: "",
        origen: "",
        ordenamiento: "",
        modo: "",
        alerta: false,
        direccionar: false,
        pokemon: "",
        click_imagen: 0,
        current_page: 0,
        items: [...offset].splice(0, cards_page)
    })

    const dispatch = useDispatch();
    useEffect(() => {
        //Se llaman a las acciones de offset para cargar el listado por default de pokemons
        dispatch(getPokemons())
        dispatch(typesPokemons())
    },[dispatch])

    useEffect(() => {
        //Se llama a la acción de Pokemon Detail
        if(state.boton !== 0){
            dispatch(getPokemonDetail(state.buscador));
            setState({
                ...state,
                alerta: true
            })
        }
    },[state.boton])

    useEffect(() => {
        //Se llama a la acción de Pokemon Detail cuando se da click en alguna imagen de pokemon
        if(state.click_imagen !== 0){
            dispatch(getPokemonDetail(state.pokemon));
        }
    },[state.click_imagen])

    if(pokemon.err && state.alerta === true){
        alert(pokemon.err);
        setState({
            ...state,
            alerta: false,
            buscador: ""
        })
    }else if(pokemon.id && state.direccionar === true){
        redirect();
        setState({
            ...state,
            direccionar: false
        })  
    }
    //Esta función detecta los cambios en el input y envía los cambios al estado del componente
    function handleChange (e){
        
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    //Esta función detecta los cambios en los checkbox
    function handleChangeCheckbox (e){
        console.log(e.target.name);
        console.log(e.target.checked);

        if(e.target.checked === true && (e.target.name === "checkbox_api" || e.target.name === "checkbox_db")){
            setState({
                ...state,
                origen: e.target.value
            })
        }else if(e.target.checked === true && (e.target.name === "checkbox_ascendente" || e.target.name === "checkbox_descendente")){
            setState({
                ...state,
                modo: e.target.value
            })
        }
    }

    console.log("Alerta: ",state.alerta);
    console.log("Pokemon: ",state.pokemon);
    console.log("click_img: ",state.click_imagen);
    console.log("Boton: ",state.boton);
    console.log(state.buscador);
    console.log(state.tipo);
    console.log(state.origen);
    console.log(state.ordenamiento);
    console.log(state.modo);
    console.log(state.items);


    function click(e){
        console.log("name_button: ", e.target.name)
        e.preventDefault();
        if(e.target.name === "boton"){
            setState({
                ...state,
                boton: state.boton + 1,
                direccionar: true
            })
        }else if(e.target.name === "filtro" || e.target.name === "orden"){
            setState({
                ...state,
                boton: state.boton + 1,
            })
        }else if(e.target.name !== "boton" && e.target.name !== "filtro" && e.target.name !== "orden"){
            setState({
                ...state,   
                pokemon: e.target.name,
                click_imagen: state.click_imagen + 1,
                direccionar: true
            })
        }
        console.log(state);
    }   

    return (
        <div className="contenedor_general">
            <div className="encabezado">
                <h1 className="titulo">¿Quién es ese Pokemon?</h1>
                <input className="input" type="text" placeholder="Digite aquí el nombre o ID del Pokemon que desea buscar..." name="buscador" value={state.buscador} onChange={(e) => handleChange(e)}></input>
                <button name="boton" type="button" className="buscar" onClick={(e) => click(e)}>Buscar</button>
            </div>
            <div className="contenedor_piezas">
                <div>
                    <h1 className="titulo_filtro">Filtrar</h1>
                    <div className="caja_filtro">
                        <select className="menu_filtro" name="tipo" onChange={handleChange} value={state.tipo}>
                            <option value="Tipo">Tipo Pokemon</option>
                            {tipos.map((tipo) => {
                                return (
                                    <option value={tipo}>{tipo}</option>
                                )   
                            })}
                        </select>
                    </div>
                    <div className="origen">
                        <input name="checkbox_api" type="checkbox" onChange={handleChangeCheckbox} value="API"/><label className="checkbox" for="checkbox_api">Pokemones Existentes</label>
                    </div>
                    <div className="origen">
                        <input name="checkbox_db" type="checkbox" onChange={handleChangeCheckbox} value="DB"/><label className="checkbox" for="checkbox_db">Creados</label>
                    </div>
                    <button name="filtro" type="button" className="filtrar" onClick={(e) => click(e)}>Filtrar</button>
                </div>
                <div className="contenedor_cards">
                    {/*-------------------- RENDER POKEMONES ------------------------*/}
                    {state.items.map((pokemon) => {
                        return (
                            <div className="card">
                                <Link to={`/pokemon/detalles`}>
                                    <button onClick={(e) => click(e)} className="boton_imagen"><img src={pokemon.imagen} alt="Pokemon" className="imagen_pokemon" name={pokemon.nombre}/></button>
                                </Link>
                                <h2 className="nombre_pokemon">{pokemon.nombre}</h2>
                                <h4 className="tipos_pokemon">Tipos: {pokemon.tipos.join(", ")}.</h4>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h1 className="titulo_ordenamiento">Ordenar</h1>
                    <div className="caja_ordenamiento">
                        <select className="menu_ordenamiento" name="ordenamiento" onChange={handleChange} value={state.ordenamiento}>
                            <option value="Orden">Ordenamiento</option>
                            <option value="alfabético">Por orden alfabético</option>
                            <option value="fuerza">Por fuerza</option>
                        </select>
                    </div>
                    <div className="modo">
                        <input name="checkbox_ascendente" type="checkbox" onChange={handleChangeCheckbox} value="ascedente"/><label className="checkbox_ordenamiento" for="checkbox_ascendente">Orden ascendente</label>
                    </div>
                    <div className="modo">
                        <input name="checkbox_descendente" type="checkbox" onChange={handleChangeCheckbox} value="descendente"/><label className="checkbox_ordenamiento" for="checkbox_descendente">Orden descenente</label>
                    </div>
                    <button name="orden" type="button" className="ordenar" onClick={(e) => click(e)}>Ordenar</button>
                </div>
            </div>
            <div className="contenedor_paginado">
                {state.current_page === 0 ? null: <button className="boton_paginado" onClick={prevPage}>🡰 Anterior</button>}
                {state.current_page === 3 ? null : <button className="boton_paginado" onClick={nextPage}>Siguiente 🡲</button>}
            </div>
        </div>
    );
}

export default Pokedex;