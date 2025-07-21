import { config } from "dotenv";

import { createClient } from "@supabase/supabase-js";

config()

const supabase = createClient(process.env.SUPABASEURL, process.env.PABLIC_KEY)
console.log(process.env.SUPABASEURL);


export default supabase