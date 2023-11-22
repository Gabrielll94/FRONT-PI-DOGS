import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../Redux/Actions/index";
import styles from "../SearchBar/SearchBar.module.css";

// Este componente proporciona una interfaz de usuario para buscar perros por nombre.
export default function SearchBar() {
    const [dogState, setDogsState] = useState("");
    const dispatch = useDispatch(); //Obtiene la función dispatch del Hook useDispatch para poder despachar acciones Redux.

    function handleClick(e) {
    e.preventDefault();
    
    if (dogState.length === 0) {
    return alert("Please input a name to start the search");
    } else { // Si hay un nombre ingresado, se despacha una acción Redux llamada getDogsByName con el nombre como argumento. 
    dispatch(getDogsByName(dogState));
    setDogsState("");
    }
    }

    return (
    <div className={styles.searchBarObject}>
    <input
        type="text"
        placeholder="Search a dog..."
        className={styles.input}
        value={dogState}
        onChange={(e) => setDogsState(e.target.value)} // El valor del input es controlado por el estado local dogState,
        // y su cambio se maneja a través del evento onChange que actualiza el estado con el valor del input.
    />
    <button type="submit" onClick={handleClick}>
        <span className="material-icons">search</span>
    </button>
    </div>
    );
}

