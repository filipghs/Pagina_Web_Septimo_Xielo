import { createContext, useContext, useReducer, useEffect, useState } from "react";
import {
  fetchMenu, insertMenuItem, updateMenuItem, deleteMenuItem, toggleMenuItem,
  fetchReservations, insertReservation, updateReservationStatus, deleteReservation,
  fetchContact, updateContact,
} from "../lib/dataService";
import { INITIAL_CONTACT } from "../data/initialData";

// ─── Contexto ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [menu,         setMenu]         = useState([]);
  const [reservations, setReservations] = useState([]);
  const [contact,      setContact]      = useState(INITIAL_CONTACT);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  // Cargar datos desde Supabase al montar
  useEffect(() => {
    async function loadAll() {
      try {
        const [menuData, resData, contactData] = await Promise.all([
          fetchMenu(),
          fetchReservations(),
          fetchContact(),
        ]);
        setMenu(menuData);
        setReservations(resData);
        setContact(contactData);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("No se pudo conectar con la base de datos.");
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // ── Acciones de menú ───────────────────────────────────────────────────────
  const addMenuItem = async (item) => {
    const newItem = await insertMenuItem(item);
    setMenu((prev) => [...prev, newItem]);
  };

  const editMenuItem = async (id, changes) => {
    const updated = await updateMenuItem(id, changes);
    setMenu((prev) => prev.map((i) => (i.id === id ? updated : i)));
  };

  const removeMenuItem = async (id) => {
    await deleteMenuItem(id);
    setMenu((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleItem = async (id, disponible) => {
    await toggleMenuItem(id, !disponible);
    setMenu((prev) =>
      prev.map((i) => (i.id === id ? { ...i, disponible: !disponible } : i))
    );
  };

  // ── Acciones de reservaciones ─────────────────────────────────────────────
  const addReservation = async (reservation) => {
    const newRes = await insertReservation(reservation);
    setReservations((prev) => [newRes, ...prev]);
    return newRes;
  };

  const changeReservationStatus = async (id, status) => {
    await updateReservationStatus(id, status);
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const removeReservation = async (id) => {
    await deleteReservation(id);
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  // ── Acciones de contacto ──────────────────────────────────────────────────
  const saveContact = async (newContact) => {
    await updateContact(newContact);
    setContact(newContact);
  };

  return (
    <AppContext.Provider value={{
      // Estado
      menu, reservations, contact, loading, error,
      // Acciones menú
      addMenuItem, editMenuItem, removeMenuItem, toggleItem,
      // Acciones reservaciones
      addReservation, changeReservationStatus, removeReservation,
      // Acciones contacto
      saveContact,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return ctx;
}
