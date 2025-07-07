import http from "http";
import { readData, writeData } from "./DAl/riddlesDAL.js"
import { isGet, isPost, isPut, isDelete, isUrl } from "./Services/requestUtils.js";
import { addRiddle } from "./Services/riddles.services.js";

const PORT = 3002;
let data;

const server = http.createServer(async (req, res) => {
    if (isGet(req) && isUrl(req, "/riddles")) {
        try {
            const data = await readData("./DB/riddles.txt");
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(data));
        } catch (err) {
            res.writeHead(500, { "content-type": "application/json" });
            res.end(JSON.stringify({ err: "Failed to read data." }));
        }
    } 


 else if (isPost(req) && isUrl(req, "/riddles/addRiddle")) {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", async () => {
        try {
            const newRiddle = JSON.parse(body);
            const newRiddleWithId = await addRiddle(newRiddle);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newRiddleWithId));

        } catch (err) {
            console.error("Error adding riddle:", err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON or internal error" }));
        }
    });
}


    else if (isGet(req) && isUrl(req, "/")) {
        res.end("API running!");
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Page not found!");
    }
});
const server2 = http.createServer((req, res) => {
    const body = [];

    req.on("data", (chunk) => {
        body.push(chunk);
        console.log(chunk);
    });

    req.on("end", () => {
        try {
            const data = JSON.parse(Buffer.concat(body).toString());
            console.log(data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } catch (err) {
            console.error('JSON parse error:', err);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });

    req.on("error", (err) => {
        console.error('Request error: ', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
    });
});


export function serverListen() {
    server.listen(PORT, () => {
        console.log("Server runing on port: " + PORT);
    })
}