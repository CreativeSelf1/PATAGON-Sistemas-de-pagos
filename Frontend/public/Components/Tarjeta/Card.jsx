import React from "react";
import styles from "./Card.module.css"; // Importa tu archivo de estilos como módulo

const Card = ({ nombre, tiempo, detalles, precio, onBuyClick, ram, delay }) => {
  return (
    <div className={styles.bolsaCard} style={{ animationDelay: delay }}>
      <div className={styles.bolsaLeft}>
        <p className={styles.nombre}>{nombre}</p>
        <ul className={styles.bolsaDetails}>
          {detalles.map((detalle, i) => (
            <li key={i}>{detalle}</li>
          ))}
          <br></br>
          <li>{ram}</li>
        </ul>
      </div>

      <div className={styles.bolsaRight}>
        <div className={styles.headerRight}>
          <p className={styles.tiempo}>{tiempo}</p>
          <p className={styles.price}>{precio}</p>
        </div>
        <button className={styles.botonCompra} onClick={onBuyClick}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
