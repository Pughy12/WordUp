import Axios from 'axios';
import WordStore from '../stores/wordStore';

export default {
    /**
     * Picks the word to be guessed
     */
    pickGuessWord: () => {
        const validWords = WordStore.getBasicWords();
        const word = validWords[Math.floor(Math.random() * validWords.length)];
        console.debug("Word to guess is: " + word);

        return word;
    },

    /**
     * Checks if word is before another alphabetically
     */
    wordIsBefore: (wordChecked, wordToCheckAgainst) => {
        return [wordChecked, wordToCheckAgainst].sort()[0] === wordChecked;
    },

    /**
     * Checks if word is after another alphabetically
     */
    wordIsAfter: (wordChecked, wordToCheckAgainst) => {
        return [wordChecked, wordToCheckAgainst].sort()[1] === wordChecked;
    },

    /**
     * Checks if word is in store
     */
    wordIsValid: async(word) => {
        const validWords = await WordStore.getAllWords();
        return validWords.some(entry => word.toLowerCase() === entry.toLowerCase());
    },

    /**
     * Checks if two words are the same word 
     */
    wordsMatch: (first, second) => {
        return first === second;
    },

    /**
     * async method to get load words from file
     */
    loadWords: () => {
        //Load data via GET request (async)
        WordStore.setDynamicWords(
            Axios.get(`/words/words.txt`)
            .then(response => {
                if (!response) {
                    return [];
                }

                const words = response.data.split("\n");
                console.debug("Loaded " + words.length + " words");

                if (words.length === 0) {
                    console.warn("No extra words loaded :(");
                }

                return (words);
            })
        )
    }
};
