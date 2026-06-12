"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./NasaGallery.module.css";

const PRESETS = ["Sistema Solar", "Marte", "Luas", "Saturno", "Nebulosas", "Buracos Negros", "Hubble", "Júpiter"];

export default function NasaGallery() {
  const [query, setQuery] = useState("Solar System");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const fetchImages = useCallback(async (q, p) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/nasa/gallery?q=${encodeURIComponent(q)}&page=${p}`);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    }catch{
      setItems([]);
    }finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(query, page);
  }, [query, page, fetchImages]);

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    fetchImages(query, 1);
  }

  const totalPages = Math.ceil(total / 12);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>GALERIA ASTRONÔMICA NASA</p>
        <h1 className={styles.title}>Galeria astronômica</h1>
        <p className={styles.sub}>Explore o acervo fotográfico da NASA. Se quiser mais resultados, insira em inglês.</p>
      </div>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar imagens… ex: Marte, Mars"
          className={styles.input}
          aria-label="Buscar imagens"
        />
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "…" : "Buscar"}
        </button>
      </form>
      <div className={styles.presets}>
        {PRESETS.map((p) => (
          <button
            key={p}
            className={`${styles.preset} ${query === p ? styles.presetActive : ""}`}
            onClick={() => { setQuery(p); setPage(1); }}
          >
            {p}
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Buscando imagens…</p>
        </div>
      ) : (
        <>
          {total > 0 && (
            <p className={styles.count}>{total.toLocaleString("pt-BR")} resultados para "{query}"</p>
          )}
          <div className={styles.grid}>
            {items.map((item) => (
              <GalleryItem key={item.id} item={item} onClick={() => setLightbox(item)} />
            ))}
          </div>


          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={styles.pageBtn}
              >
                ← Anterior
              </button>
              <span className={styles.pageInfo}>{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={styles.pageBtn}
              >
                Próximo →
              </button>
            </div>
          )}
        </>
      )}

      {lightbox && (
        <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

function GalleryItem({ item, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button className={styles.item} onClick={onClick} aria-label={item.title}>
      {item.thumb && !imgError ? (
        <div className={styles.imgWrap}>
          <Image
            src={item.thumb}
            alt={item.title || "NASA image"}
            fill
            className={styles.img}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className={`${styles.imgWrap} ${styles.placeholder}`}>
          <span>✦</span>
        </div>
      )}
      <div className={styles.itemMeta}>
        <p className={styles.itemTitle}>{item.title}</p>
        {item.date && (
          <p className={styles.itemDate}>{new Date(item.date).getFullYear()}</p>
        )}
      </div>
    </button>
  );
}

function Lightbox({ item, onClose }) {
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
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.lightbox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.lbClose} onClick={onClose} aria-label="Fechar">✕</button>
        {item.thumb && (
          <div className={styles.lbImgWrap}>
            <Image src={item.thumb} alt={item.title} fill className={styles.lbImg} sizes="(max-width: 768px) 100vw, 800px" />
          </div>
        )}
        <div className={styles.lbMeta}>
          <p className={styles.lbDate}>{item.date ? new Date(item.date).toLocaleDateString("pt-BR") : ""}</p>
          <h3 className={styles.lbTitle}>{item.title}</h3>
          {item.photographer && <p className={styles.lbPhotographer}>Foto: {item.photographer}</p>}
          {item.description && (
            <p className={styles.lbDesc}>
              {item.description.length > 400 ? item.description.slice(0, 400) + "…" : item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
