import Player from '../models/Player.js'; 
import { question } from 'readline-sync';
import chalk from 'chalk';
import { getRiddles } from '../services/riddles.services.js';



console.log(chalk.green(`Welcome to the Riddle Game! `))
const name = question(`What is your name? `)
console.log(`Hello, ${name}!`);
//const gameStarts = question(`When the game starts, ask: `)


const player = new Player(name);   //, gameStarts
const allRiddles = await getRiddles();
console.log(allRiddles);

allRiddles.forEach((riddle) => {
       if (riddle.riddeleStarts == player.gameStarts) {
              const start = Date.now();
              riddle.ask();
              const end = Date.now();
              player.recordTime(start, end);
       }
});
player.showStats();