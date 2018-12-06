const DASH = '_';

//Letter Constructor
const Letter = function(character) {
  this.character = character;
  this.isGuessed = (this.character === ' ') ? true: false;

  this.guessedLetter = guessedChar => {
    guessedChar = guessedChar.toUpperCase();
    if(guessedChar === this.character){
      this.isGuessed = true;
      return true;
    }
    return false;
  }
}

Letter.prototype.toString = function() {
	return (this.isGuessed) ? this.character : DASH;
  }

module.exports = Letter;