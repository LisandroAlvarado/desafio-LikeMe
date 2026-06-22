import { pool } from "./db.js";

export const obtenerPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");

    return rows;
  } catch (error) {
    throw new Error(`Error al obtener los posts: ${error.message}`);
  }
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
