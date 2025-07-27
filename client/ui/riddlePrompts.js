import rl from 'readline-sync';
import {
  createRiddle,
  updateRiddle,
  deleteRiddle,
  getRiddles,
  getRiddleById
} from '../api/riddlesApi.js';
import { buildRiddlesFromData } from '../utils/riddleBuilder.js';

// Ask user for riddle details and create a new one
export async function promptAndCreateRiddle() {
  console.log("\n--- Create a New Riddle ---");

  const name = rl.question("Enter riddle name: ");
  const taskDescription = rl.question("Enter riddle description: ");
  const correctAnswer = rl.question("Enter the correct answer: ");

  try {
    await createRiddle(name, taskDescription, correctAnswer);
    console.log("Riddle created successfully.\n");
  } catch (error) {
    console.error("Failed to create riddle:", error.message);
  }
}

// Ask user for riddle ID and show its details
export async function promptAndGetRiddleById() {
  console.log("\n--- Get Riddle by ID ---");

  const id = rl.question("Enter riddle ID: ");

  try {
    const riddle = await getRiddleById(id);
    console.log("\nRiddle details:");
    console.log(riddle);
  } catch (error) {
    console.error("Failed to retrieve riddle:", error.message);
  }
}

// Fetch and display all riddles
export async function promptAndListAllRiddles() {
  console.log("\n--- Play the Game ---");

  try {
    const riddles = await getRiddles();
    const newRiddles = buildRiddlesFromData(riddles);
    newRiddles.forEach(riddle => {
      riddle.ask();
    });
  } catch (error) {
    console.error("Failed to fetch riddles:", error.message);
  }
}

// Ask user for riddle ID and new details to update it
export async function promptAndUpdateRiddle() {
  console.log("\n--- Update Riddle ---");

  const id = rl.question("Enter riddle ID to update: ");
  const name = rl.question("Enter new riddle name: ");
  const taskDescription = rl.question("Enter new riddle description: ");
  const correctAnswer = rl.question("Enter new correct answer: ");

  try {
    await updateRiddle(id, name, taskDescription, correctAnswer);
    console.log("Riddle updated successfully.\n");
  } catch (error) {
    console.error("Failed to update riddle:", error.message);
  }
}

// Ask user for riddle ID and delete it
export async function promptAndDeleteRiddle() {
  console.log("\n--- Delete Riddle ---");

  const id = rl.question("Enter riddle ID to delete: ");

  const confirm = rl.question("Are you sure you want to delete this riddle? (yes/no): ");
  if (confirm.toLowerCase() !== "yes") {
    console.log("Deletion cancelled.\n");
    return;
  }

  try {
    await deleteRiddle(id);
    console.log("Riddle deleted successfully.\n");
  } catch (error) {
    console.error("Failed to delete riddle:", error.message);
  }
}
// promptAndGetRiddleById();