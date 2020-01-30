import Axios from 'axios';

class WordFileLoader {
    constructor() {
        this.words = [];
    }

    loadWords = (callback) => {
        //Load data via GET request
        Axios.get(
            `/words/words.txt`
        ).then(response => {
            if (!response) {
                return;
            }

            this.words = response.data.split("\n");
            console.log("Loaded " + this.words.length + " words");
            if (this.words.length > 0) {
                callback(this.words);
                console.log("Updated WordStore with dynamically loaded words");
            }
        });
    }

    getWords = () => this.words;
}

export default new WordFileLoader();
