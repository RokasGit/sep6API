import db from "."
import axios from 'axios'


export default class MovieData {
    static async getOneMovie(title : string) : Promise<string> {
        try {
            const response = await axios.get(`${db.OMDB_API_URL}t=${title}`);
            return response.data as any
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

