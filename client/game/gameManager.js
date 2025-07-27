// gameManager.js

import chalk from 'chalk';
import Player from '../models/Player.js';

import { showInitialMenu, showMenu } from '../ui/displayRiddle.js';
//import { waitForEnter } from '../utils/wait.js';

import { handleLogin } from '../auth/authFlow.js';
import { handleInitialMenu, handleMenuChoice } from './menuHandlers.js';

export async function runRiddleGame() {
  console.log(chalk.green(`Welcome to the Riddle Game!`));

  let playerData = null;

  while (!playerData) {
    const choice = await showInitialMenu();
    playerData = await handleInitialMenu(choice);
  }

  // Ensure playerData has a role-login
  while (!playerData?.role) {
    console.log(chalk.red('You must log in to receive your role. Please try again.'));
    playerData = await handleLogin(playerData?.name || playerData?.username);
  }

  console.log(`Hello, ${playerData.name}!`);
  const player = new Player(playerData.name);
  const { playerId, role: userRole } = playerData;

  let runningGame = true;
  while (runningGame) {
    const choice = await showMenu(userRole);
    const shouldContinue = await handleMenuChoice(choice, player, playerId, userRole);
    if (!shouldContinue) runningGame = false;
  }

  console.log("Goodbye!");
}
