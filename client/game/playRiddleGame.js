import { getRiddles } from "../api/riddlesApi.js";
import { buildRiddlesFromData } from "../utils/riddleBuilder.js";
import { waitForEnter } from "../utils/wait.js";
import { updateMinTimeAPI, updateSumGames } from "../api/playersApi.js";
import chalk from "chalk";

export async function playRiddleGame(player, playerId, role) {
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
    if (role ==='guest'){
      console.log("You played as a guest. No stats will be saved.");
      return
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
  const games = await updateSumGames(playerId);
  
  if (games.success) {
    console.log("Total games played updated successfully.");
    console.log(chalk.green(`Your total games is: ${games.total_games}`));
  } else {
    console.log("Failed to update total games played.");
  }
}


