import { extendObservable } from 'mobx';
import WordService from '../services/wordService';
import GifService from "../services/gifService";

/**
 * mobx observed game state store for the guess my word game mode
 */
class GuessMyWordStateStore {

    constructor() {
        extendObservable(this, {
            wordToGuess: null,
            guessedWordsBefore: [],
            guessedWordsAfter: [],
            guessText: '',
            gifUrls: [],
            nGuesses: 0,
            showGif: false,
            errorMessage: '',
            winModalOpen: false
        });
    }

    newGameState = () => {
        this.setWordToGuess(WordService.pickGuessWord());
        this.setGuessedWordsBefore();
        this.setGuessedWordsAfter();
        this.setGuessText();
        this.setGifUrls(GifService.getGifs(this.getWordToGuess()));
        this.setShowGif(false);
        this.setNGuesses();
        this.setErrorMessage();
        this.setWinModalOpen(false);
    }

    getWordToGuess = () => this.wordToGuess;
    setWordToGuess = (word) => this.wordToGuess = word || null;

    /**
     * @returns a copy of the before array
     */
    getGuessedWordsBefore = () => [...this.guessedWordsBefore];

    /**
     * sorts the provided array before setting
     */
    setGuessedWordsBefore = (words) => this.guessedWordsBefore = (words || []).sort();

    /**
     * @returns a copy of the after array
     */
    getGuessedWordsAfter = () => [...this.guessedWordsAfter];

    /**
     * sorts the provided array before setting
     */
    setGuessedWordsAfter = (words) => this.guessedWordsAfter = (words || []).sort();

    getGuessText = () => this.guessText;
    setGuessText = (text) => this.guessText = text || '';

    getGifUrls = () => this.gifUrls;
    setGifUrls = (urls) => this.gifUrls = urls || ['https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif'];

    getNGuesses = () => this.nGuesses;
    setNGuesses = (n) => this.nGuesses = n || 0;
    incrementNGuesses = () => this.nGuesses++;

    getShowGif = () => this.showGif;
    setShowGif = (show) => this.showGif = show;

    getErrorMessage = () => this.errorMessage;
    setErrorMessage = (message) => this.errorMessage = message || '';

    getWinModalOpen = () => this.winModalOpen;
    setWinModalOpen = (open) => this.winModalOpen = open;
}

export default new GuessMyWordStateStore();
