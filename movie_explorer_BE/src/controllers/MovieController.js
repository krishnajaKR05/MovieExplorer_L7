import { getDb } from "../config/db.js";

export const getMovies = async (req, res) => {
  console.log("inside getMovies", req.body);
  try {
    const { filter, value } = req.body;
    const db = getDb();

    let query = {};

    if (filter && value) {
      const normalizedValue = value.replace(/\s+/g, "").toLowerCase();

      switch (filter.toLowerCase()) {
        case "actor": {
          const actor = await db.collection("actors").findOne({
            $expr: {
              $regexMatch: {
                input: {
                  $replaceAll: { input: "$name", find: " ", replacement: "" },
                },
                regex: normalizedValue,
                options: "i",
              },
            },
          });
          if (!actor)
            return res.status(404).json({ message: "Actor not found" });
          query.actors = actor._id;
          break;
        }

        case "director": {
          const director = await db.collection("directors").findOne({
            $expr: {
              $regexMatch: {
                input: {
                  $replaceAll: { input: "$name", find: " ", replacement: "" },
                },
                regex: normalizedValue,
                options: "i",
              },
            },
          });
          if (!director)
            return res.status(404).json({ message: "Director not found" });
          query.director = director._id;
          break;
        }

        case "genre": {
          const genre = await db.collection("genres").findOne({
            $expr: {
              $regexMatch: {
                input: {
                  $replaceAll: { input: "$name", find: " ", replacement: "" },
                },
                regex: normalizedValue,
                options: "i",
              },
            },
          });
          if (!genre)
            return res.status(404).json({ message: "Genre not found" });
          query.genres = genre._id;
          break;
        }

        case "releaseyear":
        case "year": {
          const year = parseInt(value);
          if (!year)
            return res.status(400).json({ message: "Invalid year value" });
          query.releaseYear = year;
          break;
        }

        default:
          return res.status(400).json({ message: "Invalid filter type" });
      }
    }

    const moviesData = await db.collection("movies").find(query).toArray();

    const movies = await Promise.all(
      moviesData.map(async (movie) => {
        const actors = await db
          .collection("actors")
          .find({ _id: { $in: movie.actors } })
          .project({ name: 1, _id: 0 })
          .toArray();

        const director = await db
          .collection("directors")
          .findOne(
            { _id: movie.director },
            { projection: { name: 1, _id: 0 } }
          );

        const genres = await db
          .collection("genres")
          .find({ _id: { $in: movie.genres } })
          .project({ name: 1, _id: 0 })
          .toArray();

        return {
          title: movie.title,
          releaseYear: movie.releaseYear,
          actors: actors.map((a) => a.name),
          director: director ? director.name : null,
          genres: genres.map((g) => g.name),
        };
      })
    );

    res.json({ movies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
