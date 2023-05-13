import db from "./index";

export default class ToplistData {
  static async addMovieIdToToplist(userId: number, movieId: String): Promise<boolean> {
    try {
      const response = await db.db("sep6.toplist").insert({
        user_id: userId,
        imdb_movie_id: movieId,
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static async getToplistBasedOnUserId(userId: number): Promise<String[]> {
    try {
      const response = await db.db("sep6.toplist").select('imdb_movie_id').where('user_id', userId);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static async deleteMovieFromToplist(userId: number, movieId: String): Promise<String[]> {
    try {
      const deleting = await db.db("sep6.toplist").where({imdb_movie_id: movieId, user_id: userId}).del();
      if(deleting > 0){
        const response = await db.db("sep6.toplist").select('imdb_movie_id').where('user_id', userId);
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
}
