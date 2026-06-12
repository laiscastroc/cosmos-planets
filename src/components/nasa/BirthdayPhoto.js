"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./BirthdayPhoto.module.css";

export default function BirthdayPhoto() {
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const minDate = "1995-06-16";
  const maxDate = new Date().toISOString().split("T")[0];

  async function handleSearch() {
    if (!date) return;
    setLoading(true);
    setError(null);
    setPhoto(null);

    try {
      const res = await fetch(`/api/nasa/apod?date=${date}`);
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Erro ao buscar imagem.");
      if(data.media_type === "video") {
        setError("Neste dia a NASA registrou um vídeo, não uma foto. Tente outra data!");
      }else{
        setPhoto(data);
      }
    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>IMAGENS ASTRONÔMICAS PELA NASA</p>
        <h1 className={styles.title}>O que a NASA fotografou<br />no seu aniversário?</h1>
        <p className={styles.sub}>
          Insira sua data de nascimento e descubra a imagem astronômica do dia
          escolhida pelos cientistas da NASA.
        </p>
      </div>
      <div className={styles.form}>
        <input
          type="date"
          value={date}
          min={minDate}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
          aria-label="Data de nascimento"
        />
        <button
          onClick={handleSearch}
          className={styles.btn}
          disabled={loading || !date}
        >
          {loading ? "Buscando…" : "Descobrir"}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {photo && (
        <div className={styles.result}>
          <div className={styles.imageWrap}>
            <Image
              src={photo.hdurl || photo.url}
              alt={photo.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 860px"
              priority
            />
          </div>
          <div className={styles.meta}>
            <p className={styles.photoDate}>{photo.date}</p>
            <h2 className={styles.photoTitle}>{photo.title}</h2>
            {photo.copyright && (
              <p className={styles.copyright}>© {photo.copyright}</p>
            )}
            <p className={styles.explanation}>{photo.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
