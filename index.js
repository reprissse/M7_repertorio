//importamos express
import express from 'express';

//se crea la aplicación
const app = express ();

//se define el puerto
const PORT = process.env.PORT || 3012

//se importan las rutas
import router from './routes/routes.js';


//configuracion de middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/', router);

app.listen(PORT, () => console.log(`servidor levantado en http://localhost:${PORT}`))