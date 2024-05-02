// Importamos la configuración de la base de datos
import db from '../config/db.js';

// Función para traer los datos de la base de datos
const traerData = async()=>{
    try{
        // Consulta SQL para seleccionar todas las canciones
        const consultarCancion={
            text:'select * from canciones',
        }
        // Ejecutamos la consulta y guardamos el resultado
        const response = await db.query(consultarCancion);
        // Retornamos las filas del resultado
        return response.rows
    }catch(error) {
        // Si hay un error, lo imprimimos en la consola
        console.log(error.message)
    };
}

// Función para agregar canciones a la base de datos
const agregarData = async (cancion)=>{
    try{
        // Consulta SQL para insertar una nueva canción
        const agregarCancion = {
            text:'insert into canciones (titulo, artista, tono) values ($1, $2, $3) returning *',
            values: cancion,
        }
        // Ejecutamos la consulta y guardamos el resultado
        const response = await db.query(agregarCancion);
        // Retornamos las filas del resultado
        return response.rows
    }catch(error){
        // Si hay un error, lo imprimimos en la consola
        console.log(error.message)
    }
};

// Función para eliminar una canción de la base de datos
const deleteCancion = async (id) => {
    try {
        // Consulta SQL para eliminar una canción
        const borrarCancion = {
            text: 'DELETE FROM canciones WHERE id=$1',
            values: [id]
        }
        // Ejecutamos la consulta y guardamos el resultado
        const response = await db.query(borrarCancion);
        // Si no se eliminó ninguna fila, lanzamos un error
        if (response.rowCount == 0){
            throw new Error ("Canción no encontrada");
        }
        // Retornamos las filas del resultado
        return response.rows;
    } catch (error) {
        // Si hay un error, lo imprimimos en la consola
        console.log(error.message);
    }
}

// Función para actualizar los datos de una canción en la base de datos
const updateData = async (cancion) => {
    try {
        // Consulta SQL para actualizar una canción
        const actualizarCancion = {
            text: 'UPDATE canciones SET titulo=$1, artista=$2, tono=$3 WHERE id=$4 RETURNING *',
            values: cancion
        }
        // Ejecutamos la consulta y guardamos el resultado
        const response = await db.query(actualizarCancion);
        // Retornamos las filas del resultado
        return response.rows;
    } catch (error) {
        // Si hay un error, lo imprimimos en la consola
        console.log(error.message);
    }
}

// Exportamos las funciones para que puedan ser usadas en otros módulos
export { traerData, agregarData, deleteCancion, updateData };


