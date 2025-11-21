import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  console.log("🔍 Inspecting Database Schema...");

  // 1. List Tables (using a known trick or just guessing common names if information_schema is locked)
  // Note: Anon key usually doesn't have access to information_schema.
  // We'll try to fetch from common table names based on the portfolio context.

  const commonTables = [
    "projects",
    "experience",
    "experiences",
    "work_experience",
    "education",
    "educations",
    "skills",
    "technologies",
    "hero",
    "profile",
    "about",
    "socials",
    "social_links",
    "contact",
  ];

  for (const table of commonTables) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (!error) {
      console.log(`\n✅ Found table: '${table}'`);
      if (data && data.length > 0) {
        console.log("   Sample keys:", Object.keys(data[0]).join(", "));
      } else {
        console.log("   (Table is empty)");
      }
    } else {
      // console.log(`   (Table '${table}' not accessible or does not exist: ${error.code})`);
    }
  }
}

inspect();
