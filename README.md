# Constructor Word Guess Node App

**Author**: Swaroop Kondreddy

Feel free to use some or all of this code if you're trying to complete a similar project.

###  Project Overview
This is a word guess CLI app that utilizes constructor functions.

###  How It Works 

- Type ```node game.js``` into the command line to start the app.

- A prompt screen will appear, providing detailed instructions on how to play the game. You will have to choose an option to start the game.
  
- When prompted to guess a letter, press any letter (a-z) on the keyboard to guess a letter and hit enter.
  
- Your choice will be correct or incorrect. You will receive a message if you enter more than one letter at a time.

- For every incorrect guess, the number of guesses decreases by one.

- If correct, the letter you guessed populates the corresponding _ in the word.

- You win if you correctly guess all the letters in the word before the number of guesses remaining equals 0.

- You lose if you run out of guesses before the entire word is revealed. Then you will be asked if you would like to play again, if yes then the game continues else the game is over.

- You can exit the game at any time by pressing Ctrl + C on your keyboard.




### Technology and Packages used

[Node.js](https://nodejs.org/en/)

[Inquirer](https://www.npmjs.com/package/inquirer)

[Chalk](https://www.npmjs.com/package/chalk)

[Figlet](https://www.npmjs.com/package/figlet)

[clear](https://www.npmjs.com/package/clear)

[Inquirer-MaxLenght-Input-Prompt](https://www.npmjs.com/package/inquirer-maxlength-input-prompt)

[node-emoji](https://www.npmjs.com/package/node-emoji)

  
### Executing the Project

1. Once you have the keys [clone](https://github.com/swaroopreddyk/wordGuess.git) this project.
2. Then run the following command to install the requied node packages  
`npm install`
3. Look at the below GIF's on the execution details
    ![liri-execution-gif](./img/liri.gif)