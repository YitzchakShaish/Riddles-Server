import { authFetch } from "./authApi.js";

// client/api/riddlesApi.js
// This file contains functions to interact with the riddles API.



// This function fetches all riddles from the server
// It returns a promise that resolves to an array of riddle objects
export async function getRiddles() {
    const response = await fetch("http://localhost:3000/riddles");
    const riddles = await response.json();
    //console.log("Show all riddles:", riddles);
   return  riddles;
   
}


// This function fetches a riddle by its ID from the server
// It returns a promise that resolves to a riddle object
export async function getRiddleById(id) {
    const response = await authFetch(`http://localhost:3000/riddles/${id}`);
    const riddle = await response.json();
    //console.log("Show riddle by id: "+id, riddle);
   return riddle;
   
}

// This function creates a new riddle on the server
// It takes the riddle name, task description, and correct answer as parameters


export async function createRiddle(Name, TaskDescription, correctAnswer) {
  const res = await authFetch("http://localhost:3000/riddles/addRiddle", {
    method: 'POST',
    body: JSON.stringify({
      name: Name,
      taskDescription: TaskDescription,
      correctAnswer: correctAnswer
    })
  });

  const data = await res.json();
  console.log("Saved Riddle:", data);
}




// This function updates an existing riddle on the server
// It takes the riddle ID, new name, task description, and correct answer as parameters
export async function updateRiddle(id, Name, TaskDescription, correctAnswer) {
  const res = await authFetch(`http://localhost:3000/riddles/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: Name,
      taskDescription: TaskDescription,
      correctAnswer: correctAnswer
    })
  });

  const data = await res.json();
  console.log("Updated Riddle:", data);
}


// This function deletes a riddle by its ID from the server
// It sends a DELETE request to the server and logs the response
export async function deleteRiddle(id) {
  const res = await authFetch(`http://localhost:3000/riddles/${id}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  console.log("Deleted Riddle:", data);
}


//await createRiddle("mathe", "What is 2+2?", "4");

