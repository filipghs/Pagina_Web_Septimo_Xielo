import React from "react";

/**
 * Hero — Principio S: solo renderiza la sección hero con CTA.
 * No contiene lógica de estado ni efectos secundarios.
 */
export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="inicio" className="hero">
      {/* Grain overlay para textura */}
      <div className="hero-grain" />

      <div className="hero-content">
        <p className="hero-eyebrow">Bogotá · Rooftop Experience</p>

        <h1 className="hero-title">
          Séptimo
          <br />
          <em>Xielo</em>
        </h1>

        <p className="hero-sub">Gastronomía · Vista 360° · Coctelería</p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("reservaciones")}>
            Reservar mesa
          </button>
          <button className="btn-ghost-hero" onClick={() => scrollTo("menu")}>
            Ver el menú
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-hint" onClick={() => scrollTo("menu")}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
