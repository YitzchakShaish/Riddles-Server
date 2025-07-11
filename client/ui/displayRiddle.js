import rl from 'readline-sync';
export async function showMenu() {
  console.log('\n==============================');
  console.log('       RIDDLE GAME MENU');
  console.log('==============================');
  console.log('1. Play the game');
  console.log('2. Create a new riddle');
  console.log('3. Read riddle by ID');
  console.log('4. Update an existing riddle');
  console.log('5. Delete a riddle');
  console.log('6. View leaderboard');
  console.log('0. Exit');
  console.log('------------------------------');

  const choice = rl.question('Select an option: ');
  return choice;
}



