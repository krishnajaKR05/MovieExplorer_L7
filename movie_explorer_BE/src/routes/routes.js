import express from "express";
import { getActorInfo } from "../controllers/ActorsController.js";
import { getDirectorInfo } from "../controllers/DirectorsController.js";
import { getMovies } from "../controllers/MovieController.js";

const router = express.Router();
router.get("/actors",getActorInfo);
router.post("/movies",getMovies);
router.get("/directors",getDirectorInfo);
export default router;
