import { readData, writeData } from "../DAl/riddlesDAL.js";

function getNextRiddleId(riddles) {
    if (riddles.length === 0) return 1;
    return Math.max(...riddles.map(r => Number(r.id))) + 1;
}


export async function addRiddle(newRiddle) {


    const riddles = await readData("./DB/riddles.txt");

    const newId = getNextRiddleId(riddles);

    const newRiddleWithId = {
        ...newRiddle,
        id: newId.toString()
    };



    riddles.push(newRiddleWithId);
    await writeData("./DB/riddles.txt", JSON.stringify(riddles, null, 2));

    return newRiddleWithId;
}