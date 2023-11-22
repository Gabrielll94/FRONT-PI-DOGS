import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import Dog from "../../assets/perro.jpg"
import styles from '../Landing/Landing.module.css'

function LandingContainer(){
    return(
        <Fragment>
            <div className={styles.hero}>
                <h1 className={styles.title}>Welcome to Dog's World</h1>
                <Link to='/home'>
                    <button className={styles.bubblyButton}>Home</button>
                </Link>
                <div className={styles.imageDiv}>
                    <img src={Dog} alt="image" />
                </div>
                <Link to='/about'>
                    <button className={styles.bubblyButton}>About</button>
                </Link>
            </div>
        </Fragment>
    )
}

    export default LandingContainer;