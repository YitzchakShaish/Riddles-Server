import { question } from "readline-sync";
import chalk from 'chalk';


class Riddle {
    constructor({_id, name, taskDescription, correctAnswer}) {
        this.id = _id;
        this.name = name;
        this.taskDescription = taskDescription;
        this.correctAnswer = correctAnswer;
    }

    //
    ask() {
        let enswer;
    
        while (enswer !== this.correctAnswer) {
        
            enswer = question(chalk.blue(this.taskDescription + " "));

            if (enswer === this.correctAnswer) {
                console.log(chalk.green(`Correct answer!`));
            }
            else {
                console.log(chalk.red(`Wrong answer, please try again.`));
            }
        }
    }

}



export {Riddle} ;