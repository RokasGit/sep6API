import { Request, Response } from "express";
import reviewService from "../services/reviewService"
import { Review } from "../../models/review";
import { request } from "http";

export default class ReviewController {
  static async addReview(req: Request, res: Response) {
    try {
      const review:Review = req.body;
         
      const responseFromDB = await reviewService.addReview(
        parseInt(req.params.userId),
        review
      );

      if (responseFromDB) {
        res.send({ status: "OK", data: responseFromDB });
      } else {
        res.status(500).send({ status: "Error", message: "Failed to add review" });
      }
    } catch (error: any) {
      res.status(500).send({ status: "Error", message: error.message });
    }
  };

  static async getReviewsBasedOnUserId(req: Request, res: Response) {
    try {
      const responseFromDB = await reviewService.getReviewsBasedOnUserId(parseInt(req.params.userId));
      
      if (responseFromDB && responseFromDB.length > 0) {
        res.send({ status: "OK", data: responseFromDB });
      } else {
        res.status(404).send({ status: "Error", message: "No reviews found for this user" });
      }
    } catch (error: any) {
      res.status(500).send({ status: "Error", message: error.message });
    }
  };

}