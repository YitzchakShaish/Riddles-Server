import express from "express";
import riddlesR from "./routers/riddlesR.js";
import playersR from "./routers/playersR.js";
import authR from "./routers/authR.js";
import cookieParser from 'cookie-parser';


import {config} from "dotenv";
config()
const PORT = process.env.PORT || 8080;


const app = express();
// Middleware to parse cookies
app.use(cookieParser());


app.use(express.json());



// use routs login and signup
app.use("/", authR);


// use routs riddles
app.use("/riddles", riddlesR);

// use routs players
app.use("/players", playersR);

// Error handling middleware
app.use((req, res) => {
  console.log(req.ip);
  
    res.status(404).json('Not found');
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:"+PORT);
});
