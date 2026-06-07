import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://weurxasrufgukkxlvxxo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldXJ4YXNydWZndWtreGx2eHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NzAxMDAsImV4cCI6MjA5NjM0NjEwMH0.9a7PMrwtqV_OWqaEEOpnlx70OGDtD0bHleqBus33GdM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);