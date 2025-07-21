import { getRiddles } from "../api/riddlesApi.js";
import { buildRiddlesFromData } from "../services/riddleBuilder.js";
import { waitForEnter } from "../utils/wait.js";
import { updateMinTimeAPI } from "../api/playersApi.js";

export async function playRiddleGame(player, playerId) {
  console.log("\n--- Starting the Game ---\n");
  // console.log(player, playerId);

  try {
    const riddles = await getRiddles();
    //console.log("Retrieved Riddles:", riddles);

    const builtRiddles = buildRiddlesFromData(riddles);
    //console.log(builtRiddles);

    for (const riddle of builtRiddles) {
      const start = Date.now();
      riddle.ask(); // assuming this includes user interaction
      const end = Date.now();

      player.recordTime(start, end);
      console.log(`Time: ${(end - start) / 1000} seconds\n`);
    }

    const avgTime = player.showStats();
    // console.log(`pl${playerId} ag ${(avgTime)}`);


    const result = await updateMinTimeAPI(playerId, avgTime);

    if (result.success) {
      console.log(result.message);
      console.log('Your best time:', result.bestTime);
    } else {
      console.log('Update failed:', result.message);
    }
    // waitForEnter();

  } catch (error) {
    console.error("Failed to play game:", error.message);
  }
}


