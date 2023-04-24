import express from 'express';
import v1MovieRouter from './v1/routes/movieRoutes';
import v1ToplistRouter from './v1/routes/toplistRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/bestmovies/v1/movies', v1MovieRouter);
app.use('/bestmovies/v1/toplists', v1ToplistRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
