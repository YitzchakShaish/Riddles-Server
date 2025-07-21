
import { createRiddle, readAllRiddles, readRiddle, updateRiddle, deleteRiddle } from "../temp/riddlesDAL.js";
import { getRiddleByIdFDB, getAllRiddlesFDB, insertNewRiddleTDB, insertManyNewRiddlesTDB, updateRiddleTDB ,deleteRiddleFDB} from  "../temp/riddlesDalMongodb.js"



// POST /riddles/addRiddle
// This function adds a new riddle to the database
// It expects a JSON body with the riddle's name, taskDescription, and correctAnswer
export const addRiddle = async (req, res) => {
  const { name, taskDescription, correctAnswer } = req.body;
 if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }
  try {
    const created = await insertNewRiddleTDB({ name, taskDescription, correctAnswer });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /riddles/load-initial-riddles
// This function loads initial riddles from the request body
// It expects an array of riddles in the request body
export const loadInitialRiddles = async (req, res) => {
  console.log(req.body);
  
  for (const riddle of req.body) {
    const { name, taskDescription, correctAnswer } = riddle;
    if (!name || !taskDescription || !correctAnswer) {
      return res.status(400).json({ error: "Missing fields in riddle" });
    }
    try {
      const created = await insertManyNewRiddlesTDB(req.body);
      //console.log(created);
      return res.status(201).json({ message: "Riddles loaded successfully" });
      // if (!created.success) { 
      //   return res.status(500).json({ error: created.error });
      // }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

//GET all riddles
// This function retrieves all riddles from the database
// It returns a JSON array of riddles
export const getAllRiddles = async (req, res) => {

  try {
    const allRiddles = await getAllRiddlesFDB();
    res.status(200).json(allRiddles.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /riddles/:id 
// This function retrieves a riddle by its ID
// It expects the ID to be passed as a URL parameter
export const getRiddleById = async (req, res) => {
  const id = req.params.id;
  
  if (!id) {
    return res.status(400).json({ error: 'Id params is required' });
  }
  try {
    const riddle = await getRiddleByIdFDB(id);
    if (!riddle) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(riddle.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//PUT riddles/:id
// This function updates a riddle by its ID
// It expects the ID to be passed as a URL parameter and the updated riddle data in the request body
// It returns the updated riddle as a JSON object
export const updateRiddleById = async (req, res) => {
  const id = req.params.id;  // 

  if (!id) {
    return res.status(400).json({ error: 'Id params is required' });
  }
  const { name, taskDescription, correctAnswer } = req.body;

  if (!name || !taskDescription || !correctAnswer) {
    return res.status(400).json({ error: "Missing fields" });
  }
    try {
    const updateed = await updateRiddleTDB(id, { name, taskDescription, correctAnswer });
    if (!updateed) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(updateed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//DELETE riddles/id
// This function deletes a riddle by its ID
// It expects the ID to be passed as a URL parameter
export const deleteRiddleById =  async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await deleteRiddleFDB(id);
    if (!deleted) return res.status(404).json({ error: "Riddle not found" });
    res.status(200).json(deleted.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




