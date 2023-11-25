import { React, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByWeight } from '../../utils/utils';
import {
  getDogs,
  getTemperamentsList,
  filterDogsByTemperament,
  orderByName,
  filterCreated,
  getBreeds,
  getDogsByBreed,
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
  const allDogs = useSelector((state) => state.dogs);
  const breeds = useSelector((state) => state.breeds);
  
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
    const weightA = a.weight?.metric
      ? parseInt(a.weight.metric.split(' ')[0])
      : parseInt(a.weight);
    const weightB = b.weight?.metric
      ? parseInt(b.weight.metric.split(' ')[0])
      : parseInt(b.weight);
  
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
  
    dispatch(orderByWeight(orderedByWeight));
  };
  
  
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
  }
  function handleFilteredByBreed(e) {
    e.preventDefault();
    dispatch(getDogsByBreed(e.target.value));
  }
  // function handleFilteredMAXWeight(e) {
  //   e.preventDefault();
  //   dispatch(filterDogsByMAXWeight(e.target.value));
  // }
  // function handleFilteredMINWeight(e) {
  //   e.preventDefault();
  //   dispatch(filterDogsByMINWeight(e.target.value));
  // }
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
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by breed</h5>
          <select onChange={(e) => handleFilteredByBreed(e)}>
            <option value="all">All Breeds</option>
            {breeds.map((breed) => {
              return breed ? (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        {/* <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by max weight</h5>
          <select onChange={(e) => handleFilteredMAXWeight(e)}>
            <option value="all">All Weights</option>
            {allDogsMaxWeights.map((maxWeight) => {
              return maxWeight ? (
                <option value={maxWeight} key={maxWeight}>
                  {maxWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div>
        <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Filter by min weight</h5>
          <select onChange={(e) => handleFilteredMINWeight(e)}>
            <option value="all">All Weights</option>
            {allDogsMinWeights.map((minWeight) => {
              return minWeight ? (
                <option value={minWeight} key={minWeight}>
                  {minWeight} kg
                </option>
              ) : (
                ""
              );
            })}
          </select>
        </div> */}
        {/* <div className={styles.filterSection}>
          <h5 className={styles.filterHeader}>Add a Dog</h5>
          <div className={styles.addDog}>
            <Link to="/newDog/" className={styles.tooltip}>
              <span className="material-icons">add_circle</span>
              <span className={styles.tooltiptext}>Add your Dog 🐕🐕🐕🐕</span>
            </Link>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}
