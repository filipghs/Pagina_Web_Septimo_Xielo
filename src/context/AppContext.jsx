import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchMenu, insertMenuItem, updateMenuItem, deleteMenuItem, toggleMenuItem,
  fetchReservations, insertReservation, updateReservationStatus, deleteReservation,
  fetchContact, updateContact,
  fetchCategories, insertCategory, updateCategory, deleteCategory,
} from "../lib/dataService";
import { supabase } from "../lib/supabase";
import { INITIAL_CONTACT } from "../data/initialData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [menu,         setMenu]         = useState([]);
  const [reservations, setReservations] = useState([]);
  const [contact,      setContact]      = useState(INITIAL_CONTACT);
  const [categories,   setCategories]   = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function loadAll() {
      try {
        const [menuData, resData, contactData, catsData] = await Promise.all([
          fetchMenu(),
          fetchReservations(),
          fetchContact(),
          fetchCategories(),
        ]);
        setMenu(menuData);
        setReservations(resData);
        setContact(contactData);
        setCategories(catsData);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("No se pudo conectar con la base de datos.");
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  useEffect(() => {
    const channel = supabase
        .channel("reservations-realtime")
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "reservations" }, (payload) => {
          const newRes = payload.new;
          setReservations((prev) => {
            if (prev.find((r) => r.id === newRes.id)) return prev;
            return [newRes, ...prev];
          });
          setNotification({ id: newRes.id, nombre: newRes.nombre, fecha: newRes.fecha, hora: newRes.hora });
          setTimeout(() => setNotification(null), 6000);
        })
        .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const dismissNotification = useCallback(() => setNotification(null), []);

  const addMenuItem    = async (item)        => { const n = await insertMenuItem(item);         setMenu((p) => [...p, n]); };
  const editMenuItem   = async (id, changes) => { const u = await updateMenuItem(id, changes);  setMenu((p) => p.map((i) => i.id === id ? u : i)); };
  const removeMenuItem = async (id)          => { await deleteMenuItem(id);                      setMenu((p) => p.filter((i) => i.id !== id)); };
  const toggleItem     = async (id, disp)    => { await toggleMenuItem(id, !disp);               setMenu((p) => p.map((i) => i.id === id ? { ...i, disponible: !disp } : i)); };

  const addReservation          = async (r)     => { const n = await insertReservation(r);              setReservations((p) => p.find((x) => x.id === n.id) ? p : [n, ...p]); return n; };
  const changeReservationStatus = async (id, s) => { await updateReservationStatus(id, s);              setReservations((p) => p.map((r) => r.id === id ? { ...r, status: s } : r)); };
  const removeReservation       = async (id)    => { await deleteReservation(id);                       setReservations((p) => p.filter((r) => r.id !== id)); };

  const saveContact = async (c) => { await updateContact(c); setContact(c); };

  const addCategory    = async (nombre)        => { const n = await insertCategory(nombre, categories.length + 1); setCategories((p) => [...p, n]); };
  const editCategory   = async (id, changes)   => { const u = await updateCategory(id, changes);                   setCategories((p) => p.map((c) => c.id === id ? u : c)); };
  const removeCategory = async (id)            => { await deleteCategory(id);                                       setCategories((p) => p.filter((c) => c.id !== id)); };

  return (
      <AppContext.Provider value={{
        menu, reservations, contact, categories, loading, error,
        notification, dismissNotification,
        addMenuItem, editMenuItem, removeMenuItem, toggleItem,
        addReservation, changeReservationStatus, removeReservation,
        saveContact,
        addCategory, editCategory, removeCategory,
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