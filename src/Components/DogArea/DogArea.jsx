import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DogCard from "../Card/DogCard";
import Pagination from "../Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../Redux/Actions/index";
import styles from "../DogArea/DogArea.module.css";

const imagenes = async (id) => {
  const { data } = await axios.get(`https://api.thedogapi.com/v1/images/${id}`);
  return data.url;
};


const DogArea = () => { // Este componente principal utiliza el gancho useDispatch para obtener una función de
  // despacho y el gancho useSelector para obtener el estado de Redux.
  const dispatch = useDispatch();
  // let allDogs = useSelector((state) => state.allDogs);
  let allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(12);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs ? allDogs.slice(indexOfFirstDog, indexOfLastDog) : [];

  const pagination = (pageNumber) => { // Esta función actualiza el estado local currentPagecuando se hace clic
    // en un número de página.
    setCurrentPage(pageNumber);
  };
  // Se realiza una solicitud para obtener datos de perros cuando el componente se monta ( useEffect).
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);


  //Renderiza el componente de paginación y luego mapea sobre la lista de perros actuales para renderizar tarjetas
  // de perros ( DogCardWrapper).
  return (
    <Fragment>
      <div className={styles.dogsArea}>
        <Pagination
          dogsPerPage={dogsPerPage}
          allDogs={allDogs ? allDogs.length : 0}
          pagination={pagination}
          currentPage={currentPage}
        />
        <div className={styles.pagination}></div>
        {currentDogs.map((el) => (
          <DogCardWrapper key={el.id} dog={el} />
        ))}
      </div>
    </Fragment>
  );
};

const DogCardWrapper = ({ dog }) => { // Este componente toma un objeto dogcomo accesorio.
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    const fetchImagen = async () => {
      try {
        console.log(dog);
        const url = await imagenes(dog.image);
        setImagen(url);
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    fetchImagen();
  }, [dog.image]);

  if (!imagen) {
    return null;
  }

  return (
    <DogCard
      key={dog.id}
      id={dog.id}
      name={dog.name}
      image={imagen}
      temperament={dog.temperament}
      temperaments={dog.temperaments}
    />
  );
};

export default DogArea;


