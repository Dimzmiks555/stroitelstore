import express from 'express';
import tendersRouter from './TendersRouter.js'
import mongoose from 'mongoose'
import cors from 'cors';
import passport from 'passport'
import { Strategy } from 'passport-local'
const app = express();

const port = 80;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use('/api', tendersRouter);

app.get('/', (req, res) => {
    res.send(`success\n`)
})

async function startApp() {
    try {
        app.listen(port, () => console.log('SERVER STARTED ON PORT ' + port))
    } catch (e) {
        console.log(e)
    }
}

startApp()
