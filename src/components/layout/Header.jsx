import React, { useState, useEffect } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "menu", label: "Menú" },
  { id: "reservaciones", label: "Reservar" },
  { id: "galeria", label: "Galería" },
  { id: "contacto", label: "Contacto" },
];

/**
 * Header
 * Principio S: responsabilidad única — navegación y branding del sitio.
 * No gestiona lógica de negocio ni estado de otras secciones.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="logo" onClick={() => scrollTo("inicio")}>
          Séptimo Xielo
        </div>

        <nav className="nav-desktop">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeId === item.id ? "nav-link-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="hamburger"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Menú"
        >
          <span className={mobileOpen ? "ham-open" : ""} />
          <span className={mobileOpen ? "ham-open" : ""} />
          <span className={mobileOpen ? "ham-open" : ""} />
        </button>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="mobile-nav-link"
          >
            {item.label}
          </button>
        ))}
        <a
          href="/admin"
          className="mobile-admin-link"
          onClick={() => setMobileOpen(false)}
        >
          Admin
        </a>
      </div>
    </>
  );
}
