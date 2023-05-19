import { Review } from "../models/review";
import db from "./index";

export default class ReviewData {
  static async addReviewToDb(userId: number, review: Review): Promise<boolean> {
    try {
      const response = await db.db("sep6.review").insert({
        user_id: userId,
        imdb_movie_id: review.movieId,
        ratting: review.ratting,
        comment: review.comment,
        movie_title: review.movieName,
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
        movieId: response.imdb_movie_id,
        ratting: response.ratting,
        comment: response.comment,
        movieName: response.movie_title,
        date: response.date
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getReviewsBasedOnMovieId(movieId: string): Promise<Review[]> {
    try {
      const responses = await db.db('sep6.review').select('*').where('imdb_movie_id', movieId);

      return responses.map(response => ({
        userId: response.user_id,
        movieId: response.imdb_movie_id,
        ratting: response.ratting,
        comment: response.comment,
        movieName: response.movie_title,
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
        imdb_movie_id: movieId
      }).del();


      return response > 0;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async isReviewed(userId: number, movieId: string): Promise<Review | null> {
    try {
      const response = await db.db("sep6.review")
        .where({ user_id: userId, imdb_movie_id: movieId })
        .first();

      // Check if a review was found
      if (response) {
        return {
          userId: response.user_id,
          movieId: response.imdb_movie_id,
          ratting: response.ratting,
          comment: response.comment,
          movieName: response.movie_title,
          date: response.date
        }
      } else {
        // No review was found
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
