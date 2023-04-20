import toplistDB from "../../database/toplist"

const addMovieIdBasedOnUser = async (userId : number, movieId : number) => {
    try{
        return await toplistDB.addMovieIdToToplist(userId, movieId);
    }catch(error) {
        console.log(error);
    }
}

export = {
    addMovieIdBasedOnUser
};