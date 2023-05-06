import express, { Request, Response } from "express";
import actorController from "../controllers/actorController";
const router = express.Router();

router.get("/:searchActor", actorController.searchActor);

export = router;
