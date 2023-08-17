import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { dbConnection } from './config/db';
import appRoutes from './routes';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Hello world');
});

app.use('/api', appRoutes);

dbConnection()
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.log(`Error al conectar a la base de datos: ${error}`);
    });
