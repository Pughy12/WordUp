import { extendObservable } from 'mobx';
import WordStore from './wordStore';

/**
 * mobx observed game state store for the between words game mode
 */
class BetweenStateStore {
    constructor() {
        extendObservable(this, {
            startWord: null,
            endWord: null,
            validWords: null,
            foundWords: [],
            guessText: '',
            errorMessage: '',
        });
    }

    newGameState = async() => {
        // this is a slight hack to stop us asking for all words before dynamic words are ready
        await WordStore.getDynamicWords();

        const gameValues = await this.pickBetweenWords();

        this.setStartWord(gameValues.startWord);
        this.setEndWord(gameValues.endWord);
        this.setValidWords(gameValues.validWords);
    }

    setStartWord = (word) => this.startWord = word || null;

    setEndWord = (word) => this.endWord = word || null;

    setValidWords = (words) => this.validWords = words || null;

    /**
     * Picks two words for player to find words between
     */
    pickBetweenWords = async(wordLength = 4) => {
        const words = await WordStore.getAllWords();

        console.log('Words retrieved in pickBetweenWords function: ' + words.length);

        const numBetweenWords = 50;
        let wordsSubset = [];

        // Don't allow a word length lower than 4 letters
        wordLength = (wordLength < 4) ? 4 : wordLength;

        words.forEach((word) => {
            if (word.length === wordLength) {
                wordsSubset.push(word);
            }
        });

        let startIndex = Math.floor(Math.random() * (wordsSubset.length - numBetweenWords - 1));

        // Quick fix for possible situation where startIndex could be less than 0
        if (startIndex < 0) {
            startIndex = 0;
        }

        const betweenWords = wordsSubset.splice(startIndex, numBetweenWords);

        return {
            startWord: wordsSubset[startIndex - 1],
            endWord: wordsSubset[startIndex + numBetweenWords],
            betweenWords: betweenWords
        }
    }

    setGuessText = (text) => this.guessText = text;
    setErrorMessage = (message) => this.errorMessage = message;

    getStartWord = () => this.startWord;
    getEndWord = () => this.endWord;
    getGuessText = () => this.guessText;
    getErrorMessage = () => this.errorMessage;
}

export default new BetweenStateStore();
