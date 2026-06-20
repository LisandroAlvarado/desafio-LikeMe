import { pool } from "./db.js";

// Obtiene todos los posts de la base de datos ordenados del más reciente al más antiguo
export const obtenerPost = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");

  return rows;
};

// Inserta un nuevo post en la base de datos y devuelve el registro creado
export const agregarPost = async (titulo, img, descripcion, likes) => {
  // Consulta SQL parametrizada para evitar inyecciones SQL
  const consulta = `
INSERT INTO posts (titulo, img, descripcion, likes)
VALUES ($1, $2, $3, $4)
RETURNING *;
    `;

  const values = [titulo, img, descripcion, likes];

  // Ejecuta la consulta y obtiene el post recién creado
  const { rows } = await pool.query(consulta, values);

  console.log("Post agregado", rows[0]);

  return rows[0];
};
