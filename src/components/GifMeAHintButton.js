import React, { Component } from 'react';
import gifService from "../services/gifService";
import Button from "@material-ui/core/Button";

export default class GifMeAHintButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifUrl: '',
            show: false
        };
    }

    getAGif = async() => {
        const { wordToGuess } = this.props;
        const gif = await gifService.gifMeAHint(wordToGuess);
        this.setState({ gifUrl: gif, show: true });
    };

    render() {
        const { show, gifUrl } = this.state;
        const { wordToGuess } = this.props;
        const displayValue = show ? 'block' : 'none';
        console.log('giphy ' + wordToGuess);

        return (
            <div className="hint-container">
                <Button variant="contained" color="secondary" onClick={this.getAGif}>GIF me a hint :)</Button>
                <img style = {{ display: displayValue }} src = { gifUrl } alt="Nice try" / >
            </div>
        );
    }
}
