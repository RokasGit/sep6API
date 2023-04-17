import express from "express";
import v1MovieRouter from "./v1/routes/movieRoutes"
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json());
app.use("/bestmovies/v1/movies", v1MovieRouter);

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`App listening on PORT ${port}`));