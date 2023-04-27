import { Request, Response } from "express";
import toplistService from "../services/toplistService"

export default class ToplistController {
    static async addMovieIdBasedOnUserId(req : Request, res : Response) {
            const responseFromDB = await toplistService.addMovieIdBasedOnUser(parseInt(req.params.userId), req.body.imdbID);
            let responseBody;
            if(responseFromDB){
                let body = req.body;
                body.BelongsToToplist = true;
                responseBody = body;
            }
            else{
                responseBody = undefined;
            }
            res.send({status: "OK", data: responseBody});
    };
}
