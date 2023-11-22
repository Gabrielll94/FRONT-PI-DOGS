import React from "react";
import Logo from "../../assets/logoOG.png";
import styles from "../NavBar/NavBar.module.css";
import { Link } from "react-router-dom"; // navegación entre páginas.
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.TitleAndSearchBar}>
        <div className={styles.logoAndTitle}>
          <Link to="/home">
            <img
              id="logoHenry"
              src={Logo}
              alt="a happy dog icon"
              className={styles.logo}
            />
          </Link>
          <div>
            <h1>The dog's World</h1>
          </div>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div className={styles.aboutNavButton}>
        <Link to="/about">About</Link>
      </div>
      <div className={styles.newDogNavButton}>
        <Link to="/newDog/">Create a Dog 🐕🐕🐕🐕</Link>
      </div>
    </div>
  );
};

export default NavBar;


