import React, { useState } from "react";
import { Divider, SectionLabel } from "../ui/UIComponents";

// Imágenes de galería — en producción vendrían de un CMS o del state
const GALLERY_ITEMS = [
  { id: 1, src: "/Images/galeria_1.jpg", alt: "Ambiente rooftop", label: "Terraza" },
  { id: 2, src: "/Images/galeria_2.jpg", alt: "Cocina abierta", label: "Cocina" },
  { id: 3, src: "/Images/galeria_3.jpg", alt: "Platos signature", label: "Gastronomía" },
];

/**
 * Gallery — Principio S: solo renderiza la galería de imágenes.
 */
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="galeria" className="section section-alt">
      <div className="container">
        <SectionLabel>Nuestra atmósfera</SectionLabel>
        <h2 className="section-title">Galería</h2>
        <Divider />

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((img) => (
            <div
              key={img.id}
              className={`gallery-item ${img.id === 1 ? "gallery-item-tall" : ""}`}
              onClick={() => setLightbox(img)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.src} alt={lightbox.alt} className="lightbox-img" />
          <p className="lightbox-caption">{lightbox.label}</p>
        </div>
      )}
    </section>
  );
}
