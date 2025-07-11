import { Riddle } from "../models/Riddle.js";

export function buildRiddlesFromData(rawList) {
  return rawList.map(item => new Riddle(item));
}
export function buildRiddleFromData(rawData) {
  return new Riddle(rawData);
}
