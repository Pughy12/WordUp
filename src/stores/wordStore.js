import WordFileLoader from './wordFileLoader';
import basicWords from './basicWords';

class WordStore {
    constructor() {
        //Setup basic word list first
        this.basicWords = basicWords;
        console.log("# Hard coded words: " + this.basicWords.length);

        this.allWords = [...this.basicWords];

        //Load the full word list
        this.dynamicWords = [];
        WordFileLoader.loadWords(this.setWords);
    }

    getBasicWords = () => this.basicWords;

    getAllWords = () => this.allWords;

    setWords = (words) => {
        this.dynamicWords = words || [];
        console.log("# Dynamic words: " + this.dynamicWords.length);

        this.allWords = Array.from(new Set(this.basicWords.concat(this.dynamicWords)));
        this.allWords.sort();
        console.log("# All words: " + this.allWords.length);
    };
}

export default new WordStore();
