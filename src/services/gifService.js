import Axios from 'axios';
import GuessMyWordStateStore from "../stores/guessMyWordStateStore";

const maxGifsToRequest = 3;

export default {
    getGifs: async word => {
        if (word === null || word.typeof === 'undefined' || word === undefined) {
            console.error('Tried to get a plane gif :(');
        }

        return Axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=L7r7s1uSLaFLNJ2pFG8lLaFHE7LSagWV&q=${word}&limit=${maxGifsToRequest}&offset=0&rating=G&lang=en`
        ).then(response => {
            if (!response) {
                return;
            }

            GuessMyWordStateStore.setGifUrls(response.data.data.map((gifObj) => gifObj.images.original.webp));
        });
    },
};
