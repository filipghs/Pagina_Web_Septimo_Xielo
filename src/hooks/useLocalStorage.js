import { useState, useEffect } from "react";

/**
 * useLocalStorage
 * Principio S: responsabilidad única — sincronizar estado React ↔ localStorage.
 * Principio D: los componentes dependen de este hook, no de localStorage directamente.
 *
 * @param {string} key  — clave en localStorage
 * @param {*} initial   — valor inicial/seed si no hay dato guardado
 * @returns [value, setValue] — igual que useState
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage puede estar bloqueado (modo privado, cuota llena)
      console.warn(`useLocalStorage: no se pudo persistir "${key}"`);
    }
  }, [key, value]);

  return [value, setValue];
}
