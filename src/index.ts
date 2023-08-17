require('dotenv').config();

import express from 'express';
import { dbConnection } from './config/db';

const app = express();

dbConnection()
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.log(`Error al conectar a la base de datos: ${error}`);
    });
