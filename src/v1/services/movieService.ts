import movieDB from "../../database/movie"


const getAllMovies = () => {
    return ;
};
const getOneMovie = async (title : string) => {
    try{
        const movie = await movieDB.getOneMovie(title);
        return movie;
    }catch(error) {
        console.log(error);
    }
}

export = {
    getAllMovies,
    getOneMovie
};