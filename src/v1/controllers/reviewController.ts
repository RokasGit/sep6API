import { Request, Response } from "express";
import reviewService from "../services/reviewService";
import { Review } from "../../models/review";
import { request } from "http";

export default class ReviewController {
  static async addReview(req: Request, res: Response) {
    try {
      const review: Review = req.body;

      const responseFromDB = await reviewService.addReview(
        parseInt(req.params.userId),
        review
      );

      if (responseFromDB) {
        res.status(201).json(responseFromDB);
      } else {
        res.status(400).json("Failed to add review");
      }
    } catch (error: any) {
      res.status(400).json((error as Error).message);
    }
  }

  static async getReviewsBasedOnUserId(req: Request, res: Response) {
    try {
      const responseFromDB = await reviewService.getReviewsBasedOnUserId(
        parseInt(req.params.userId)
      );

      if (responseFromDB && responseFromDB.length > 0) {
        res.status(200).json(responseFromDB);
      } else {
        res.status(404).json("No reviews found for this user");
      }
    } catch (error: any) {
      res.status(400).json((error as Error).message);
    }
  }

  static async getReviewsBasedOnMovieId(req: Request, res: Response) {
    try {
      const responseFromDB = await reviewService.getReviewsBasedOnMovieId(
        req.params.movieId
      );

      if (responseFromDB && responseFromDB.length > 0) {
        res.status(200).json(responseFromDB);
      } else {
        res.status(404).json("No reviews found for this movieID");
      }
    } catch (error: any) {
      res.status(400).json((error as Error).message);
    }
  }

  static async deleteReview(req: Request, res: Response) {
    try {
      const responseFromDB = await reviewService.deleteReview(
        parseInt(req.params.userId),
        req.params.movieId
      );

      if (responseFromDB) {
        res.status(200).json(responseFromDB);
      } else {
        res.status(400).json("Failed to delete review");
      }
    } catch (error: any) {
      res.status(400).json((error as Error).message);
    }
  }
}
