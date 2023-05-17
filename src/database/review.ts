import { Review } from "../models/review";
import db from "./index";

export default class ReviewData {
  static async addReviewToDb(userId: number, review: Review): Promise<boolean> {
    try {
      const response = await db.db("sep6.review").insert({
        user_id: userId,
        api_movie_id: review.movieId,
        ratting: review.ratting,
        comment: review.comment,
        date: review.date
      }).returning('review_id');
  
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
        userId: response.user_id,
        movieId: response.api_movie_id,
        ratting: response.ratting,
        comment: response.comment,
        date: response.date
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getReviewsBasedOnMovieId(movieId: string): Promise<Review[]> {
    try {
      const responses = await db.db('sep6.review').select('*').where('api_movie_id', movieId);

      return responses.map(response => ({
        userId: response.user_id,
        movieId: response.api_movie_id,
        ratting: response.ratting,
        comment: response.comment,
        date: response.date
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteReview(userId: number, movieId: string): Promise<boolean> {
    try {
      
      const response = await db.db('sep6.review').where({
        user_id: userId,
        api_movie_id: movieId
      }).del();

    
      return response > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
