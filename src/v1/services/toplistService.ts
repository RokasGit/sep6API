import toplistDB from "../../database/toplist"

export default class ToplistService {
    static async addMovieIdBasedOnUser(userId : number, movieId : number) : Promise<boolean> {
        try{
            return await toplistDB.addMovieIdToToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return false;
        }
    };
}