import { Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "../About/About.module.css";
import myPhoto from "../../assets/perfil.jpg";
import { Link } from "react-router-dom";

function About() {
        return (
<Fragment> {/*El componente está envuelto en un fragmento de React ( <elementos>) que se utiliza para agrupar varios
         // elementos sin agregar un nodo adicional al DOM.*/}
<NavBar />
<div className={styles.mainConteinerAbout}>
        <div className={styles.imageDiv}> {/*//información como nombre, función y una breve descripción. */}
<img src={myPhoto} alt="image" />
        </div>
        <h6>Developed by: Gabriel Olivares</h6>
        <h6>
        Full Stack Developer's Student | JavaScript
        </h6>
        <br />
        <p>
        I’m a Full Stack JavaScript developer's Student 
        </p>
        <br />
        <p>
        I started studying programming at Henry in March of this year.
        I am currently presenting this project individually which will allow me to advance in my career and, above all,
        continue acquiring knowledge
        </p>
        <br />
        <p>Skills: CSS, HTML, JavaScript, SQL, React.js, Redux, Sequelize, Express.</p>
        <br />
        <p>I consider myself a person who constantly seeks to improve myself.</p>

        <p>Soft skills: organized, responsible, committed and with a high capacity to solve problems.</p>
        <div className={styles.links}>
<h6>Contact me:</h6>
 <div className={styles.linksItems}> {/*enlaces a los perfiles de GitHub y LinkedIn} */}
        <p>
<a href="https://github.com/Gabrielll94" target='_blank' rel="noreferrer">GitHub</a>
        </p>
        <p>
<a href="https://www.linkedin.com/in/gabriel-olivares-443176232/" target='_blank' rel="noreferrer">
                LinkedIn
</a>
        </p>
        <Link to="/home">
                <button className={`${styles.button_home}`}>Home</button>
        </Link>
        </div>
        </div>
</div>
</Fragment>
);
}

export default About