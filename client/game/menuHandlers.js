import { question } from 'readline-sync';
import { handleLogin, handleSignup } from '../ui/authUi.js';
import {
  promptAndCreateRiddle,
  promptAndDeleteRiddle,
  promptAndGetRiddleById,
  promptAndUpdateRiddle
} from '../ui/riddlePrompts.js';
import { getTop5Players } from '../api/playersApi.js';
import { waitForEnter } from '../utils/wait.js';
import { playRiddleGame } from './playRiddleGame.js';
import chalk from 'chalk';
import { logout } from '../api/authApi.js';

export async function handleInitialMenu(choice) {
  if (choice === '1') {
    const signup = await handleSignup();
    console.log(`signup:`, signup);
    return signup;
  }
  if (choice === '2') {
    const login = await handleLogin();
    console.log(`login:`, login);
    return login;
  }
  if (choice === '3') {
    const name = question('Enter your name (guest): ');
    return { playerId: null, role: 'guest', name }; // guest mode
  }
  if (choice === '0') {
    const result = await logout();
    console.log(result.message);
    console.log('Goodbye!');
    return null;
  }

  console.log(chalk.red('Invalid choice. Please try again.'));
  return null;
}

export async function handleMenuChoice(choice, player, playerId, role) {
  switch (choice) {
    case '1':
      await playRiddleGame(player, playerId, role);
      break;

    case '2':
      if (role === 'guest') {
        console.log('Adding riddles is for registered users only.');
      } else {
        await promptAndCreateRiddle();
      }
      break;

    case '3':
      if (role === 'guest') {
        console.log('Access denied. Registered users only.');
      } else {
        await promptAndGetRiddleById();
      }
      break;

    case '4':
      if (role !== 'admin') {
        console.log('Access denied. Admins only.');
      } else {
        await promptAndUpdateRiddle();
      }
      break;

    case '5':
      if (role !== 'admin') {
        console.log('Access denied. Admins only.');
      } else {
        await promptAndDeleteRiddle();
      }
      break;

    case '6':
      if (role !== 'admin') {
        console.log('Access denied. Admins only.');
      } else {
        const topPlayers = await getTop5Players();
        console.log(topPlayers);
      }
      break;

    case '0':
      const result = await logout();
      console.log(result.message);

      return false;

    default:
      console.log('Invalid choice. Please try again.');
  }

  waitForEnter();
  return true;
}
