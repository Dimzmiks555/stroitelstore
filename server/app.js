import express from 'express';
import OneCRouter from './routers/OneCRouter.js'
import ProductsRouter from './routers/ProductsRouter.js'
import cors from 'cors';
import mysql from 'mysql2'

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const port = 8080;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "1c_base",
    password: "root"
  });

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);


app.use(cors());
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use('/uploads', express.static(join(__dirname,'uploads')));
app.use('/', OneCRouter);
app.use('/api', ProductsRouter);

// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('oK')
// })

async function startApp() {
    try {
        app.listen(port, () => console.log('SERVER STARTED ON PORT ' + port))
    } catch (e) {
        console.log(e)
    }
}

startApp()
