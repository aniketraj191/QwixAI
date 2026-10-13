import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "../data");
const dataFile = path.join(dataDir, "creations.json");

function ensureFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
  }
}

export function getLocalCreations() {
  try {
    ensureFile();
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading local creations:", err.message);
    return [];
  }
}

export function saveLocalCreation(creation) {
  try {
    ensureFile();
    const creations = getLocalCreations();
    const newEntry = {
      id: "local_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      ...creation,
      created_at: creation.created_at || new Date().toISOString(),
      likes: creation.likes || [],
    };
    creations.unshift(newEntry);
    fs.writeFileSync(dataFile, JSON.stringify(creations, null, 2));
    return newEntry;
  } catch (err) {
    console.error("Error saving local creation:", err.message);
    return null;
  }
}

export function updateLocalCreationLikes(id, updatedLikes) {
  try {
    ensureFile();
    const creations = getLocalCreations();
    const index = creations.findIndex((c) => c.id === id);
    if (index !== -1) {
      creations[index].likes = updatedLikes;
      fs.writeFileSync(dataFile, JSON.stringify(creations, null, 2));
      return creations[index];
    }
    return null;
  } catch (err) {
    console.error("Error updating local creation likes:", err.message);
    return null;
  }
}
