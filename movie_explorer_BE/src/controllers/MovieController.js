// src/controllers/movieController.js
import { getDb } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getMovies = async (req, res) => {
  try {
    const db = getDb();

    const { genre, actor, director, year } = req.query;

    // Convert string IDs to ObjectId if provided
    const genreId = genre ? new ObjectId(genre) : null;
    const actorId = actor ? new ObjectId(actor) : null;
    const directorId = director ? new ObjectId(director) : null;

    const pipeline = [
      // Lookup actors
      {
        $lookup: {
          from: "actors",
          localField: "actor",
          foreignField: "_id",
          as: "actors"
        }
      },
      // Lookup director
      {
        $lookup: {
          from: "directors",
          localField: "director",
          foreignField: "_id",
          as: "director"
        }
      },
      { $unwind: { path: "$director", preserveNullAndEmptyArrays: true } },
      // Lookup genres
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres"
        }
      }
    ];

    // Build dynamic filter
    const match = {};
    if (genreId) match.genres = { $elemMatch: { _id: genreId } };
    if (actorId) match.actors = { $elemMatch: { _id: actorId } };
    if (directorId) match["director._id"] = directorId;
    if (year) match.releaseYear = year;

    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    const movies = await db.collection("movies").aggregate(pipeline).toArray();

    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
