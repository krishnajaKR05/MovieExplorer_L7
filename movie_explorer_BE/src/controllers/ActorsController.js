import { getDb } from "../config/db.js";

export const getActorInfo = async (req, res) => {
  try {
    const name = req.query.name;
    const db = getDb();

    const actor = await db
      .collection("actors")
      .findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }

    const movies = await db
      .collection("movies")
      .find({ actors: actor._id })
      .project({ title: 1, _id: 0 })
      .toArray();

    res.json({
      actor: { _id: actor._id, name: actor.name, bio: actor.bio },
      movies: movies.map((m) => m.title),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
