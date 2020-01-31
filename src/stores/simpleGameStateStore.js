import { extendObservable } from 'mobx';
import wordService from '../services/wordService';

/**
 * mobx observed game state store for the simple game mode
 */
class SimpleGameStateStore {

    constructor() {
        extendObservable(this, {
            wordToGuess: null,
            guessedWordsBefore: [],
            guessedWordsAfter: [],
            guessText: '',
            gifUrl: '',
            nGuesses: 0,
            errorMessage: '',
        });
    }

    newGameState = () => {
        this.setWordToGuess(wordService.pickGuessWord());
        this.setGuessedWordsBefore();
        this.setGuessedWordsAfter();
        this.setGuessText();
        this.setGifUrl();
        this.setNGuesses();
        this.setErrorMessage();
    }

    getWordToGuess = () => this.wordToGuess;
    setWordToGuess = (word) => this.wordToGuess = word || null;

    /**
     * @returns a copy of the before array
     */
    getGuessedWordsBefore = () => [...this.guessedWordsBefore];
    setGuessedWordsBefore = (words) => this.guessedWordsBefore = words || [];

    /**
     * @returns a copy of the after array
     */
    getGuessedWordsAfter = () => [...this.guessedWordsAfter];
    setGuessedWordsAfter = (words) => this.guessedWordsAfter = words || [];

    getGuessText = () => this.guessText;
    setGuessText = (text) => this.guessText = text || '';

    getGifUrl = () => this.gifUrl;
    setGifUrl = (url) => this.gifUrl = url || 'https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif';

    getNGuesses = () => this.nGuesses;
    setNGuesses = (n) => this.nGuesses = n || 0;

    getErrorMessage = () => this.errorMessage;
    setErrorMessage = (message) => this.errorMessage = message || '';
}

export default new SimpleGameStateStore();
