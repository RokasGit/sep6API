import express, { Request, Response } from 'express';
import reviewController from '../controllers/reviewController';

const router = express.Router();

router.post('/:userId', reviewController.addReview);
router.get('/:userId', reviewController.getReviewsBasedOnUserId);

export = router;