
var game = {


	idDisplayedWord: document.getElementById("displayed-word"),
	idWins: document.getElementById("wins"),
	idLosses: document.getElementById("losses"),
	idGuessesRemaining: document.getElementById("guesses-remaining"),
	idLettersGuessed: document.getElementById("letters-guessed"),

	wordList: ['pineapple', 'pearl harbor', 'beaches', 'sand', 'palm trees', 'cruise'],

	rndNumber: 0,
	currentWord: "",
	displayedWord: "",
	lettersGuessed: [],
	guessesRemaining: 10,
	winCount: 0,
	lossCount: 0,
	canPlay: false,

	startGame: function(){

		this.pickNewWord();
		this.displayedWord = "";
		this.genBlankDisplayedWord();
		this.lettersGuessed = [];
		this.guessesRemaining = 10;
		this.canPlay = true;

		
		this.idLosses.textContent = this.lossCount;
		this.idWins.textContent = this.winCount;
		this.idDisplayedWord.textContent = this.displayedWord;
		this.idLettersGuessed.textContent = this.lettersGuessed.join();
		this.idGuessesRemaining.textContent = this.guessesRemaining;


	},



	genRndNumber: function(){
		this.rndNumber = Math.floor(Math.random() * this.wordList.length);
		

	},

	genBlankDisplayedWord: function(){


		for(var i = 0; i < this.currentWord.length; i++){
			if(this.currentWord[i] === " "){
				this.displayedWord = this.displayedWord + " ";
			} else {
				this.displayedWord = this.displayedWord + "-";
				
			};
		};
	},

	pickNewWord: function(){
		this.genRndNumber();

		this.currentWord = this.wordList[this.rndNumber];
		
	},

	checkLetter: function(letter){
		if(this.lettersGuessed.indexOf(letter) == -1){

			if(this.currentWord.indexOf(letter) != -1){

				var pos = 0;

				
				while (this.currentWord.indexOf(letter, pos) != -1){

					pos = this.currentWord.indexOf(letter, pos);
					var end = pos + 1;

					var startText = this.displayedWord.substring(0, pos);
					var endText = this.displayedWord.substring(end, this.displayedWord.length);

					this.displayedWord = startText + letter + endText;
					pos = end;
				};
				
				this.idDisplayedWord.textContent = this.displayedWord;

				if(this.displayedWord.indexOf("-") == -1){

					alert("You win!  Press Enter to play again");
					this.canPlay = false;
					this.winCount += 1;

				};

				

				
				// if(this.lettersGuessed.indexOf(letter) == -1){
				// 	this.lettersGuessed.push(letter);
				// };

			} else {


				this.guessesRemaining = this.guessesRemaining - 1;

				if(this.guessesRemaining == 0){

					alert("Sorry, you lose... The word was " + this.currentWord);
					alert("Press Enter to play again");
					this.canPlay = false;
					this.lossCount += 1;

				};
				

				this.lettersGuessed.push(letter);

			};
		};

		this.idLosses.textContent = this.lossCount;
		this.idWins.textContent = this.winCount;
		this.idDisplayedWord.textContent = this.displayedWord;
		this.idLettersGuessed.textContent = this.lettersGuessed.join();
		this.idGuessesRemaining.textContent = this.guessesRemaining;

	},







};

//game.startGame();


document.onkeyup = function(event) {

	if (event.keyCode >= 65 && event.keyCode <= 90 && game.canPlay == true) {

		game.checkLetter(event.key);

	};

	if (event.keyCode == 13){

		game.startGame();
	}





};
















