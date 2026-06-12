"use client";

import { useRef, useState } from "react";
import PlanetCard from "./PlanetCard";
import PlanetModal from "./PlanetModal";
import styles from "./PlanetGrid.module.css";

export default function PlanetGrid({ planets = [], errorMessage = "" }) {
  const [selected, setSelected] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const hasPlanets = planets.length > 0;

  function moveCarousel(direction) {
    if(!hasPlanets) return;
    const nextIndex =
      direction === "next"
        ? (activeIndex + 1) % planets.length
        : (activeIndex - 1 + planets.length) % planets.length;

    setActiveIndex(nextIndex);
    trackRef.current?.children[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Os planetas mais incomuns do universo!</h2>
        <p className={styles.sub}>
          {planets.length} exoplanetas reais com características únicas.
        </p>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {!errorMessage && !hasPlanets && (
        <p className={styles.empty}>Nenhum planeta encontrado no banco de dados.</p>
      )}

      {hasPlanets && (
        <div className={styles.carousel} aria-label="Carrossel de planetas">
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            type="button"
            onClick={() => moveCarousel("prev")}
            aria-label="Ver planeta anterior"
          >
            <span aria-hidden="true">&larr;</span>
          </button>

          <div className={styles.viewport}>
            <div className={styles.track} ref={trackRef}>
              {planets.map((planet, i) => (
                <div className={styles.slide} key={planet.id}>
                  <PlanetCard
                    planet={planet}
                    index={i}
                    onClick={() => setSelected(planet)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            type="button"
            onClick={() => moveCarousel("next")}
            aria-label="Ver próximo planeta"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      )}

      {selected && (
        <PlanetModal planet={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
