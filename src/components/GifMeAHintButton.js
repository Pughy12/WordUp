import React, { Component } from 'react';
import gifService from "../services/gifService";
import { Button, Modal } from "@material-ui/core";

export default class GifMeAHintButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifUrl: '',
            show: false,
            open: false
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    getAGif = async() => {
        const { wordToGuess } = this.props;
        const gif = await gifService.gifMeAHint(wordToGuess);
        this.setState({ gifUrl: gif, show: true, open: true });
    };

    render() {
        const { show, gifUrl } = this.state;
        const { wordToGuess } = this.props;
        const displayValue = show ? 'block' : 'none';
        console.log('giphy ' + wordToGuess);

        return (
            <div className="hint-container">
                <Button variant="contained" color="secondary" onClick={this.getAGif}>GIF me a hint :)</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div>
                        <img style={{display: displayValue}} src={gifUrl} alt="Nice try" / >
                    </div>
                </Modal>
            </div>
        );
    }
}
