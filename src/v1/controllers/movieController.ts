import { Request, Response } from "express";
import movieService from "../services/movieService"

const getAllMovies = async (req : Request, res: Response) => {
    const allMovies = movieService.getAllMovies();
    res.send("Get all movies");
};
const getOneMovie = async (req : Request, res : Response) => {
    const movie = await movieService.getOneMovie(req.params.movieTitle);
    res.send({status: "OK", data: movie});
};
export = {
    getAllMovies,
    getOneMovie
};