import Axios from 'axios';

export default {
    gifMeAHint: async word => {
        return Axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=L7r7s1uSLaFLNJ2pFG8lLaFHE7LSagWV&q=${word}&limit=1&offset=0&rating=G&lang=en`
        ).then(response => {
            if (!response) {
                return;
            }

            return response.data.data[0].images.original.webp;
        });
    },
};
