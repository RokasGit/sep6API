import { Review } from "../models/review";
import db from "./index";

export default class ReviewData {
  static async addReviewToDb(userId: number, review: Review): Promise<boolean> {
    try {
      const response = await db.db("sep6.review").insert({
        user_id: userId,
        api_movie_id: review.api_Id,
        ratting: review.ratting,
        comment: review.comment,
        date: review.date
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getReviewsBasedOnUserId(userId: number): Promise<Review[]> {
    try {
      const responses = await db.db("sep6.review").select('*').where('user_id', userId);

      return responses.map(response => ({
        user_id: response.user_id,
        api_Id: response.api_movie_id,
        ratting: response.ratting,
        comment: response.comment,
        date: response.date
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
