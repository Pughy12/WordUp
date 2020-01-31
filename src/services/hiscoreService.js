import Axios from 'axios';

//Management URL: http://dreamlo.com/lb/WMOaw808tUCnNdPDR6gUjgHBlq93oJ60KCUeu0zoWIUA
//Limit of 1000 entries in hiscore table
const privateApiKey = 'WMOaw808tUCnNdPDR6gUjgHBlq93oJ60KCUeu0zoWIUA';
const publicApiKey = '5e3413a9fe22df1a24ef8fd5';
const baseServiceUrl = 'http://dreamlo.com/lb/';
const getHiscoresPath = `${baseServiceUrl}${publicApiKey}/json`;
const submitHiscorePath = `${baseServiceUrl}${privateApiKey}/add/`;

var calculateHiscore = function(numGuesses, numAssists) {
    const score = 100 - Math.max(0, (numGuesses - 1)) - (numAssists * 10);
    console.log(`Calculated score; # Guesses: ${numGuesses}, # Assists: ${numAssists}, Score: ${score}`);
    return score;
}

/**
 * Hiscore service - currently only supports hiscores for 'Guess My Word' game
 */
const hiscoreFunctions = {
    getHiscores: async => {
        return Axios.get(
            getHiscoresPath, { crossdomain: true }
        ).then(response => {
            if (!response) {
                return;
            }

            console.log('Raw hiscores: ' + response.data);

            var leaderboard = response.data.dreamlo.leaderboard;

            if (leaderboard == null) {
                return [];
            }

            //Reference: [{"name":"Carmine","score":"100","seconds":"0","text":"","date":"1/31/2020 11:48:07 AM"},...]
            return leaderboard.entry;
        });
    },
    calculateHiscore: (numGuesses, numAssists) => {
        const score = 100 - Math.max(0, (numGuesses - 1)) - (numAssists * 10);
        // console.log(`Calculated score; # Guesses: ${numGuesses}, # Assists: ${numAssists}, Score: ${score}`);
        return score;
    },
    submitHiscore: async(username, numGuesses, numAssists) => {

        //score can be negative if you're really bad
        const score = hiscoreFunctions.calculateHiscore(numGuesses, numAssists);
        console.log(`User: ${username}, # Guesses: ${numGuesses}, # Assists: ${numAssists}, Score: ${score}`);

        return Axios.get(
            submitHiscorePath + `${username}/${score}`, { crossdomain: true }
        ).then(response => {
            if (!response) {
                return;
            }

            console.log(`Submitted hiscore; User: ${username}, Score: ${score}, Response: ${response.data}`);
        });
    },
};

export default hiscoreFunctions;
