import ReviewData from "../../database/review";
import { Review } from "../../models/review";

export default class ReviewService {
  static addReview(userId: number, review: Review): Promise<boolean> {
    try {
      return ReviewData.addReviewToDb(userId, review);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static getReviewsBasedOnUserId(userId: number): Promise<Review[]> {
    try {
      return ReviewData.getReviewsBasedOnUserId(userId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getReviewsBasedOnMovieId(movieId: string): Promise<Review[]> {
    try {
      return ReviewData.getReviewsBasedOnMovieId(movieId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteReview(userId: number, movieId: string): Promise<boolean> {
    try {
      return ReviewData.deleteReview(userId, movieId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async isReviewed(userId : number,  movieId : string) : Promise<Review | null> {
    try{
        return await ReviewData.isReviewed(userId, movieId);
    }catch(error) {
        console.log(error);
        return null;
    }
};
}
