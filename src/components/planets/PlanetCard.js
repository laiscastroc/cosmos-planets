import styles from "./PlanetCard.module.css";

export default function PlanetCard({ planet, index, onClick }) {
  return (
    <button
      className={styles.card}
      onClick={onClick}
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={`Ver detalhes de ${planet.name}`}
    >
      <div className={styles.visual}>
        {planet.imgUrl ? (
          <img
            className={styles.image}
            src={planet.imgUrl}
            alt={planet.name}
          />
        ) : (
          <>
            <div
              className={styles.planet}
              style={{
                background: planet.visualStyle,
                boxShadow: `0 0 36px ${planet.glowColor}55, 0 0 72px ${planet.glowColor}22`,
              }}
            />
            {planet.hasRings && <div className={styles.rings} style={{ borderColor: `${planet.glowColor}66` }} />}
          </>
        )}
      </div>
      <div className={styles.curiosityWrap}>
        <span className={styles.curiosityBadge} style={{ background: `${planet.glowColor}22`, color: planet.glowColor, borderColor: `${planet.glowColor}44` }}>
          {planet.curiosityTag}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{planet.name}</h3>
        <p className={styles.system}>{planet.starSystem}</p>
        <p className={styles.desc}>{planet.shortDesc}</p>

        <div className={styles.stats}>
          <Stat label="Tipo" value={planet.type} />
          <Stat label="Distância" value={planet.distanceFromSun} />
          <Stat label="Temp." value={`${planet.surfaceTemp}°C`} />
        </div>
      </div>
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}
