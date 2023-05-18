import express, { Request, Response } from 'express';
import watchlistController from '../controllers/watchlistController';

const router = express.Router();

router.post('/:userId', watchlistController.addMovieIdBasedOnUserId);
router.get('/:userId', watchlistController.getWatchlistBasedOnUserId);
router.delete('/:userId', watchlistController.deleteMovieFromWatchlist);

export = router;
