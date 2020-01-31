import React, { Component } from 'react';
import BetweenStateStore from '../stores/betweenStateStore';
import Text from '../components/Text'
import GuessForm from '../components/GuessForm';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';

class BetweenGame extends Component {

    componentDidMount = () => {
        BetweenStateStore.newGameState();
    }

    handleTextUpdate = (inputText) => {
        BetweenStateStore.setGuessText(inputText);
        BetweenStateStore.setErrorMessage('');
    }

    handleGuess = () => {
        const guess = BetweenStateStore.getGuessText();



        //     const guess = BetweenStateStore.getGuessText();
        //     const wordToGuess = BetweenStateStore.getWordToGuess();
        //     const guessedWords = [...BetweenStateStore.getGuessedWordsBefore(), ...GuessMyWordStateStore.getGuessedWordsAfter()];

        //     if (wordService.wordIsValid(guess)) {

        //         if (guessedWords.includes(guess)) {
        //             const errorMessage = 'Originality is key...'
        //             GuessMyWordStateStore.setErrorMessage(errorMessage);
        //             return;
        //         }

        //         GuessMyWordStateStore.incrementNGuesses();

        //         // Check for exact match first
        //         if (wordService.wordsMatch(guess, wordToGuess)) {
        //             this.win();
        //             return;
        //         }

        //         // Check before / after if not correct
        //         if (wordService.wordIsBefore(guess, wordToGuess)) {
        //             this.handleGuessNotCorrect(guess, 'before');
        //         }
        //         else {
        //             this.handleGuessNotCorrect(guess, 'after');
        //         }
        //     }
        //     else {
        //         const errorMessage = 'Please enter an actual word'
        //         GuessMyWordStateStore.setErrorMessage(errorMessage);
        //     }
    }

    render() {
        const guessText = BetweenStateStore.getGuessText();
        const errorMessage = BetweenStateStore.getErrorMessage();

        return (
            // first word
            <div>
                <img src="/logo.png" alt="Word Up!" />
                <Typography variant="h3">Find the words in-between</Typography>
                <div>
                    <Text text={ BetweenStateStore.getStartWord() } />
                </div>
                <div>
                    <GuessForm guessText={guessText} errorMessage={errorMessage} handleTextUpdate={this.handleTextUpdate} handleSubmitGuess={this.handleGuess} />
                </div>
                <div>
                    <Text text={ BetweenStateStore.getEndWord() } />
                </div>
            </div>
        );
    }
}

export default observer(BetweenGame);
