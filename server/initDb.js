import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDatabase() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl || databaseUrl.includes("your_postgres_connection_string")) {
    console.error("❌ ERROR: DATABASE_URL is not configured in server/.env");
    console.log(
      "👉 Please update DATABASE_URL in server/.env with your PostgreSQL connection string."
    );
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log("⏳ Connecting to PostgreSQL database...");
    const client = await pool.connect();
    console.log(" Connected to database successfully.");

    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");

    console.log("⏳ Applying schema (creations table & indexes)...");
    await client.query(schemaSql);
    console.log(" Table 'creations' and indexes verified / created successfully!");

    client.release();
    await pool.end();
    console.log("🎉 Database initialization completed successfully!");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error.message);
    await pool.end();
    process.exit(1);
  }
}

initDatabase();
