import rl from 'readline-sync';
export async function showInitialMenu() {
  console.log('\n==============================');
  console.log('    Welcome to Riddle Game!');
  console.log('==============================');
  console.log('1. Sign up');
  console.log('2. Login');
  console.log('3. Continue as Guest');
  console.log('0. Exit');
  console.log('------------------------------');
  const choice = rl.question('Select an option: ');
  return choice;
}



// export async function showMenu() {
//   console.log('\n==============================');
//   console.log('       RIDDLE GAME MENU');
//   console.log('==============================');
//   console.log('1. Play the game');
//   console.log('2. Create a new riddle');
//   console.log('3. Read riddle by ID');
//   console.log('4. Update an existing riddle');
//   console.log('5. Delete a riddle');
//   console.log('6. View leaderboard');
//   console.log('0. Exit');
//   console.log('------------------------------');

//   const choice = rl.question('Select an option: ');
//   return choice;
// }


export async function showMenu(role) {
  console.log('\n==============================');
  console.log('       RIDDLE GAME MENU');
  console.log('==============================');
  console.log(`Hello, ${role}!`);
  console.log('------------------------------');
  console.log('1. Play the game');

  if (role !== 'guest') {

    console.log('2. Add a Riddle');
    console.log('3. Get Riddle by ID');
  }

  if (role === 'admin') {
    console.log('4. Update Riddle by ID');
    console.log('5. Delete Riddle by ID');
    console.log('6. Show Top 5 Players');
  }

  console.log('0. Exit');
  console.log('------------------------------');
  const choice = rl.question('Select an option: ');
  return choice;
}

