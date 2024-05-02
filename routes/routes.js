// Importamos los módulos necesarios
import express from "express";
import path from "path";
import db from "../config/db.js"
import { traerData, agregarData, deleteCancion, updateData } from "../controllers/consultas.js";

// Creamos un nuevo router
const router = express.Router();

// Definimos el directorio actual
const __dirname= import.meta.dirname;

// Ruta para la página principal
router.get('/', (req, res)=>{
    // Enviamos el archivo index.html como respuesta
    res.sendFile(path.join(__dirname, "../views/index.html"))
});

// Ruta para obtener la fecha y hora actual
router.get("/date", async (req, res)=>{
    // Consultamos la fecha y hora actual en la base de datos
    const result = await db.query('select now()');
    // Enviamos el resultado como respuesta
    res.send(result.rows)
})

// Ruta para obtener todas las canciones
router.get("/canciones", async (req, res)=>{
    // Obtenemos todas las canciones de la base de datos
    const result = await traerData();
    // Enviamos el resultado como respuesta en formato JSON
    res.json(result);
})

// Ruta para agregar una canción a través del formulario
router.post("/cancion", async (req, res)=>{
    // Obtenemos los datos de la canción del cuerpo de la solicitud
    const { titulo, artista, tono } = req.body;
    // Creamos un array con los datos de la canción
    const cancion = [titulo, artista, tono];
    // Agregamos la canción a la base de datos
    const result = await agregarData(cancion);
    // Enviamos el resultado como respuesta en formato JSON
    res.json(result);
})

// Ruta para agregar una canción a través del endpoint "/canciones"
router.post("/canciones", async (req, res)=>{
    // Obtenemos los datos de la canción del cuerpo de la solicitud
    const { titulo, artista, tono } = req.body;
    // Creamos un array con los datos de la canción
    const cancion = [titulo, artista, tono];
    // Agregamos la canción a la base de datos
    const result = await agregarData(cancion);
    // Enviamos el resultado como respuesta en formato JSON
    res.json(result);
})

// Ruta para eliminar una canción
router.delete("/cancion", async(req, res) => {
    // Obtenemos el id de la canción de la consulta
    const {id} = req.query;
    // Eliminamos la canción de la base de datos
    const result = await deleteCancion(id);
    // Enviamos un mensaje de confirmación como respuesta
    res.send('Eliminado');
})

// Ruta para actualizar una canción
router.put("/cancion/:id", async(req, res) => {
    // Obtenemos el id de la canción de los parámetros de la ruta
    const { id } = req.params;  
    // Obtenemos los nuevos datos de la canción del cuerpo de la solicitud
    const { titulo, artista, tono } = req.body;
    // Creamos un array con los nuevos datos de la canción
    const cancion = [titulo, artista, tono, id];
    // Actualizamos la canción en la base de datos
    const result = await updateData(cancion);
    // Enviamos un mensaje de confirmación como respuesta
    res.send('Cambio realizado')    
})

// Exportamos el router para usarlo en otros módulos
export default router;

