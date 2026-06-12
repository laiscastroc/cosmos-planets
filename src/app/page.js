import PlanetGrid from "@/components/planets/PlanetGrid";
import Hero from "@/components/ui/Hero";
import { getPlanets } from "@/lib/planets";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let planetList = [];
  let errorMessage = "";

  try {
    planetList = await getPlanets();
  } catch (error) {
    errorMessage = "Não foi possível carregar os planetas do banco de dados.";
    console.error(error);
  }

  return (
    <>
      <Hero />
      <section id="planets" style={{ padding: "4rem 0 6rem" }}>
        <div className="container">
          <PlanetGrid planets={planetList} errorMessage={errorMessage} />
        </div>
      </section>
    </>
  );
}
