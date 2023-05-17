import express, { Request, Response } from 'express';
import reviewController from '../controllers/reviewController';

const router = express.Router();

router.post('/:userId', reviewController.addReview);
router.get('/:userId', reviewController.getReviewsBasedOnUserId);
router.delete('/:userId/:movieId', reviewController.deleteReview);
router.get('/allreviews/:movieId', reviewController.getReviewsBasedOnMovieId);

export = router;