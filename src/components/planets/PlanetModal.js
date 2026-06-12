"use client";

import { useEffect } from "react";
import styles from "./PlanetModal.module.css";

export default function PlanetModal({ planet, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Fechar">✕</button>

        <div className={styles.header}>
          {planet.imgUrl ? (
            <img className={styles.image} src={planet.imgUrl} alt={planet.name} />
          ) : (
            <div
              className={styles.orb}
              style={{
                background: planet.visualStyle,
                boxShadow: `0 0 60px ${planet.glowColor}55, 0 0 120px ${planet.glowColor}22`,
              }}
            />
          )}
          <div className={styles.headerText}>
            <span className={styles.curiosity}>{planet.curiosityTag}</span>
            <h2 className={styles.name}>{planet.name}</h2>
            <p className={styles.system}>{planet.starSystem}</p>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>{planet.description}</p>

          <div className={styles.statsGrid}>
            <StatItem label="Tipo" value={planet.type} />
            <StatItem label="Distância da Terra" value={planet.distanceFromSun} />
            <StatItem label="Temperatura Média" value={`${planet.surfaceTemp.toLocaleString("pt-BR")}°C`} />
            <StatItem label="Período Orbital" value={`${planet.orbitalPeriod} anos`} />
            {planet.diameter && (
              <StatItem label="Diâmetro" value={`${planet.diameter.toLocaleString("pt-BR")} km`} />
            )}
            {planet.moons !== undefined && (
              <StatItem label="Luas conhecidas" value={planet.moons} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}
