import express from "express";
import v1MovieRouter from "./v1/routes/movieRoutes"

const app = express();


app.use("/bestmovies/v1/movies", v1MovieRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`App listening on PORT ${port}`));