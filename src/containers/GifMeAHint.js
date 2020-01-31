import React, { Component } from 'react';
import gifService from "../services/gifService";
import Button from "@material-ui/core/Button";

export default class GifMeAHint extends Component {
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
        console.log("giphy " + wordToGuess);

        return (
            <div className="hint-container">
                { !show && <Button variant="contained" color="secondary" onClick={this.getAGif}>GIF me a hint :)</Button> }
                { show && <img src = { gifUrl } alt="Nice try" / > }
            </div>
        );
    }
}
