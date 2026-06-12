import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <p className={styles.eyebrow}>Planetas incomuns do universo</p>
        <h1 className={styles.title}>
          Explore <br />
          <span className={styles.gradient}>Planetas</span>
        </h1>
        <p className={styles.subtitle}>
          Conheça 8 planetas com características únicas e incomuns registrados pela própria Nasa!
        </p>
        <div className={styles.actions}>
          <a href="#planets" className={styles.btnPrimary}>
            Ver planetas
          </a>
          <Link href="/birthday-photo" className={styles.btnSecondary}>
            Foto no meu aniversário
          </Link>
        </div>
      </div>
    </section>
  );
}
