import { question } from "readline-sync";
export function waitForEnter() {
  console.log("Press Enter to continue...");
  question();
}