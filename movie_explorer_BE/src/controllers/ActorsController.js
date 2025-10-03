import { getDb } from "../config/db.js"; 

export const getActors = async (req,res) => {
  try {
    const actorName = req.query.name;
        console.log("actors",actorName);

    const db = getDb();
    const actors = await db.collection("actors").find({name: { $regex: actorName, $options: "i" } }).toArray();

    if (actors.length === 0) {
      return res.status(404).json({ message: "no details found" });
    }

    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


