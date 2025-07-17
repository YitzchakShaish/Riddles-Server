import { getRiddles } from "../api/riddlesApi.js";
import { buildRiddlesFromData } from "../services/riddleBuilder.js";
import { waitForEnter } from "../utils/wait.js";

export async function playRiddleGame(player) {
  console.log("\n--- Starting the Game ---\n");

  try {
    const riddles = await getRiddles();
    console.log("Retrieved Riddles:", riddles);
    
    const builtRiddles = buildRiddlesFromData(riddles);

    for (const riddle of builtRiddles) {
      const start = Date.now();
      riddle.ask(); // assuming this includes user interaction
      const end = Date.now();

      player.recordTime(start, end);
      console.log(`Time: ${(end - start) / 1000} seconds\n`);
    }

    player.showStats();
    waitForEnter();

  } catch (error) {
    console.error("Failed to play game:", error.message);
  }
}
