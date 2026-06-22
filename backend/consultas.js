import { pool } from "./database/db.js";

// Obtiene todos los posts de la base de datos ordenados del más reciente al más antiguo
export const obtenerPosts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC");

    return rows;
  } catch (error) {
    throw new Error(`Error al obtener los posts: ${error.message}`);
  }
};

// Inserta un nuevo post en la base de datos y devuelve el registro creado
export const agregarPost = async (titulo, img, descripcion, likes) => {
  try {
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
  } catch (error) {
    throw new Error(`Error al agregar el posts: ${error.message}`);
  }
};

// Incrementa en 1 la cantidad de likes de un post según su id
export const likePost = async (id) => {
  try {
    const consulta = `
UPDATE posts
SET likes = likes + 1
WHERE id = $1
RETURNING *;
`;

    const values = [id];

    const resultado = await pool.query(consulta, values);

    if (resultado.rowCount === 0) {
      throw new Error("Post no encontrado");
    }

    return resultado.rows[0];
  } catch (error) {
    throw new Error(`Error al agregar un like en el posts: ${error.message}`);
  }
};

// Elimina un post por su id y devuelve el registro eliminado
export const eliminarPost = async (id) => {
  try {
    const consulta = `
  DELETE FROM posts
  WHERE id = $1
  RETURNING *
  `;
    const values = [id];

    const resultado = await pool.query(consulta, values);

    if (resultado.rowCount === 0) {
      throw new Error("Post no encontrado");
    }

    console.log("Post eliminado");

    return resultado.rows[0];
  } catch (error) {
    throw new Error(`Error al eliminar el posts: ${error.message}`);
  }
};
