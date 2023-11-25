import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "../Card/DogCard.module.css";

//Este componente DogCard es una tarjeta que representa a un perro y muestra su nombre, temperamento (o temperamentos)
const DogCard = ({ id, name, image, temperament, temperaments }) => { // Toma desestructurados los props
        // (id, name, image, temperament, temperaments) como argumentos
  const displayTemperament = () => {
    if (temperament) { // Si temperament está presente, muestra un <h5> con la clase de estilo correspondiente
      return <h5 className={styles.dogTemp}>{temperament}</h5>;
    } else if (temperaments && temperaments.length > 0) { 
      return (
        <h5 className={styles.dogTemp}>
          {temperaments.map((temp) => temp.name).join(", ")}
        </h5>
      );
    } else { // Si no hay información de temperamento, devuelve un salto de línea (<br />)
      return <br />;
    }
  };

  return (
    <Fragment>
      <div className={styles.dogCard}>
        <Link to={`/dogs/${id}`}> {/*Se utiliza el componente Link de React Router para crear un enlace a la ruta
         correspondiente a través de /dogs/${id}. */}
          <div className={styles.titleArea}>
            <h4 className={styles.dogName}>{name}</h4>
          </div>
          <div className={styles.infoArea}>
            <div className={styles.tempArea}>{displayTemperament()}</div> {/*Se utiliza la función displayTemperament
             para renderizar la sección de temperamento de manera dinámica. */}
            <div className={styles.imageArea}>
              <img
                className={styles.dogImage}
                src={image}
                alt={`A dog ${temperament || "with multiple temperaments"}`}
                height="140px"
              />
            </div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default DogCard;

