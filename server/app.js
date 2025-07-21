import express from "express";
import riddlesR from "./routers/riddlesR.js";
import playersR from "./routers/playersR.js";

import {config} from "dotenv";
config()
const PORT = process.env.PORT || 8080;


const app = express();
app.use(express.json());

// use routs riddles
app.use("/riddles", riddlesR);

// use routs players
app.use("/players", playersR);

// Error handling middleware
app.use((req, res) => {
  console.log(req.ip);
  
    res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:"+PORT);
});
