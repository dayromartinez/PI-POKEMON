import React from 'react';
import { useSelector } from 'react-redux';
import "../styles/detailsPokemon.css";

const DetailsPokemon = () => {

    const pokemon_detail = useSelector( state => state.pokemon_detalle);
    console.log("pokemon_detail: ",pokemon_detail);

    return (
        <div className="contenedor_pokemon">
            <div className="card_pokemon">
                <img src={pokemon_detail.imagen} alt="Pokemon" className="imagen_pokemon"/>
                <h2 className="nombre_pokemon_detail">{pokemon_detail.nombre}</h2>
                <h3 className="nombre_pokemon_detail">ID: {pokemon_detail.id}</h3>
                <h3 className="tipos_pokemon">Tipos: {pokemon_detail.tipos.join(", ")}</h3>
                <h4 className="stats_pokemon">Vitalidad: {pokemon_detail.vitalidad}</h4>
                <h4 className="stats_pokemon">Fuerza: {pokemon_detail.fuerza}</h4>
                <h4 className="stats_pokemon">Defensa: {pokemon_detail.defensa}</h4>
                <h4 className="stats_pokemon">Velocidad: {pokemon_detail.velocidad}</h4>
                <h4 className="stats_pokemon">Altura: {pokemon_detail.altura}</h4>
                <h4 className="stats_pokemon">Peso: {pokemon_detail.peso}</h4>
            </div>
        </div>
    );
}

export default DetailsPokemon;