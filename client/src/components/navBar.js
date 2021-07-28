import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navBar.css";
import logo from "../images/pokemon.png"

export default function Nav() {

    return(
        <nav className="estilo">
            
            <img className="imagen" src={logo} alt="logo"/>
            
            <div className="indices">
                <Link to="/pokemon/pokedex">Pokedex</Link>
            </div>
            <div className="indices">
                <Link to={`/pokemon/detalles`}>Especificaciones Pokemón</Link>
            </div>
            <div className="indices">
                <Link to="/pokemon/crear">Crear Pokemón</Link>
            </div>
        </nav>
    )
}