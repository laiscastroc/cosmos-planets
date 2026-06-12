import { sql } from "./db";
import { unstable_noStore as noStore } from "next/cache";

function toDistanceText(value) {
  if (value === null || value === undefined || value === "") {
    return "Distancia nao informada";
  }

  return typeof value === "number" ? `${value} UA` : value;
}

function toShortDescription(description) {
  if (!description) return "Planeta cadastrado no banco de dados Neon.";
  return description.length > 130 ? `${description.slice(0, 127)}...` : description;
}

function toPublicImagePath(value) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  return `/${value}`;
}

export function normalizePlanet(row) {
  const glowColor = row.glow_color || row.color || "#5b9cf6";

  return {
    id: row.id,
    name: row.name,
    type: row.type || "Exoplaneta",
    starSystem: row.star_system || row.starSystem || "Sistema não informado",
    distanceFromSun: toDistanceText(row.distance_from_sun ?? row.distanceFromSun),
    diameter: row.diameter,
    moons: row.moons ?? 0,
    orbitalPeriod: row.orbital_period ?? row.orbitalPeriod ?? 0,
    surfaceTemp: row.surface_temp ?? row.surfaceTemp ?? 0,
    description: row.description || "Sem descrição cadastrada.",
    shortDesc: row.short_desc || row.shortDesc || toShortDescription(row.description),
    curiosityTag: row.curiosity_tag || row.curiosityTag || row.type || "Planeta",
    glowColor,
    visualStyle:
      row.visual_style ||
      row.visualStyle ||
      `radial-gradient(circle at 38% 32%, #ffffff, ${glowColor} 48%, #111827 78%)`,
    hasRings: row.has_rings ?? row.hasRings ?? false,
    imgUrl: toPublicImagePath(row.img_url || row.imgUrl),
  };
}

export async function getPlanets() {
  noStore();
  const rows = await sql`select * from planets order by id`;
  return rows.map(normalizePlanet);
}
