import express, { Request, Response } from 'express';
import toplistController from '../controllers/toplistController';

const router = express.Router();

router.post('/:userId', toplistController.addMovieIdBasedOnUserId);
router.get('/:userId', toplistController.getToplistBasedOnUserId);
router.delete('/:userId', toplistController.deleteMovieFromToplist);

export = router;
