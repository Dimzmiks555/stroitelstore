import express from 'express';
import OneCRouter from './routers/OneCRouter.js'
import ProductsRouter from './routers/ProductsRouter.js'
import cors from 'cors';
import passport from 'passport'
import { Strategy } from 'passport-local'
const app = express();

const port = 80;




app.use(cors());
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
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
