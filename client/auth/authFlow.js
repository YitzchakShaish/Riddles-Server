import rl from 'readline-sync';
import { signup, login } from '../api/authApi.js';

export async function handleSignup() {
  const name = rl.question('Choose a username: ');
  const password = rl.question('Choose a password: ');
  // const role = rl.question('Choose role (player/admin): ');

  const response = await signup(name, password);

  if (response.status === 201) {
    console.log('Signup successful!');
    return response.json();
  } else if (response.status === 409) {
    console.log('User already exists. Redirecting to login...');
    return await handleLogin(name);
  } else {
    console.log('Signup failed:', response.json().message);
    return null;
  }
}

// export async function handleLogin(presetUsername = null) {
//   const name = presetUsername || rl.question('Enter your username: ');
//   const password = rl.question('Enter your password: ');

//   const response = await login(name, password);

//   if (response.status === 200) {
//     console.log('Login successful!');
//     return response.json();
//   } else if (response.status === 404) {
//     console.log('User not found. Want to sign up instead?');
//     const choice = rl.question('Type y/n: ');
//     if (choice.toLowerCase() === 'y') {
//       return await handleSignup();
//     }
//   } else {
//     console.log('Login failed:', response.message);
//   }

//   return null;
// }

export async function handleLogin(presetUsername = null) {
  const name = presetUsername || rl.question('Enter your username: ');
  const password = rl.question('Enter your password: ');

  const response = await login(name, password);
  console.log(`response`, response);
  

  if (response.status === 200) {
    console.log('Login successful!');
    return response.data
  } else if (response.status === 404) {
    console.log('User not found. Want to sign up instead?');
    const choice = rl.question('Type y/n: ');
    if (choice.toLowerCase() === 'y') {
      return await handleSignup();
    }
  } else {
    console.log('Login failed:', response.message);
  }

  return null;
}
