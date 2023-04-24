import { Request, Response } from "express";
import toplistService from "../services/toplistService"

export default class ToplistController {
    static async addMovieIdBasedOnUserId(req : Request, res : Response) {
            const responseFromDB = await toplistService.addMovieIdBasedOnUser(parseInt(req.params.userId), JSON.parse(req.body).ID);
            let responseBody;
            if(responseFromDB){
                let body = JSON.parse(req.body);
                body.BelongsToToplist = true;
                responseBody = JSON.stringify(body);
            }
            else{
                responseBody = undefined;
            }
            res.send({status: "OK", data: responseBody});
    };
}
