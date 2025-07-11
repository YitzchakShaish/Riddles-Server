import express from "express";
import riddlesR from "./routers/riddlesR.js";

const app = express();
app.use(express.json());

// use routs riddles
app.use("/riddles", riddlesR);

// Error handling middleware
app.use((req, res) => {
  console.log(req.ip);
  
    res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
