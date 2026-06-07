import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import Menu from "../components/sections/Menu";
import Reservations from "../components/sections/Reservations";
import Gallery from "../components/sections/Gallery";
import Contact from "../components/sections/Contact";

/**
 * PublicPage
 * Principio S: su única responsabilidad es componer las secciones públicas.
 * No contiene lógica de negocio — cada sección la gestiona internamente.
 * Principio O: agregar una nueva sección = importar y agregar un elemento JSX.
 */
export default function PublicPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Reservations />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
