import express from 'express';
const app = express ();
const PORT = process.env.PORT || 3012
import router from './routes/routes.js';


//configuracion de middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/', router);

app.listen(PORT, () => console.log(`servidor levantado en http://localhost:${PORT}`))