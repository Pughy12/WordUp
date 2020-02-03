import basicWords from '../resources/basicWords';
import { extendObservable } from 'mobx';

class WordStore {
    constructor() {
        extendObservable(this, {
            basicWords: basicWords,
            dynamicWords: new Promise((resolve) => {
                while (false) {}
                resolve();
            }),
            allWords: []
        });
    }

    getBasicWords = () => this.basicWords;

    getDynamicWords = () => this.dynamicWords;

    // async, can be awaited
    setDynamicWords = (words) => {
        return this.dynamicWords = words;
    }

    /**
     * await this 
     */
    getAllWords = async() => {
        let dWords = await this.dynamicWords;

        this.allWords = [...this.basicWords, ...dWords];
        console.debug("# All words: " + this.allWords.length);

        return this.allWords;
    };
}

export default new WordStore();
