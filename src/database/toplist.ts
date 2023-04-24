import db from "./index";

export default class ToplistData {
  static async addMovieIdToToplist(
    userId: number,
    movieId: number
  ): Promise<boolean> {
    try {
      const response = await db.db("Toplist").insert({
        user_id: userId,
        imdb_movie_id: movieId,
      });
      return response.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
