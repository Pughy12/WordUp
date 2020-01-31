import React, { Component } from 'react';
import SubmitButton from '../components/SubmitButton';
import GuessInput from '../components/GuessInput';
import GifMeAHintButton from '../containers/GifMeAHint';

export default class GuessForm extends Component {
    submitHandler = (event) => {
        event.preventDefault()
        this.props.handleSubmitGuess()
    }

    render() {
        const handleTextUpdate = this.props.handleTextUpdate;
        const guessText = this.props.guessText;
        const errorMessage = this.props.errorMessage;
        const error = (errorMessage) ? true : false;

        return (
            <form className="guess-form" onSubmit={this.submitHandler}>
                <GuessInput guessText={guessText} errorMessage={errorMessage} handleTextUpdate={handleTextUpdate}  />
                <SubmitButton error={error} />
                <GifMeAHintButton wordToGuess={this.props.wordToGuess}/>
            </form>
        );
    }
}
