import BirthdayPhoto from "@/components/nasa/BirthdayPhoto";

export const metadata = {
  title: "Foto do Seu Aniversário — Cosmos",
  description: "Descubra o que a NASA fotografou no dia em que você nasceu.",
};

export default function BirthdayPage() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem" }}>
      <BirthdayPhoto />
    </div>
  );
}
