import sql from "../configs/db.js";
import { getLocalCreations, updateLocalCreationLikes } from "../configs/localDb.js";

const isDbConfigured = () => {
  const dbUrl = process.env.DATABASE_URL;
  return dbUrl && !dbUrl.includes("your_postgres_connection_string");
};

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    if (!isDbConfigured()) {
      const local = getLocalCreations();
      const filtered = local.filter(
        (c) => c.user_id === userId || c.user_id === "current"
      );
      return res.json({ success: true, creations: filtered });
    }

    const result = await sql.query(
      "SELECT * FROM creations WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json({ success: true, creations: result.rows });
  } catch (error) {
    console.warn("getUserCreations error, falling back to local:", error.message);
    const local = getLocalCreations();
    res.json({ success: true, creations: local });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    if (!isDbConfigured()) {
      const local = getLocalCreations();
      const published = local.filter((c) => c.publish === true);
      return res.json({ success: true, creations: published });
    }

    const result = await sql.query(
      "SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC"
    );

    res.json({ success: true, creations: result.rows });
  } catch (error) {
    console.warn("getPublishedCreations error, falling back to local:", error.message);
    const local = getLocalCreations();
    res.json({ success: true, creations: local.filter((c) => c.publish === true) });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const result = await sql.query("SELECT * FROM creations WHERE id = $1", [
      id,
    ]);

    const creation = result.rows[0];

    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation Unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    await sql.query("UPDATE creations SET likes = $1 WHERE id = $2", [
      updatedLikes,
      id,
    ]);

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};