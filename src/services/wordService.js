// Stores
import WordStore from '../stores/wordStore';

export default {
    /**
     * Picks the word to be guessed
     */
    pickGuessWord: () => {
        const validWords = WordStore.getBasicWords();
        const word = validWords[Math.floor(Math.random() * validWords.length)];
        console.log("Word to guess is: " + word);

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
    wordIsValid: (word) => {
        const validWords = WordStore.getAllWords();
        return validWords.some(entry => word.toLowerCase() === entry.toLowerCase());
    },

    /**
     * Checks if two words are the same word 
     */
    wordsMatch: (first, second) => {
        return first === second;
    }
};
