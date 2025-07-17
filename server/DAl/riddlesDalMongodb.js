import { connectToDatabase } from "../DB/mongodb.js";
import { ObjectId } from "mongodb";


// Connect to the riddles collection
// This function returns a promise that resolves to the riddles collection
async function connectToRiddlesCollection() {
    const db = await connectToDatabase();
    return await db.collection('riddles');
}


// Function to get a riddle by its ID
// This function returns a promise that resolves to the riddle document
export async function getRiddleByIdFDB(id) {
    try {
        const riddlesCollection = await connectToRiddlesCollection();
        const result = await riddlesCollection.findOne({ "_id": new ObjectId(id) })
        //console.log(result);
        if (!result) {
            return { success: false, data: null, error: 'user not found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }

}

// Function to get all riddles
// This function returns a promise that resolves to an array of riddle documents
export async function getAllRiddlesFDB() {
    try {
        const riddlesCollection = await connectToRiddlesCollection();
        const result = await riddlesCollection.find().toArray();

        if (!result || result.length === 0) {
            return { success: false, data: null, error: 'No riddles found' };
        }

        return { success: true, data: result, error: null };
    } catch (error) {
        console.log(`error: concted to mongodb`);

        return { success: false, data: null, error };
    }
}


// Insert a new riddle
// This function returns a promise that resolves to the inserted riddle document
export async function insertNewRiddleTDB(riddle) {
    const riddlesCollection = await connectToRiddlesCollection();

    try {
        const result = await riddlesCollection.insertOne(riddle);

        if (!result.acknowledged) {
            return { success: false, data: null, error: 'Insert failed' };
        }

        return { success: true, data: result.insertedId, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
}


// Insert many riddles
// This function returns a promise that resolves to the inserted riddle documents
// Note: This function expects an array of riddles
export async function insertManyNewRiddlesTDB(riddles) {
    const riddlesCollection = await connectToRiddlesCollection();

    try {
        const result = await riddlesCollection.insertMany(riddles);

        if (!result.acknowledged || Object.keys(result.insertedIds).length === 0) {
            return { success: false, data: null, error: 'Insert failed or empty insert' };
        }

        return { success: true, data: result.insertedIds, error: null };
    } catch (error) {
        return { success: false, data: null, error };
    }
}

// Update a riddle by its ID
// This function returns a promise that resolves to the updated riddle document
export async function updateRiddleTDB(id, riddle) {
    try {
        const riddlesCollection = await connectToRiddlesCollection();

        const result = await riddlesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: riddle }
        );
        // console.log(result);

        if (result.modifiedCount === 0) {
            return { success: false, error: 'No riddle updated' };
        }

        return { success: true, error: null, data: "The riddle was updated successfully" };

    } catch (error) {
        return { success: false, error };
    }
}

// Delete a riddle by its ID
// This function returns a promise that resolves to the deleted riddle document
export async function deleteRiddleFDB(id) {
    try {
        const riddlesCollection = await connectToRiddlesCollection();

        const result = await riddlesCollection.deleteOne(
            { _id: new ObjectId(id) }
        );

        if (result.modifiedCount === 0) {
            return { success: false, error: 'No riddle deleted' };
        }

        return { success: true, error: null ,data: "riddle deleted successfully"};

    } catch (error) {
        return { success: false, error };
    }
}

