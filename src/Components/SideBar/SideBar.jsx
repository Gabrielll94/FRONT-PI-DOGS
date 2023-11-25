import { React, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  getBreeds,
  orderByWeight
} from "../../Redux/Actions/index";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }
  );
  const allDogs = useSelector((state) => state.allDogs);
  
  const [currentPage, setCurrentPage] = useState(0); // Agregando el estado currentPage

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperamentsList());
    dispatch(getBreeds());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  
  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  }

  const compareWeights = (a, b) => {
    const weightA = a.weightMax
    const weightB = b.weightMax
  
    if (weightA > weightB) {
      return -1;
    }
    if (weightA < weightB) {
      return 1;
    }
    return 0;
  };
  
  const filterByWeight = (e) => {
    const value = e.target.value;
    if (!value) return;
  
    const copyWeightDogs = [...allDogs];
  
    const orderedByWeight = value === 'W-l'
      ? copyWeightDogs.sort((a, b) => compareWeights(a, b))
      : copyWeightDogs.sort((a, b) => compareWeights(b, a));
      console.log(orderedByWeight);
  
    dispatch(orderByWeight(orderedByWeight));
  };
  
  function handleFilterCreated(e) {
    console.log('Filter value:', e.target.value);
    dispatch(filterCreated(e.target.value));
  }
  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }
  return (
    <Fragment>
      <div className={styles.side}>
        <div className={styles.sideBarHeader}>
          <h4 className={styles.header}> Find by filters:</h4>
          <div
            className={styles.tooltip}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            <span className="material-icons refresh">loop</span>
          </div>
        </div>
        <hr />
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by name</h5>
          <select
            onChange={(e) => {
              handleClickOrder(e);
            }}
          >
            <option defaultValue value="all" hidden>
              Order
            </option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Order by weight</h5>
            <select name="weight" onChange={filterByWeight} id="">
        <option value="">Weight</option>
        <option value="L-w">L-w</option>
        <option value="W-l">W-l</option>
      </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by source</h5>
          <select
            onChange={(e) => {
              handleFilterCreated(e);
            }}
          >
            <option defaultValue value="all">
              All Sources 🐶
            </option>
            <option value="created">Yours 🐶</option>
            <option value="inDB">dbase 🐶</option>
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by temperament</h5>
          <select onChange={(e) => handleFilteredByTemp(e)}>
            <option value="all">All Temperaments</option>
            {temperaments.map((temp) => {
              return (
                <option value={temp} key={temp}>
                  {temp}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </Fragment>
  );
}
