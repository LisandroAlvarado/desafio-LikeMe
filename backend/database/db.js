import pg from "pg";
import dotenv from "dotenv";

// Carga las variables de entorno del archivo .env en process.env
dotenv.config();

// Conexión a la base de datos Neon mediante PostgreSQL
const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
