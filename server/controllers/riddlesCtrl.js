
import { createRiddle, readAllRiddles, readRiddle, updateRiddle, deleteRiddle } from "../DAL/riddlesDAL.js";



// POST /riddles/addRiddle
export const addRiddle = async (req, res) => {
  const { name, taskDescription, correctAnswer } = req.body;
 if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const created = await createRiddle({ name, taskDescription, correctAnswer });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//GET all riddles
export const getAllRiddles = async (req, res) => {

  try {
    const allRiddles = await readAllRiddles();
    res.status(200).json(allRiddles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /riddles/:id 

export const getRiddleById = async (req, res) => {
  const id = Number(req.params.id);
  
  if (!id) {
    return res.status(400).json({ error: 'Id params is required' });
  }
  try {
    const riddle = await readRiddle(id);
    if (!riddle) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(riddle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//PUT riddles/:id

export const updateRiddleById = async (req, res) => {
  const id = Number(req.params.id);  // 

  if (!id) {
    return res.status(400).json({ error: 'Id params is required' });
  }
  const { name, taskDescription, correctAnswer } = req.body;

  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }
    try {
    const updateed = await updateRiddle(id, { name, taskDescription, correctAnswer });
    if (!updateed) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(updateed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//DELETE riddles/id
export const deleteRiddleById =  async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await deleteRiddle(id);
    if (!deleted) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// router.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);

//   db.delete(id, (err, deletedItem) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (!deletedItem) return res.status(404).json({ error: "Riddle not found" });
//     res.status(200).json({ message: "Riddle deleted successfully", deleted: deletedItem });
//   });
// });



