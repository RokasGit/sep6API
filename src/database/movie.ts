import OMDB_API_URL from "."
import axios from 'axios'

const getOneMovie = (title : string) => {
    axios.get(`${OMDB_API_URL}t={title}`).then(response => {
        console.log(response.data);
        return response.data;
    })
};

export = {getOneMovie};

