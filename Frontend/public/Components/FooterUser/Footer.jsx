import React from 'react';
import styles from './Footer.module.css';  // Importación del CSS como módulo

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Escudo_uaustralchile.png" alt="Logo UACh" />
        </div>
        <div className={styles.footerLinks}>
          <ul>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/privacy">Política de privacidad</a></li>
            <li><a href="/terms">Términos y condiciones</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Universidad Austral de Chile. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;