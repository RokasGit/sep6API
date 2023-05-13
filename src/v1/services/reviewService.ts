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
}
