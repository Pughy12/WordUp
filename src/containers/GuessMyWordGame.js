import React, { Component } from 'react';
import GuessForm from '../components/GuessForm';
import GuessResult from '../components/GuessResult';
import WinModal from '../components/WinModal';
import ViewHiscores from '../containers/ViewHiscores';
import wordService from '../services/wordService';
import Typography from '@material-ui/core/Typography';
import GuessMyWordStateStore from '../stores/guessMyWordStateStore';
import { observer } from 'mobx-react';

class GuessMyWordGame extends Component {

    componentDidMount = () => {
        GuessMyWordStateStore.newGameState();
    }

    handleTextUpdate = (inputText) => {
        GuessMyWordStateStore.setGuessText(inputText);
        GuessMyWordStateStore.setErrorMessage('');
    }

    handleGuess = () => {
        const guess = GuessMyWordStateStore.getGuessText();
        const wordToGuess = GuessMyWordStateStore.getWordToGuess();
        const guessedWords = [...GuessMyWordStateStore.getGuessedWordsBefore(), ...GuessMyWordStateStore.getGuessedWordsAfter()];

        if (wordService.wordIsValid(guess)) {

            if (guessedWords.includes(guess)) {
                const errorMessage = 'Originality is key...'
                GuessMyWordStateStore.setErrorMessage(errorMessage);
                return;
            }

            GuessMyWordStateStore.incrementNGuesses();

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
            GuessMyWordStateStore.setErrorMessage(errorMessage);
        }
    }

    win = () => {
        console.log("=========================== WIN ===========================")
        GuessMyWordStateStore.setWinModalOpen(true);
    }

    handleGuessNotCorrect = (guess, result) => {
        const beforeGuesses = GuessMyWordStateStore.getGuessedWordsBefore();
        const afterGuesses = GuessMyWordStateStore.getGuessedWordsAfter();

        if (result === 'before') {
            beforeGuesses.push(guess);
            GuessMyWordStateStore.setGuessedWordsBefore(beforeGuesses);
        }
        else if (result === 'after') {
            afterGuesses.push(guess);
            GuessMyWordStateStore.setGuessedWordsAfter(afterGuesses);
        }

        GuessMyWordStateStore.setGuessText('');
    }

    render() {
        console.log("====================== Render ======================");

        const wordToGuess = GuessMyWordStateStore.getWordToGuess();
        const guessedWordsBefore = GuessMyWordStateStore.getGuessedWordsBefore();
        const guessedWordsAfter = GuessMyWordStateStore.getGuessedWordsAfter();
        const guessText = GuessMyWordStateStore.getGuessText();
        const errorMessage = GuessMyWordStateStore.getErrorMessage();

        return (
            <div>
                <img src="/logo.png" alt="Word Up!" />
                <Typography variant="h3">Guess the word of which I am thinking</Typography>
                <GuessResult listType='before' guessedWords={guessedWordsBefore} />
                <GuessForm guessText={guessText} errorMessage={errorMessage} handleTextUpdate={this.handleTextUpdate} handleSubmitGuess={this.handleGuess} wordToGuess={wordToGuess}/>
                <GuessResult listType='after' guessedWords={guessedWordsAfter} />
                <ViewHiscores />
                <WinModal />
            </div>
        );
    }
}

export default observer(GuessMyWordGame);
