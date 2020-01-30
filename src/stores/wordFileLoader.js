class WordFileLoader {
    constructor() {
        this.words = [];
    }

    loadWords = (callback) => {
        //Load data via GET request
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.words = xhr.responseText.split("\n");
            console.log("Loaded " + this.words.length + " words");
            if (this.words.length > 0) {
                callback(this.words);
                console.log("Updated WordStore with dynamically loaded words");
            }
        });
        //TODO[SG]: call ourselves via localhost???
        // xhr.open('GET', 'http://bbb64825b91244d6b35b40ab9fe48447.vfs.cloud9.eu-west-1.amazonaws.com/words/words.txt');
        xhr.open('GET', '/words/words.txt');
        xhr.send();
    }

    getWords = () => this.words;
}

export default new WordFileLoader();
