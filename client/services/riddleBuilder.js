import { Riddle } from "../models/Riddle.js";

// This function takes a raw list of riddle data and converts it into an array of Riddle objects
// Each item in the raw list is expected to be an object with properties that match the Riddle class constructor
// It returns an array of Riddle instances
export function buildRiddlesFromData(rawList) {

  return rawList.map(item => new Riddle(item));
}
export function buildRiddleFromData(rawData) {
  return new Riddle(rawData);
}
