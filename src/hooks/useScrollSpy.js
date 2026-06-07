import { useState, useEffect } from "react";

/**
 * useScrollSpy
 * Principio S: responsabilidad única — detectar qué sección está visible.
 * Usa IntersectionObserver (más eficiente que comparar scrollY + offsetTop).
 *
 * @param {string[]} sectionIds — IDs de las secciones a observar
 * @returns {string} activeId — ID de la sección actualmente visible
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeId;
}
