import { useParams, Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styles from "../Detail/DogDetail.module.css";
import bone from "../../assets/bone.svg";

const backUrl = import.meta.env.VITE_BACKEND_URL;

function DogDetail() {
  const [dogDetail, setDogDetail] = useState({
    name: "",
    temperament: "",
    pesomaximo: "",
    años: "",
    altura: "",
    fotoid: "", // Inicializado con una cadena vacía
  });

  let { id } = useParams();

  useEffect(() => {
    traerDetalles();
  }, []);

  const traerDetalles = async () => {
    try {
      const response = await axios.get(`${backUrl}/dogs/${id}`);
      const imageUrl = await imagenes(id);
      console.log(response);
      console.log(imageUrl);
      setDogDetail({
        name: response.data.name,
        temperament: response.data.temperament || response.data.temperamento,
        altura:
          response.data.heightMax?.metric && response.data.heightMin?.metric
            ? `${response.data.heightMin.metric} - ${response.data.heightMax.metric}`
            : response.data.altura,
        pesomaximo:
          response.data.weightMax?.metric && response.data.weightMin?.metric
            ? `${response.data.weightMin.metric} - ${response.data.weightMax.metric}`
            : response.data.peso,
        años: response.data?.lifeSpan || response.data.años,
        fotoid: imageUrl, 
      });
    } catch (error) {
      console.log(error);
    }
  };

  const imagenes = async (id) => {
    try {
      // const { data } = await axios.get(`https://cdn2.thedogapi.com/images/${dogDetail.reference_image_id}`);
      console.log(data);
      return data.url;
    } catch (error) {
      console.error("Error al cargar la imagen:", error.message, error.response?.data);
      return ""; // En caso de error, devolver una cadena vacía
    }
  };
  
  

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



