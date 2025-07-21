
export async function findOrCreatePlayer(playerName) {
  const res = await fetch("http://localhost:3000/players", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: playerName
    })
  });
  return  await res.json();
 
};


export async function updateMinTimeAPI(id, minTime) {
  const res = await fetch(`http://localhost:3000/players/${id}/record`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     best_avg_time: minTime
    })
  })
return await res.json();

};
// getTop5Players
export async function getTop5Players() {
    const response = await fetch(`http://localhost:3000/players/top`);
    const topPlayers = await response.json();
    //console.log("Show riddle by id: "+id, riddle);
   return topPlayers;
   
}

//   const result = await updateMinTimeAPI(2, 3);

//     ///const updateResult = await updateBestAvgTime(playerId, avg);
//     //console.log(`up  ` +updateResult);
    

// if (result.success) {
//     console.log(result.message);
//     console.log('Your best time:', result.bestTime);
// } else {
//     console.log('Update failed:', result.message);
// }