import React, { Component } from 'react';
import GuessForm from '../containers/GuessForm';
import GuessResult from '../containers/GuessResult';
import wordService from '../services/wordService';
import Typography from '@material-ui/core/Typography';

export default class SimpleGame extends Component {

    constructor(props) {
        super(props);

        this.state = SimpleGame.provideNewGameState();
    }

    static provideNewGameState = () => {
        const baseState = {
            wordToGuess: null,
            guessedWordsBefore: [],
            guessedWordsAfter: [],
            guessText: '',
            errorMessage: '',
        };

        const newState = { ...baseState };

        newState.wordToGuess = wordService.pickGuessWord();

        return newState;
    }

    componentDidMount = () => {
        // this.setState(SimpleGame.provideNewGameState());
    }

    handleTextUpdate = (inputText) => {
        this.setState({ guessText: inputText, errorMessage: '' });
    }

    handleGuess = () => {
        const guess = this.state.guessText;

        if (wordService.wordIsValid(guess)) {

            // Check for exact match first
            if (wordService.wordsMatch(guess, this.state.wordToGuess)) {
                this.win();
                return;
            }

            // Check before / after if not correct
            if (wordService.wordIsBefore(guess, this.state.wordToGuess)) {
                this.handleGuessNotCorrect(guess, 'before');
            }
            else {
                this.handleGuessNotCorrect(guess, 'after');
            }
        }
        else {
            const errorMessage = 'Please enter an actual word'
            this.setState({ errorMessage: errorMessage });
        }
    }

    win = () => {
        console.log("=========================== WIN =====================")
        var numGuesses = this.state.guessedWordsBefore.length + this.state.guessedWordsAfter.length + 1;
        this.setState(SimpleGame.provideNewGameState());
        alert('You win!!! # Guesses: ' + numGuesses);
    }

    handleGuessNotCorrect = (guess, result) => {
        const beforeGuesses = [...this.state.guessedWordsBefore];
        const afterGuesses = [...this.state.guessedWordsAfter];

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
