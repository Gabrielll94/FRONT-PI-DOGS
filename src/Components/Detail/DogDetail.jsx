// Ganchos de enrutador React:
import { useParams, Link } from "react-router-dom";
// Ganchos de react:
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "../Detail/DogDetail.module.css";
import bone from "../../assets/bone.svg";

const backUrl = import.meta.env.VITE_BACKEND_URL;

function DogDetail() { // Estado que almacena detalles sobre una raza de perro, inicializado con valores predeterminados.
  const [dogDetail, setDogDetail] = useState({
    name: "",
    temperament: "",
    pesomaximo: "",
    años: "",
    altura: "",
    fotoid: "", 
  });

  let { id } = useParams(); // Usa useParamspara obtener el parámetro idde la URL.

  useEffect(() => { //Utilice useEffectpara llamar a la función traerDetalles cuando el componente se monta.
    traerDetalles();
  }, []);

  const traerDetalles = async () => {
    try {
      // Realice una solicitud a la API del backend utilizando Axios para obtener detalles sobre una
      // raza de perro específica.
      const response = await axios.get(`${backUrl}/dogs/${id}`);
      const imageUrl = await imagenes(response.data.reference_image_id);
      console.log(response);
      console.log(imageUrl);
      setDogDetail({ // Actualiza el estado dogDetail con la información obtenida.
        name: response.data.name, 
        temperament: response.data.temperament || response.data.temperamento,
        altura:
        (response.data.heightMax && response.data.heightMin &&
          response.data.heightMax.metric && response.data.heightMin.metric)
          ? `${response.data.heightMin.metric} - ${response.data.heightMax.metric}`
          : response.data.altura || "N/A",
      pesomaximo:
        (response.data.weightMax && response.data.weightMin &&
          response.data.weightMax.metric && response.data.weightMin.metric)
          ? `${response.data.weightMin.metric} - ${response.data.weightMax.metric}`
          : response.data.peso || "N/A",
      años: response.data?.lifeSpan || response.data.años || "N/A",
      fotoid: imageUrl,
    });
    } catch (error) {
      console.log(error);
    }
  };
  // Realice una solicitud a la API para obtener la URL de la imagen de referencia de una raza de perro.
  const imagenes = async (referenceImageId) => {
    try {
      const { data } = await axios.get(`https://cdn2.thedogapi.com/images/${referenceImageId}`);
      console.log(data);
      return data.url || ""; // Check if data.url is defined, otherwise return an empty string
    } catch (error) {
      console.error("Error al cargar la imagen:", error.message, error.response?.data);
      return "";
    }
  };
  
  
// Renderización del componente:
  return (
    <Fragment>
      {dogDetail.name ? (
        <div key={dogDetail.id} className={styles.bodix}>
          <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>{dogDetail.name}</h2>
            <img
              src={dogDetail.fotoid}
              alt={dogDetail.name}
              className={styles.image}
            />
            <div className={styles.detailsContainer}>
              <div className={styles.life_span}>
                <div className={styles.infoSection}>
                  <h3>Life span: </h3>
                  <p>{dogDetail.años}</p>
                </div>
              </div>
              <div className={styles.weights}>
                <div className={styles.infoSection}>
                  <h3>Weight: </h3>
                  <p>Min-Max: {dogDetail.pesomaximo}</p>
                </div>
              </div>
              <div className={styles.heights}>
                <div className={styles.imageSection}>
                  <img
                    src={bone}
                    alt="a tiny svg bone"
                    className={styles.detailsSVG}
                  />
                </div>
                <div className={styles.infoSection}>
                  <h3>Height: </h3>
                  <p>Min-Max: {dogDetail.altura}</p>
                </div>
              </div>
              <br />
                <div className={styles.temperament}>
                  <div className={styles.infoSection}>
                    {
                      <div>
                        <h3>Temperament: </h3>
                        <p>
                          {dogDetail.createdInDB
                            ? dogDetail.temperaments.map((el) => el.name).join(", ")
                            : dogDetail.temperament}
                        </p>
                      </div>
                    }
                  </div>
                </div>
            </div>
            <Link to="/home">
              <button className={styles.button}>Back</button>
            </Link>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Fragment>
  );
}

export default DogDetail;



