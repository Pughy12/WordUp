import basicWords from './basicWords';
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

        console.log('building all words from ' + this.basicWords.length + 'basic and ' + dWords.length + ' dynamic');

        this.allWords = [...this.basicWords, ...dWords];
        console.log("# All words: " + this.allWords.length);

        return this.allWords.sort();
    };
}

export default new WordStore();
