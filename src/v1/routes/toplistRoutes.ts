import express, { Request, Response } from 'express';
import toplistController from '../controllers/toplistController';
const router = express.Router();

router.post('/:userId', toplistController.addMovieIdBasedOnUserId);

export = router;
