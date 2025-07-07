import chalk from 'chalk';


class Player {
    times = [];
    constructor(name, gameStarts){
        this.name = name;
        this.gameStarts = gameStarts;
        this.playerScore= 0;
    }
    recordTime(start, end){
        const duration = end - start;
        this.times.push(duration);
    }
    showStats() {
  const total = this.times.reduce((sum, t) => sum + t, 0);
  const average = total / this.times.length;
  console.log(chalk.bold.magenta(`Total time: ${Math.round(total / 1000)} seconds`));
  console.log(chalk.bgMagenta.white(`Average per riddle: ${Math.round(average / 1000)} seconds`));
}
showPlayer(){
    console.log(`name: ${this.name}, Player score: ${this.playerScore}` );
}

}

export default Player