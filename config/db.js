// Importamos el módulo 'pg' y extraemos 'Pool' de él
import pg from 'pg';
const { Pool } = pg;

// Importamos 'dotenv/config' para poder usar las variables de entorno
import 'dotenv/config'

// Extraemos las variables de entorno que necesitamos
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD } = process.env

// Configuramos la conexión a la base de datos
const config = {
    host: DB_HOST, 
    user: DB_USER, 
    database: DB_DATABASE,
    password: DB_PASSWORD,
    allowExitOnIdle: true 
}

// Creamos un nuevo pool de conexiones a la base de datos
const db = new Pool(config);

// Exportamos 'db' para poder usarlo en otros módulos
export default db;
