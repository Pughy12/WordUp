import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react";
import GuessMyWordStateStore from "../stores/guessMyWordStateStore";

class GifMeAHint extends Component {
    GUESSES_FOR_HINT = 3;

    constructor(props) {
        super(props);

        this.state = {
            currentGif: ''
        }
    }

    getAGif = () => {
        const urls = GuessMyWordStateStore.getGifUrls();

        this.setState({
            currentGif: urls.pop()
        });

        GuessMyWordStateStore.setGifUrls(urls);
        GuessMyWordStateStore.setShowGif(true);
    };

    render() {
        const gifUrl = this.state.currentGif;
        const showGif = GuessMyWordStateStore.getShowGif();
        const showButton = ((GuessMyWordStateStore.getNGuesses() >= this.GUESSES_FOR_HINT) && GuessMyWordStateStore.getGifUrls().length);
        const buttonText = (GuessMyWordStateStore.getGifUrls().length === 3) ? 'GIF me a hint :)' : 'GIF me another';
        const { wordToGuess } = this.props;

        return (
            <div className="hint-container">
                { showGif && <img src = { gifUrl } alt="Nice try" title="Nice try" / > }
                { showButton && <div><Button variant="contained" color="secondary" onClick={this.getAGif}>{buttonText}</Button></div> }
            </div>
        );
    }
}

export default observer(GifMeAHint);
