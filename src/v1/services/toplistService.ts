import toplistDB from "../../database/toplist"
import { Movie } from "../../models/movie";
//File change

export default class ToplistService {
    static async addMovieIdBasedOnUser(userId : number, movieId : String) : Promise<boolean> {
        try{
            return await toplistDB.addMovieIdToToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return false;
        }
    };
    static async getToplistBasedOnUser(userId : number) : Promise<String[]> {
        try{
            return await toplistDB.getToplistBasedOnUserId(userId);
        }catch(error) {
            console.log(error);
            return [];
        }
    };
}