import { getDb } from "../config/db.js";

export const getDirectorInfo = async (req, res) => {
  try {
    const name = req.query.name;
    const db = getDb();

    const director = await db.collection('directors').findOne({ name: { $regex: `^${name}$`, $options: 'i' } });

    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    const movies = await db.collection('movies')
      .find({ director: director._id })
      .project({ title: 1, _id: 0 })
      .toArray();

    res.json({
      director: { _id: director._id, name: director.name, bio: director.bio },
      movies: movies.map(m => m.title)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



