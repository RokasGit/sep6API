import toplistDB from "../../database/toplist"
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
    static async deleteMovieFromToplist(userId : number,  movieId : String) : Promise<String[]> {
        try{
            return await toplistDB.deleteMovieFromToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return [];
        }
    };
}