import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing environment variables!");
  console.log("URL:", supabaseUrl ? "Set" : "Missing");
  console.log("Key:", supabaseAnonKey ? "Set" : "Missing");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verify() {
  console.log("Testing connection to:", supabaseUrl);

  // Try to fetch from a non-existent table to check connectivity
  const { data, error } = await supabase
    .from("__test_connection__")
    .select("*")
    .limit(1);

  if (error) {
    // 42P01 is PostgreSQL error for "relation does not exist", which means we connected successfully!
    if (error.code === "42P01") {
      console.log(
        "✅ Connection successful! (Connected to DB, table not found as expected)",
      );
    } else {
      console.error("❌ Connection failed:", error.message, error.code);
    }
  } else {
    console.log("✅ Connection successful!");
  }
}

verify();
