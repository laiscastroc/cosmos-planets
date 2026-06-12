import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>✦ Cosmos</span>
        <p className={styles.text}>
          Dados fornecidos pela {" "}
          <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            NASA Open APIs
          </a>
            <br />
            Desenvolvido por Laís C. | www.linkedin.com/in/laís-castro
        </p>
      </div>
    </footer>
  );
}
