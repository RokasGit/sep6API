import movieDB from "../../database/movie"
const getAllMovies = () => {
    return ;
};
const getOneMovie = (title : string) => {
    const movie = movieDB.getOneMovie(title);
    return movie;
}

export = {
    getAllMovies,
    getOneMovie
};