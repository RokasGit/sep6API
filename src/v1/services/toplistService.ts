import toplistDB from "../../database/toplist"
//File change

export default class ToplistService {
    static async addMovieIdBasedOnUser(userId : number, movieId : string) : Promise<boolean> {
        try{
            return await toplistDB.addMovieIdToToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return false;
        }
    };
    static async getToplistBasedOnUser(userId : number) : Promise<string[]> {
        try{
            return await toplistDB.getToplistBasedOnUserId(userId);
        }catch(error) {
            console.log(error);
            return [];
        }
    };
    static async deleteMovieFromToplist(userId : number,  movieId : string) : Promise<string[]> {
        try{
            return await toplistDB.deleteMovieFromToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return [];
        }
    };

    static async isInToplist(userId : number,  movieId : string) : Promise<boolean> {
        try{
            return await toplistDB.isInToplist(userId, movieId);
        }catch(error) {
            console.log(error);
            return false;
        }
    };
}