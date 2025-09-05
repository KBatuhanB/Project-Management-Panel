const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017"; 
const dbName = "Projeler"; 
const collectionName = "Projeler"; 

let db, collection;

async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  collection = db.collection(collectionName);
}

connectDB();

// Tüm projeleri getir
app.get("/api/projects", async (req, res) => {
  const projects = await collection.find({}).toArray();
  res.json(projects);
});

// Proje ekle
app.post("/api/projects", async (req, res) => {
  const { name } = req.body;
  // Aynı isimde proje var mı kontrol et
  const existing = await collection.findOne({ name });
  if (existing) {
    return res.status(409).json({ success: false, message: "Bu isimde bir proje zaten var!" });
  }
  const result = await collection.insertOne(req.body);
  res.json({ ...req.body, _id: result.insertedId });
});

// Proje sil
app.delete("/api/projects/:id", async (req, res) => {
  await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

// Proje güncelle
app.put("/api/projects/:id", async (req, res) => {
  const { _id, ...updateFields } = req.body;
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );
    console.log("Update result:", result);
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "No document found to update." });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("API running on http://localhost:5000"));