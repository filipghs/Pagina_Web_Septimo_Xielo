import { supabase } from "./supabase";

// ═══════════════════════════════════════════════════════════════════════════
// Capa de servicio — Principio S: cada función hace UNA operación de BD.
// Principio D: los componentes llaman estas funciones, no Supabase directo.
// ═══════════════════════════════════════════════════════════════════════════

// ── MENÚ ────────────────────────────────────────────────────────────────────

export async function fetchMenu() {
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  // Mapear 'descripcion' → 'desc' para compatibilidad con el estado React
  return data.map((item) => ({ ...item, desc: item.descripcion }));
}

export async function insertMenuItem(item) {
  const { desc, ...rest } = item;
  const { data, error } = await supabase
    .from("menu_items")
    .insert([{ ...rest, descripcion: desc }])
    .select()
    .single();
  if (error) throw error;
  return { ...data, desc: data.descripcion };
}

export async function updateMenuItem(id, changes) {
  const payload = { ...changes };
  if (changes.desc !== undefined) {
    payload.descripcion = changes.desc;
    delete payload.desc;
  }
  const { data, error } = await supabase
    .from("menu_items")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return { ...data, desc: data.descripcion };
}

export async function deleteMenuItem(id) {
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleMenuItem(id, disponible) {
  const { error } = await supabase
    .from("menu_items")
    .update({ disponible })
    .eq("id", id);
  if (error) throw error;
}

// ── RESERVACIONES ────────────────────────────────────────────────────────────

export async function fetchReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function insertReservation(reservation) {
  const { data, error } = await supabase
    .from("reservations")
    .insert([reservation])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateReservationStatus(id, status) {
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteReservation(id) {
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw error;
}

// ── CONTACTO ─────────────────────────────────────────────────────────────────

export async function fetchContact() {
  const { data, error } = await supabase
    .from("contact_info")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  // Mapear snake_case → camelCase para compatibilidad
  return {
    telefono:  data.telefono,
    email:     data.email,
    direccion: data.direccion,
    horario:   data.horario,
    redes:     data.redes,
    menuPdf:   data.menu_pdf,
  };
}

export async function updateContact(changes) {
  const payload = {
    telefono:  changes.telefono,
    email:     changes.email,
    direccion: changes.direccion,
    horario:   changes.horario,
    redes:     changes.redes,
    menu_pdf:  changes.menuPdf,
  };
  const { error } = await supabase
    .from("contact_info")
    .update(payload)
    .eq("id", 1);
  if (error) throw error;
}
// ── CATEGORÍAS ────────────────────────────────────────────────────────────────

export async function fetchCategories() {
  const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("orden", { ascending: true });
  if (error) throw error;
  return data;
}

export async function insertCategory(nombre, orden) {
  const { data, error } = await supabase
      .from("categories")
      .insert([{ nombre, orden }])
      .select()
      .single();
  if (error) throw error;
  return data;
}

export async function updateCategory(id, changes) {
  const { data, error } = await supabase
      .from("categories")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}
