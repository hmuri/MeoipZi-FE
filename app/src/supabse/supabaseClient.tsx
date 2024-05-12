import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dnjmzfpfzulxejngpfgb.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("Supabase key is not defined in the environment variables.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
