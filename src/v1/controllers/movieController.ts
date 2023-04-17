import { Request, Response } from "express";
import movieService from "../services/movieService"

const getAllMovies = (req : Request, res: Response) => {
    const allMovies = movieService.getAllMovies();
    res.send("Get all movies");
};
const getOneMovie = (req : Request, res : Response) => {
    const movie = movieService.getOneMovie(req.params.movieTitle);
    res.send({status: "OK", data: movie});
};
export = {
    getAllMovies,
    getOneMovie
};