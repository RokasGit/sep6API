import db from "./index";

export default class WatchlistData {
  static async addMovieIdToWatchlist(userId: number, movieId: string): Promise<boolean> {
    try {
      const response = await db.db("sep6.watchlist").returning('*').insert({
        user_id: userId,
        imdb_movie_id: movieId,
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static async getWatchlistBasedOnUserId(userId: number): Promise<string[]> {
    try {
      const response = await db.db("sep6.watchlist").select('imdb_movie_id').where('user_id', userId);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static async deleteMovieFromWatchlist(userId: number, movieId: string): Promise<string[]> {
    try {
      const deleting = await db.db("sep6.watchlist").where({imdb_movie_id: movieId, user_id: userId}).del();
      if(deleting > 0){
        const response = await db.db("sep6.watchlist").select('imdb_movie_id').where('user_id', userId);
        return response;
      }
      else{
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static async isInWatchlist(userId: number, movieId: string) : Promise<boolean> {
    try {
      const response = await db.db("sep6.watchlist").where({ user_id: userId, imdb_movie_id: movieId })
      .first();
      return !!response;
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
