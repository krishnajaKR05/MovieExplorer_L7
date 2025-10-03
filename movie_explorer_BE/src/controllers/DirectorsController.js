import { getDb } from "../config/db.js"; 

export const getDirectors = async (req,res) => {
  try {
    const db = getDb();
    const directors = await db.collection("directors").find(req).toArray();

    if (directors.length === 0) {
      return res.status(404).json({ message: "no details found" });
    }

    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



