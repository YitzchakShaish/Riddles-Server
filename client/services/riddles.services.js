
export async function getRiddles() {
    const response = await fetch("http://localhost:3002/riddles");
    const riddles = await response.json();
   return riddles;
   
}


