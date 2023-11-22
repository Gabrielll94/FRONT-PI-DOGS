import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperamentsList, getBreeds } from "../../Redux/Actions/index";
import SideBar from "../SideBar/SideBar";
import DogArea from "../DogArea/DogArea";
import NavBar from "../NavBar/NavBar";
import styles from '../Home/Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const allTemperaments = useSelector((state) => state.allTemperaments);
  const allBreeds = useSelector((state) => state.allBreeds);

  useEffect(() => {
    // Use async function inside useEffect to handle asynchronous operations
    const fetchData = async () => {
      await dispatch(getDogs());
      dispatch(getTemperamentsList());
      dispatch(getBreeds());
    };

    fetchData();

    // Add dependencies to the dependency array if needed
  }, [dispatch]);

  return (
    <Fragment>
      <div className={styles.mainContainer}>
        <NavBar />
        <SideBar />
        <DogArea />
      </div>
    </Fragment>
  );
}

