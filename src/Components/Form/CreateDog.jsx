//Biblioteca principal para crear componentes de interfaz de usuario en React.
// useState: gestiona el estado en componentes funcionales.
// useEffect: manejo de efectos secundarios en componentes funcionales.
// Fragment: una sintaxis ligera para agrupar varios elementos sin agregar nodos adicionales al DOM.
import React, { useState, useEffect, Fragment } from "react";
// useDispatch: Hook para enviar acciones en Redux.
// useSelector: extrae datos de la tienda Redux.
import { useDispatch, useSelector } from "react-redux";
// usado para navegación sin actualizar la página
import { Link, useNavigate } from "react-router-dom";
import {postDog, getTemperamentsList} from "../../Redux/Actions/index"
import styles from "../Form/CreateDog.module.css";

function validateForm(input) { // comprueba varios campos de entrada y devuelve errores
  let errors = {};

  // NAME
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }

  // WEIGHTS
  if (!input.weight_min) {
    errors.weight_min = "Type a valid minimal weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_min)) {
    errors.weight_min = "Weight must have min values. Example: '25'";
  } else {
    errors.weight_min = "";
  }
  if (!input.weight_max) {
    errors.weight_max = "Type a valid maxim weight number";
  } else if (!/\d{1,2}/gi.test(input.weight_max)) {
    errors.weight_max = "Weight must have max values. Example: '25'";
  } else {
    errors.weight_max = "";
  }

  // HEIGHTS
  if (!input.height_min) {
    errors.height_min = "Type a valid minimal height number";
  } else if (!/\d{1,2}/gi.test(input.height_min)) {
    errors.height_min = "Height must have min values. Example: '25'";
  } else {
    errors.height_min = "";
  }
  if (!input.height_max) {
    errors.height_max = "Type a valid maxim height number";
  } else if (!/\d{1,2}/gi.test(input.height_max)) {
    errors.height_max = "Height must have max values. Example: '25'";
  } else {
    errors.height_max = "";
  }

  return errors;
}
// este componente es un formulario para crear un perro, con varios campos de entrada, validación y navegación mediante
// React Router. Interactúa con Redux para realizar acciones relacionadas con la obtención de temperamentos y la
// publicación de datos de perros. 
function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments) || [];

  const sortedTemperaments = [...temperaments].sort((a, b) => (a.name || "").localeCompare(b.name || ""));


  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    image: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    temperament: [],
  });
// Funciones para manejar cambios de entrada de formulario, selección de temperamento, eliminación de temperamento
// y envío de formulario
function handleChange(e) {
  const { name, value } = e.target;
  setInput((prevInput) => ({
    ...prevInput,
    [name]: value,
  }));
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: validateForm({ ...input, [name]: value })[name],
  }));
}

  function handleSelect(e) {
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, e.target.value],
    }));
  }

  function handleDelete(el) { // maneja la eliminación de temperamentos seleccionados y actualiza el estado
    setInput((prevInput) => ({
      ...prevInput,
      temperament: prevInput.temperament.filter((temp) => temp !== el),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm(input);

    if (Object.values(formErrors).every((error) => error === "")) {
      alert("Your dog has been created successfully");
      dispatch(postDog(input));
      setInput({
        name: "",
        image: "",
        height_min: "",
        weight_min: "",
        height_max: "",
        weight_max: "",
        life_span: "",
        temperament: [],
      });
      navigate("/home");
    } else {
      alert("Something went wrong. Please check your inputs and try again.");
    }
  }

  useEffect(() => {
    dispatch(getTemperamentsList());
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.mainContainerCreation}>
        <div>
          <h2>Create your Dog</h2>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.Section}>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Grand Canadian Bulldog"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.name}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Image URL:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                placeholder="http://myimageontheweb.com"
                onChange={(e) => handleChange(e)}
              />
              <div>
                <p className={styles.error}>{errors.image}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Heights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.height_min}
                name="height_min"
                placeholder="20"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.height_max}
                name="height_max"
                placeholder="50"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.height_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <h4>Weights</h4>
              <label>Min</label>
              <input
                type="number"
                value={input.weight_min}
                name="weight_min"
                placeholder="15"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_min}</p>
              </div>
              <label>Max</label>
              <input
                type="number"
                value={input.weight_max}
                name="weight_max"
                placeholder="32"
                onChange={(e) => handleChange(e)}
                required
              />
              <div>
                <p className={styles.error}>{errors.weight_max}</p>
              </div>
            </div>
            <div className={styles.Section}>
              <label>Life Span</label>
              <input
                type="text"
                value={input.life_span}
                name="life_span"
                placeholder="12 - 15 years"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={styles.Section}>
              <label>Temperaments</label>
              <select onChange={(e) => handleSelect(e)} className={styles.styled_select}>
  {sortedTemperaments.map((temp) => (
    <option key={temp} value={temp}>
      {temp || 'default'}
    </option>
  ))}
</select>

              <div className={styles.sidebar_box}>
                <h4>You have selected that:</h4>
                {input.temperament.map((el) => (
                  <div key={el} className={styles.selectedItems}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttonSection}>
              <Link to="/home">
                <button className={styles.buttonCancel}>Cancel</button>
              </Link>
              <button className={styles.button} type="submit">
                Create 🐕
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
export default CreateDog;
