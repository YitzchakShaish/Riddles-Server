import JsonFileCRUD from "json-file-crud";

const db = new JsonFileCRUD('./DB/riddles.txt');

export function createRiddle(riddle) {
  return new Promise((resolve, reject) => {
    db.create(riddle, (err, created) => {
      if (err) return reject(err);
      resolve(created);
    });
  });
}

export function readAllRiddles(){
  return new Promise((resolve,reject) => {
    db.readAll((err, riddles) => {
      if(err) return reject(err);
      resolve(riddles)
    })
  })
}
export function readRiddle(id){
  return new Promise((resolve,reject) => {
     db.findById(id, (err, riddle) =>  {
      if(err) return reject(err);
      resolve(riddle)
    })
  })
}

export function updateRiddle(id, riddle) {
  return new Promise((resolve, reject) => {
    db.update(id, riddle, (err, updated) => {
      if (err) return reject(err);
      resolve(updated);
    });
  });
}


export function deleteRiddle(id) {
  return new Promise((resolve, reject) => {
    db.delete(id, (err, deleted) => {
      if (err) return reject(err);
      if (!deleted) return reject(new Error("Riddle not found"));
      resolve(deleted);
    });
  });
}

// db.readAll((err, riddles) => {
//   if (err) {
//     console.error("Error reading riddles:", err.message);
//   } else {
//     console.log("Riddles loaded:", riddles);
//   }
// });
