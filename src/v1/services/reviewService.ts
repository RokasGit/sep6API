import ReviewData from "../../database/review"
import { Review } from "../../models/review";

export default class ReviewService {
    static async addReview(userId : number, review : Review) : Promise<boolean> {
        try{
            return await ReviewData.addReviewToDb(userId, review);
        }catch(error) {
            console.log(error);
            return false;
        }
    };
}