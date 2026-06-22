import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { obtenerPosts, agregarPost } from "./consultas.js";

// Carga las variables de entorno del archivo .env
dotenv.config();

const app = express();

// Habilita el intercambio de recursos entre el frontend y el backend
app.use(cors());
// Permite recibir y procesar datos en formato JSON
app.use(express.json());

// Obtiene el puerto desde las variables de entorno o usa 3000 por defecto
const PORT = process.env.PORT || 3000;

// Devuelve todos los posts almacenados en la base de datos
app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Crea un nuevo post y lo almacena en la base de datos
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;

    // Valida que todos los campos obligatorios estén presentes
    if (!titulo || !img || !descripcion) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }
    // Crea el post con 0 likes por defecto
    const post = await agregarPost(titulo, img, descripcion, 0);

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Inicia el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
