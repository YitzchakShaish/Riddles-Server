import express from "express";
import { createCrud } from "json-file-crud";

const router = express.Router();
const db = createCrud("./DB/riddles.txt");

// POST /riddles/addRiddle
router.post("/addRiddle", (req, res) => {
  const { name, taskDescription, correctAnswer } = req.body;
  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.create({ name, taskDescription, correctAnswer }, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
});

router.get("/", (req, res) => {
  db.readAll((err, items) => {
    if (err) return res.status(500).json({ error: "DB read failed" });
    res.json(items);
  });
});
// GET /riddles/:id 
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);  

  db.findById(id, (err, item) => {
    if (err) return res.status(500).json({ error: "DB read failed" });
    if (!item) return res.status(404).json({ error: "Riddle not found" });
    res.json(item);
  });
});


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);  // המרה למספר
  const { name, taskDescription, correctAnswer } = req.body;

  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }

  db.update(id, { name, taskDescription, correctAnswer }, (err, updated) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!updated) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(updated);
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  db.delete(id, (err, deletedItem) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!deletedItem) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json({ message: "Riddle deleted successfully", deleted: deletedItem });
  });
});


export default router;
