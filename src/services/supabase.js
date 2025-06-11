import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Simple connection test function
// export const testConnection = async () => {
//     try {
//       const { data, error } = await supabase.from('test').select('*').limit(1)
//       console.log('Supabase connection test:', { data, error })
//       return { success: !error, error }
//     } catch (err) {
//       console.error('Connection failed:', err)
//       return { success: false, error: err.message }
//     }
//   }