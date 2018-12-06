const inquirer = require('inquirer');
const Word = require('./word');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
const emoji = require('node-emoji');

const LINE_DIVIDER = "=".repeat(120);
let guesses = 5;

const initApp = () => {
  inquirer.registerPrompt('max-length-input', MaxLengthInputPrompt)
  clear();
  figlet("HANGMAN", (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.hex('#008080')(data));
    //Welcome screen text.
    console.log(chalk.hex('8EFF0D')("Welcome to Hangman"));
    //Game instructions.
    let gameInstructions =
      chalk.hex('#E89C0C')(LINE_DIVIDER + "\r\n" +
        "How to play" + "\r\n" +
        LINE_DIVIDER + "\r\n" +
        "When prompted to guess a letter, press any letter (a-z) on the keyboard to guess a letter and hit enter." + "\r\n" +
        "Your choice will be correct or incorrect. You will receive a message if you enter more than one letter at a time." + "\r\n" +
        "For every incorrect guess, the number of guesses decreases by one." + "\r\n" +
        "If correct, the letter you guessed populates the corresponding _ in the word." + "\r\n" +
        "You win if you correctly guess all the letters in the word before the number of guesses remaining equals 0." + "\r\n" +
        "You lose if you run out of guesses before the entire word is revealed. The next word will display." + "\r\n" +
        LINE_DIVIDER + "\r\n" +
        chalk.red("You can exit the game at any time by pressing Ctrl + C on your keyboard.") + "\r\n" +
        LINE_DIVIDER)
    console.log(gameInstructions);
    console.log(chalk.hex('8EFF0D')("Choose your theme to play...."));
    startGame();
  });
};

const startGame = () => {
  inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'Are you ready to play? Choose a Category',
    choices: ['Programming Languages', 'TV Shows', 'Random Word']
  }]).then(answers => {
    //Default Category Index is to pick a random word
    let categoryIndex = 2;
    if (answers.choice === 'Programming Languages') {
      categoryIndex = 0;
    } else if (answers.choice === 'TV Shows') {
      categoryIndex = 1;
    } else {
      categoryIndex = 2;
    }

    playGame(categoryIndex);
  });
};

const playGame = categoryIndex => {
  let gameWord = new Word();
  let guessedLetters = [];
  // get the random word
  gameWord.selectRandomWord(categoryIndex);
  console.log(chalk.yellow("\n***NEW GAME***\n"));
  displayWord(gameWord);

  requestUserInput(gameWord, guessedLetters);
};

const displayWord = ele => {
  //using prototype with toString()
  console.log(ele + '');
};

const requestUserInput = (gameWord, guessedLetters) => {
  if (guesses > 0) {
    inquirer.prompt([{
      type: 'max-length-input',
      message: "Guess a letter!",
      name: "letter",
      maxLength: 1,
      validate: input => {
        //Validate only alphabet is entered *** using REGEX to validate
        return ((/[a-zA-Z]/).test(input)) ? true : 'Please enter alphabet only: ';
      }
    }]).then(response => {
      let input = response.letter;
      if(guessedLetters.indexOf(input) == -1){
        guessedLetters.push(input);

        let letterExists = gameWord.makeGuess(input);

        if(letterExists){
          console.log(chalk.green("Correct"));
        }else {
          guesses--;
          console.log(chalk.red("Incorrect"));
        }

        console.log(chalk.yellow(`\nYou have ${guesses} chance(s) left\n`));

        if (guesses != 0) {
          displayWord(gameWord);
        };

        if (!gameWord.wordSolved()) {
          requestUserInput(gameWord, guessedLetters);
        } else {
          console.log(chalk.hex('008080')(emoji.get('star') + "You have cracked the Word!" + emoji.get('star')));
          continueGame();
        } 
      }else {
        console.log(chalk.cyan("\nYou've already guessed this letter. Guess again.\n"));
        requestUserInput(gameWord, guessedLetters);
      }
    })

  } else {
    console.log(chalk.red(emoji.get('thumbsdown') + "  GAME OVER.\n"));
    console.log(chalk.green(`The answer was: ${gameWord.guessWord}. Play again.\n`));
    continueGame();
  }
};

const continueGame = () =>{
  inquirer.prompt([{
    type: 'confirm',
    name: 'toContinue',
    message: 'Do you want to play again?',
    default: false
  },]).then(response => {
    if (response.toContinue) {
      startGame();
    } else {
     console.log(chalk.bgCyan.bold("Sad to see you go...and thanks for Playing!!!"))
    } 
  });
}

//Initialize App to play game
initApp();