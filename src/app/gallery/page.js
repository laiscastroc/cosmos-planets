import NasaGallery from "@/components/nasa/NasaGallery";

export const metadata = {
  title: "Galeria NASA — Cosmos",
  description: "Imagens da NASA Image and Video Library.",
};

export default function GalleryPage() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem" }}>
      <NasaGallery />
    </div>
  );
}
