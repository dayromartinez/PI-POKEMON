import React, { useEffect } from 'react';
import { typesPokemons, getPokemons } from "../actions/index.js";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "../styles/initialPage.css";


const InitialPage = () => {

    let history = useHistory();

    const redirect = () => {
        history.push('/pokemon/pokedex')
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
        //Se llaman a las acciones de offset para cargar los estados fundamentales para la ruta principal
        dispatch(getPokemons())
        dispatch(typesPokemons())
    },[dispatch])

    return (<div className="inicio">
        <button name="boton_inicio" onClick={redirect} className="boton">¡Bienvenide!</button>
    </div>);
}

export default InitialPage;