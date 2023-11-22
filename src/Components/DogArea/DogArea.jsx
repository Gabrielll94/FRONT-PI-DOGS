import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import DogCard from "../Card/DogCard";
import Pagination from "../Pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../Redux/Actions/index";
import styles from "../DogArea/DogArea.module.css";

const imagenes = async (id) => {
  const { data } = await axios.get(`https://api.thedogapi.com/v1/images/${id}`);
  console.log(data);
  return data.url;
};


const DogArea = () => {
  const dispatch = useDispatch();
  let allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs ? allDogs.slice(indexOfFirstDog, indexOfLastDog) : [];

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

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

const DogCardWrapper = ({ dog }) => {
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    const fetchImagen = async () => {
      try {
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


