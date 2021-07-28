import './App.css';
import React from "react";
import InitialPage from './components/initialPage.js';
import Pokedex from './components/pokedex.js';
import DetailsPokemon from './components/detailsPokemon.js';
import CreatePokemon from './components/createPokemon.js';
import NavBar from './components/navBar.js';
import { Route } from 'react-router-dom';

function App() {
  
  return (
    <div>

      <Route path="/inicio">
        <InitialPage />
      </Route>

      <Route path="/pokemon">
        <NavBar />
      </Route>

      <Route path="/pokemon/pokedex">
        <Pokedex/>
      </Route>

      <Route path="/pokemon/detalles" >
        <DetailsPokemon />
      </Route>

      <Route path="/pokemon/crear">
        <CreatePokemon />
      </Route>

    </div>
  );
}

export default App;
