import { Request, Response } from "express";
import toplistService from "../services/toplistService"

const addMovieIdBasedOnUserId = async (req : Request, res : Response) => {
        const responseBody = await toplistService.addMovieIdBasedOnUser(parseInt(req.params.userId), parseInt(req.params.movieId));
        res.send({status: "OK", data: responseBody});
};
export = {
    addMovieIdBasedOnUserId
};