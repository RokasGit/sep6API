import knex from "knex";

export default class ToplistData {
    static async addMovieIdToToplist(userId : number, movieId : number){
        try{
           knex("Toplist").insert({user_id: userId, imdb_movie_id: movieId}).then(()=> {return true;});
        }catch(error){
            console.log(error);
            return false;
        }
    }
}