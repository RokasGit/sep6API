import { Request, Response } from "express";
import reviewService from "../services/reviewService"

export default class ReviewController {
    static async addReview(req: Request, res: Response) {
        const responseFromDB = await reviewService.addReview(
          parseInt(req.params.userId),
          req.body.review
        );

        res.send({status: "OK", data: responseFromDB});
    };

}