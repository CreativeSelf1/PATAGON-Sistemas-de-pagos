import React from "react";
import styles from "./nosotros.module.css";
import fernando1 from "../../assets/fernando1.png";
import fernando2 from "../../assets/fernando2.png";
import miguel from "../../assets/miguel.png";
import seba from "../../assets/seba.png";
import vicente from "../../assets/vicente.png";
import luciano from "../../assets/luciano.png";
import cristobal from "../../assets/cristobal.png";
import felipe from "../../assets/felipe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faLock, faCheckCircle, faBolt, faClock } from "@fortawesome/free-solid-svg-icons";

const Nosotros = () => {
  return (
      <section className={styles.section2}>
        <div className={styles.header}>
          <h1>NOSOTROS SOMOS</h1>
          <h3>Tu Partner en computacion de alto rendimiento</h3>
        </div>
        <div className={styles.parrafos}>
          <div>
            <h2>Misión y Visión</h2>
            <p>Nuestra Misión es más que ofrecer capacidad computacional: queremos ser tu aliado estratégico en Computación de Alto Rendimiento (HPC). Afrontamos tus desafíos de investigación científica y computación intensiva como si fueran nuestros, ofreciéndote soluciones tecnológicas avanzadas, eficientes y adaptadas a tus necesidades.</p>
            <p>Nuestra Visión es brindar un servicio de excelencia en HPC que permita a investigadores, empresas y organizaciones realizar simulaciones y análisis de gran escala. Queremos que tus proyectos científicos y tecnológicos se desarrollen de manera fluida, eficiente y con resultados de alto impacto.</p>
          </div>
          <div>
            <h2>Por que preferirnos</h2>
            <ul>
              <li>Somos un equipo especializado en computación científica, investigación avanzada y desarrollo tecnológico.</li>
              <li>Estamos comprometidos con el éxito de tus proyectos, brindando asesoría personalizada y recursos de última generación.</li>
              <li>Contamos con experiencia en múltiples disciplinas científicas y sectores industriales.</li>
              <li>Ofrecemos un entorno optimizado para cálculos intensivos, garantizando el máximo rendimiento.</li>
              <li>Trabajamos con planificación detallada y seguimiento constante para asegurar el éxito de cada tarea.</li>
              <li>Respaldamos nuestros servicios con acuerdos claros y un enfoque de colaboración duradero.</li>
            </ul>
          </div>
        </div>
        <section className={styles.trustedPartner}>
          <h1>Un aliado seguro</h1>
          <div className={styles.divTexto}>
            <p>Seremos mucho más que otro recurso técnico en tu equipo. </p>
            <p>Porque hacemos nuestros tus desafíos, nos adaptamos a tus necesidades y te brindamos la seguridad de que tus proyectos de investigación y desarrollo estarán en manos confiables, con el soporte y la tecnología de vanguardia del supercomputador Patagón.</p>
          </div>
        </section>

        <section className={styles.values}>
          <h1>Valores</h1>
          <div className={styles.valueItems}>
            <div>
              <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} /> <p>Seguridad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faLock} className={styles.icon} /> <p>Confidencialidad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} /> <p>Confiabilidad</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faBolt} className={styles.icon} /> <p>Eficiencia</p>
            </div>
            <div>
              <FontAwesomeIcon icon={faClock} className={styles.icon} /> <p>Tiempo de respuesta</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h1>Equipo Patagon</h1>
          <div className={styles.patagonMembers}>
            <div className={styles.member}>
              <img src={cristobal} alt="Cristobal Navarro" />
              <span>Cristobal Navarro</span>
            </div>
            <div className={styles.member}>
              <img src={felipe} alt="Felipe Quezada" />
              <span>Felipe Quezada</span>
            </div>
          </div>
          <h1>Equipo de desarrollo de la pagina</h1>
          <div className={styles.teamMembers}>
            <div className={styles.member}>
              <img src={fernando1} alt="Fernando Inzulza" />
              <span>Fernando Inzulza</span>
            </div>
            <div className={styles.member}>
              <img src={seba} alt="Sebastián Pangue" />
              <span>Sebastián Pangue</span>
            </div>
            <div className={styles.member}>
              <img src={miguel} alt="Miguel Ormeño" />
              <span>Miguel Ormeño</span>
            </div>
            <div className={styles.member}>
              <img src={fernando2} alt="Fernando Castillo" />
              <span>Fernando Castillo</span>
            </div>
            <div className={styles.member}>
              <img src={vicente} alt="Vicente Alves" />
              <span>Vicente Alves</span>
            </div>
            <div className={styles.member}>
              <img src={luciano} alt="Luciano Espinoza" />
              <span>Luciano Espinoza</span>
            </div>
          </div>
        </section>
      </section>
  );
}

export default Nosotros;