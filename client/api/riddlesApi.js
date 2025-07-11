
export async function getRiddles() {
    const response = await fetch("http://localhost:3000/riddles");
    const riddles = await response.json();
    //console.log("Show all riddles:", riddles);
   return riddles;
   
}
export async function getRiddleById(id) {
    const response = await fetch(`http://localhost:3000/riddles/${id}`);
    const riddle = await response.json();
    //console.log("Show riddle by id: "+id, riddle);
   return riddle;
   
}

export async function createRiddle(Name, TaskDescription, correctAnswer) {
  const res = await fetch("http://localhost:3000/riddles/addRiddle", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: Name,
      taskDescription: TaskDescription,
      correctAnswer: correctAnswer
    })
  });
  const data = await res.json();
  console.log("Saved Riddle:", data);
}
export async function updateRiddle(id, Name, TaskDescription, correctAnswer) {
  const res = await fetch(`http://localhost:3000/riddles/update/${id}`, {
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
export async function deleteRiddle(id) {
  const res = await fetch(`http://localhost:3000/riddles/delete/${id}`, {
    method: 'DELETE'
  });

  const data = await res.json();
  console.log("Deleted Riddle:", data);
}

// addRiddle("math", "2^5", "32")
// //getRiddleById(3);
// deleteRiddle(2)