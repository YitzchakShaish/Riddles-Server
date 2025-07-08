
export async function getRiddles() {
    const response = await fetch("http://localhost:3000/riddles");
    const riddles = await response.json();
    console.log("Show all riddles:", riddles);
   return riddles;
   
}
export async function getRiddleById(id) {
    const response = await fetch("http://localhost:3000/riddles/"+id);
    const riddles = await response.json();
    console.log("Show riddle by id: "+id, riddles);
   return riddles;
   
}

export async function addRiddle(Name, TaskDescription, correctAnswer) {
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

//addRiddle("math", "2^5", "32")
getRiddleById(2);