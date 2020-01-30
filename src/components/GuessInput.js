import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

export default class GuessInput extends Component {
    updateState = event => {
        this.props.handleTextUpdate(event.target.value);
    }

    render() {
        const errorMessage = this.props.errorMessage;
        const error = (errorMessage) ? true : false;

        return ( <
            TextField type = "text"
            placeholder = "Guess the word"
            label = "Required"
            value = { this.props.guessText } onChange = { this.updateState } helperText = { errorMessage } error = { error } required / >
        );
    }
}
