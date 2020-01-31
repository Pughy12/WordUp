import React, { Component } from 'react';
import GuessForm from '../containers/GuessForm';
import GuessResult from '../containers/GuessResult';
import wordService from '../services/wordService';
import Typography from '@material-ui/core/Typography';
import SimpleGameStateStore from '../stores/simpleGameStateStore';

export default class SimpleGameCopy extends Component {

    componentDidMount = () => {
        SimpleGameStateStore.newGameState();
    }

    handleTextUpdate = (inputText) => {
        SimpleGameStateStore.setGuessText(inputText);
        SimpleGameStateStore.setErrorMessage('');
    }

    handleGuess = () => {
        const guess = SimpleGameStateStore.getGuessText();
        const wordToGuess = SimpleGameStateStore.getWordToGuess();

        if (wordService.wordIsValid(guess)) {

            // Check for exact match first
            if (wordService.wordsMatch(guess, wordToGuess)) {
                this.win();
                return;
            }

            // Check before / after if not correct
            if (wordService.wordIsBefore(guess, wordToGuess)) {
                this.handleGuessNotCorrect(guess, 'before');
            }
            else {
                this.handleGuessNotCorrect(guess, 'after');
            }
        }
        else {
            const errorMessage = 'Please enter an actual word'
            SimpleGameStateStore.setErrorMessage(errorMessage);
        }
    }

    win = () => {
        console.log("=========================== WIN ===========================")
        const numGuesses = SimpleGameStateStore.getGuessedWordsBefore().length + SimpleGameStateStore.getGuessedWordsAfter().length + 1;

        SimpleGameStateStore.newGameState();
        alert('You win!!! # Guesses: ' + numGuesses);
    }

    handleGuessNotCorrect = (guess, result) => {
        const beforeGuesses = [...SimpleGameStateStore.getGuessedWordsBefore()];
        const afterGuesses = [...SimpleGameStateStore.getGuessedWordsAfter()];

        if (result === 'before') {
            beforeGuesses.push(guess);
        }
        else if (result === 'after') {
            afterGuesses.push(guess);
        }

        this.setState({ guessText: '', guessedWordsBefore: beforeGuesses.sort(), guessedWordsAfter: afterGuesses.sort() });
    }

    render() {
        console.log("====================== Render ======================");

        const wordToGuess = this.state.wordToGuess;
        const guessedWordsBefore = this.state.guessedWordsBefore;
        const guessedWordsAfter = this.state.guessedWordsAfter;
        const guessText = this.state.guessText;
        const errorMessage = this.state.errorMessage;

        return (
            <div>
                <Typography variant="h3">Guess the word I am thinking of</Typography>
                <GuessForm guessText={guessText} errorMessage={errorMessage} handleTextUpdate={this.handleTextUpdate} handleSubmitGuess={this.handleGuess} wordToGuess={wordToGuess}/>
                <GuessResult guessedWordsBefore={guessedWordsBefore} guessedWordsAfter={guessedWordsAfter} />
            </div>
        );
    }
}
