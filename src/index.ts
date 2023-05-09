import express from "express";
import v1MovieRouter from "./v1/routes/movieRoutes";
import v1ToplistRouter from "./v1/routes/toplistRoutes";
import v1ActorRouter from "./v1/routes/actorRoutes";
import v1UserRouter from "./v1/routes/userRoutes";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/bestmovies/v1/movies", v1MovieRouter);
app.use("/bestmovies/v1/toplists", v1ToplistRouter);
app.use("/bestmovies/v1/actors", v1ActorRouter);
app.use("/bestmovies/v1/users", v1UserRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));
