class SimpleGameStateStore {

    constructor() {
        this.wordToGuess = null;
        this.guessedWordsBefore = [];
        this.guessedWordsAfter = [];
        this.guessText = '';
        this.gifUrl = '';
        this.nGuesses = 0;
        this.errorMessage = '';
    }

    getWordToGuess = () => this.wordToGuess;
    setWordToGuess = (word) => this.wordToGuess = word || null;

    getGuessedWordsBefore = () => this.guessedWordsBefore;
    setGuessedWordsBefore = (words) => this.guessedWordsBefore = words || [];

    getGuessedWordsAfter = () => this.guessedWordsAfter;
    setGuessedWordsAfter = (words) => this.guessedWordsAfter = words || [];

    getGuessText = () => this.guessText;
    setGuessText = (text) => this.guessText = text || '';

    getGifUrl = () => this.gifUrl;
    setGifUrl = (url) => this.gifUrl = url || 'https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif';
}

export default new SimpleGameStateStore();
