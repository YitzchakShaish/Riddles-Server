import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
console.log(process.env.URI);
const uri = process.env.URI || "mongodb+srv://y350380350:T60XOkCeZYQ29G0c@cluster0.vc13nyb.mongodb.net";


// Create a new MongoClient
// This client will be used to connect to the MongoDB database
const client = new MongoClient(uri);
let db;


// Function to connect to the MongoDB database
// This function returns a promise that resolves to the database object
export async function connectToDatabase() {
    try {
        if (db) {
            console.log('Connecting to MongoDB...')
            return db
        }
        await client.connect();
        db = client.db('riddlesGame');
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

