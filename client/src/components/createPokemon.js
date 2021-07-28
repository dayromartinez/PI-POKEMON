import React, { useEffect, useState } from 'react';
import { getPokemons } from "../actions/index.js";
import { useDispatch, useSelector } from 'react-redux';
import "../styles/createPokemon.css";

function validate(input) {

    let errors = {};

    if (!input.name) {
        errors.name = 'El nombre es requerido';
    } else if (/[0-9]/.test(input.name)) {
        errors.name = 'El nombre es inválido';
    }
    
    return errors;
};

function post (input) {
    fetch('http://localhost:3001/pokemons', {
        method: 'POST',
        body: JSON.stringify(input),
        headers:{
            'Content-Type': 'application/json'
        }
    })
}

const CreatePokemon = () => {

    const tipos = useSelector( state => state.tipos_pokemons);
    
    const [state, setState] = useState({
        name: "",
        vitalidad: "",
        fuerza: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        imagen: "",
        tipos : [],
        boton: 0
    })

    const [errors, setErrors] = useState({});
    console.log("error_nombre: ",errors);
    console.log("tipos: ",state.tipos);
    console.log("boton: ",state.boton);

    const dispatch = useDispatch();
    useEffect(() => {
        //Se llama a la acción de Pokemon Create 
        if(state.boton !== 0){

            //Se vuelve a cargar el offset para que tenga en cuenta al nuevo pokemon creado
            dispatch(getPokemons());

            //Se resetea el estado general del componente
            setState({
                name: "",
                vitalidad: "",
                fuerza: "",
                defensa: "",
                velocidad: "",
                altura: "",
                peso: "",
                imagen: "",
                tipos : [],
                boton: 0
            })

            console.log(state);
        }
    },[state.boton])

    //Esta función detecta los cambios en los input y envía los cambios al estado del componente
    function handleChange (e){
        
        setState({
            ...state,
            [e.target.name]: e.target.value
            
        })
        console.log(""+e.target.name+": "+e.target.value);
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));
    }

    //Esta función detecta los cambios en los radios
    function handleChangeRadios (e){
        console.log(e.target.name);
        console.log(e.target.checked);

        if(e.target.checked === true){
            setState({
                ...state,
                tipos: [...state.tipos, e.target.value]
            })
        }
    }

    const click = (e) => {
        e.preventDefault();
        if(!errors.name && state.name){
            //Aqui se haria el fetch hacia el post del back para registrar el pokemon a la DB
            post(state);
            
            setState({
                ...state,
                boton: state.boton + 1
            })

            alert("Pokemon creado con éxito!");

        }else{
            alert("No es posible crear el pokemon, tiene que diligenciar adecuadamente los campos");
        }
    }

    return (
        <form onSubmit={click}>
            <div className="formulario">
                <h1 className="titulo_formulario">Añadir Pokemón a la Pokedex</h1>
                <div className="contenedor_input_centrado">
                    <h3 className="label_input_centrado">Nombre</h3>
                    <input id="input_formulario_centrado" name="name" type="text" value={state.name} onChange={(e) => handleChange(e)} className={errors.name && 'danger'} placeholder="Nombre (Obligatorio)"/>
                    {errors.name && (<p className="danger">{errors.name}</p>)}
                </div>
                <div className="contenedor_input">
                    <div>
                        <h3 className="label_input">Vida</h3>
                        <input id="input_formulario" name="vitalidad" type="number" value={state.vitalidad} onChange={(e) => handleChange(e)} placeholder="Vitalidad"/>
                    </div>
                    <div>
                        <h3 className="label_input_intermedio">Fuerza</h3>
                        <input id="input_formulario_intermedio" name="fuerza" type="number" value={state.fuerza} onChange={(e) => handleChange(e)} placeholder="Fuerza"/>
                    </div>
                    <div>
                        <h3 className="label_input_derecha">Defensa</h3>
                        <input id="input_formulario_derecha" name="defensa" type="number" value={state.defensa} onChange={(e) => handleChange(e)} placeholder="Defensa"/>
                    </div>
                </div>
                <div className="contenedor_input">
                    <div>
                        <h3 className="label_velocidad">Velocidad</h3>
                        <input id="input_formulario" name="velocidad" type="number" value={state.velocidad} onChange={(e) => handleChange(e)} placeholder="Velocidad"/>
                    </div>
                    <div>
                        <h3 className="label_altura">Altura</h3>
                        <input id="input_formulario_intermedio" name="altura" type="number" value={state.altura} onChange={(e) => handleChange(e)} placeholder="Altura"/>
                    </div>
                    <div>
                        <h3 className="label_peso">Peso</h3>
                        <input id="input_formulario_derecha" name="peso" type="number" value={state.peso} onChange={(e) => handleChange(e)} placeholder="Peso"/>
                    </div>
                </div>
                <div className="contenedor_input_centrado">
                        <h3 className="label_input_centrado">Imagen</h3>
                        <input id="input_formulario_centrado" name="imagen" type="text" placeholder="URL Imagen Pokemón" value={state.imagen} onChange={(e) => handleChange(e)}/>
                </div>
                <div className="inputs_tipos">
                    <h2 className="titulo_tipos">Tipos</h2>
                    <div className="lista_radios">
                        {tipos.map((tipo) => {
                            return (
                                <div>
                                    <input name={tipo} type="radio" value={tipo} onChange={handleChangeRadios} className="radio_tipos"/><label className="label_tipos" for={tipo}>{tipo}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button type="submit" name="boton" className="boton_crear">Añadir Pokemón</button>
            </div>
        </form>
    );
}

export default CreatePokemon;