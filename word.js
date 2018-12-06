const Letter = require("./letter");

const WordCategories = [{
	name: "programming",
	wordsList: ["JAVASCRIPT", "JAVA", "PYTHON", "PHP", "RUBY","C","GOLANG"]
},{
	name: "shows",
	wordsList: ["FRIENDS", "SURVIVOR", "DYNASTY", "SUPERNATURAL", "EMPIRE", "VIKINGS", "LEGACIES"]
},{
	name: "random",
	wordsList: ["PITTSBURGH", "NEWYORK", "BURGER", "HTML", "BEYONCE", "MAROON5", "HANGMAN"]
}];

//Word Constructor
const Word = function() {
  this.letters = [];
  this.guessWord = '';
  
  this.selectRandomWord = categoryIndex => {
		let wordBank = WordCategories[categoryIndex].wordsList;
		let randomEntry = Math.floor(Math.random() * wordBank.length);

		this.guessWord = wordBank[randomEntry].toUpperCase();

		// for each letter in the guessWord, create a letter object
		for (i = 0; i < this.guessWord.length; i++) {
			this.letters.push(new Letter(this.guessWord[i]));
		}
  };
  
		// for each letter, check to see if it is guessed and set it accordingly
  this.makeGuess = character => {
		var found = false;
		for (i = 0; i < this.letters.length; i++) {
			let letterFound = this.letters[i].guessedLetter(character);
			if (letterFound) {
				found = true;
			};
		}
		return found;
	};

	this.wordSolved = () => {
		for (i = 0; i < this.letters.length; i++) {
			if (this.letters[i].isGuessed === false) {
				return false;
			}
		}
		return true;
  }
}

Word.prototype.toString = function() {
	let gameWord = '';
		for (i = 0; i < this.letters.length; i++) {
		gameWord = gameWord + " " + this.letters[i];
	}
	gameWord = gameWord + "\n";
	return gameWord;
};

module.exports = Word;