import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import debugLib from 'debug';

import indexRouter from './routes/index.router';
import { helpers } from './utils/helpers';

const debug = debugLib('meli:index');
const app = express();

const PORT = process.env.PORT || '3000';
const API_PATH = '/api';

app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(express.urlencoded({extended: false}));

app.use(cors(helpers.addCorsWhiteList([], true)));

app.use(API_PATH, indexRouter);
app.use((req, res) => {
    return res.status(404).send({message: `Route '${req.url}' Not found.`});
});

debug('Server is running on port:', PORT);
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});

