import { Request, Response } from "express";
import toplistService from "../services/toplistService"

export default class ToplistController {
    static async addMovieIdBasedOnUserId(req : Request, res : Response) {
            const responseFromDB = await toplistService.addMovieIdBasedOnUser(parseInt(req.params.userId), parseInt(req.body.movieId));
            let responseBody;
            if(responseFromDB){
                responseBody = req.body;
            }
            else{
                responseBody = undefined;
            }
            res.send({status: "OK", data: responseBody});
    };
}
