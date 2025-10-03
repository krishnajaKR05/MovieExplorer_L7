import express from "express";
import { getActors } from "../controllers/ActorsController.js";
import { getDirectors } from "../controllers/DirectorsController.js";
import { getMovies } from "../controllers/MovieController.js";

const router = express.Router();
router.get("/movies",getMovies);
router.get("/actors",getActors);
router.get("/directors",getDirectors);
export default router;
