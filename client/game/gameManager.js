import Player from '../models/Player.js';
import { question } from 'readline-sync';
import chalk from 'chalk';
import { showMenu } from '../ui/displayRiddle.js';
import {
  promptAndCreateRiddle,
  promptAndDeleteRiddle,
  promptAndGetRiddleById,
  promptAndListAllRiddles,
  promptAndUpdateRiddle
} from '../services/riddlesServices.js';
import { waitForEnter } from '../utils/wait.js';
import { playRiddleGame } from './playRiddleGame.js';
import { findOrCreatePlayer, getTop5Players } from '../api/playersApi.js';

console.log(chalk.green(`Welcome to the Riddle Game!`));
const name = question(`What is your name? `);
console.log(`Hello, ${name}!`);

const player = new Player(name);
const playerD = await findOrCreatePlayer(name);
console.log('playerD:', playerD);


while (true) {
  const choice = await showMenu();
  const shouldContinue = await handleMenuChoice(choice);
  if (!shouldContinue) break;
}




console.log("Goodbye!");

async function handleMenuChoice(choice) {
  switch (choice) {
    case '1':
      await playRiddleGame(player, playerD.playerId);
      waitForEnter();
      return true;
    case '2':
      await promptAndCreateRiddle();
        waitForEnter();
      return true;
    case '3':
      await promptAndGetRiddleById();
        waitForEnter();
      return true;
    case '4':
      await promptAndUpdateRiddle();
        waitForEnter();
      return true;
    case '5':
      await promptAndDeleteRiddle();
        waitForEnter();
      return true;
    case '6':
     
      // כאן וכדאי להוסיף במהשך פונקציה לצפיה במנצחים במשחק.. await showLeaderboard();
    const topPlayers = await getTop5Players();
    console.log(topPlayers);
    
        waitForEnter();
      return true;
    case '0':
      return false;
    default:
      console.log('Invalid choice. Please try again.');
      return true;
  }
}







