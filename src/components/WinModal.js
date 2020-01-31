import React, { Component } from 'react';
import guessMyWordStateStore from '../stores/guessMyWordStateStore';
import hiscoreService from '../services/hiscoreService';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';

class WinModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    handleOpen = () => {
        guessMyWordStateStore.setWinModalOpen(true);
    }

    handleClose = () => {
        if (this.state.username.length > 0) {
            const numGuesses = guessMyWordStateStore.getNGuesses();
            const numAssists = 3 - guessMyWordStateStore.getGifUrls().length;
            // console.log(`handleClose; numGuesses: ${numGuesses}, numAssists: ${numAssists}, GIF URLS: ${guessMyWordStateStore.getGifUrls()}`);
            hiscoreService.submitHiscore(this.state.username, numGuesses, numAssists);
        }
        else {
            alert('No username submitted');
            return;
        }

        guessMyWordStateStore.setWinModalOpen(false);
        this.setState({
            username: ''
        });
        guessMyWordStateStore.newGameState();
    }

    handleUpdateUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        const open = guessMyWordStateStore.getWinModalOpen();
        const numGuesses = guessMyWordStateStore.getNGuesses();
        const numAssists = 3 - guessMyWordStateStore.getGifUrls().length;
        const score = hiscoreService.calculateHiscore(numGuesses, numAssists);
        return (
            <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={this.handleClose}
                >
                    <div className='hiscores-modal-container'>
                      <h2 id="simple-modal-title">A winner is you!</h2>
                      <Typography variant="body1">You did it in { numGuesses } guesses, using { numAssists } assists, for a score of { score }.</Typography>
                      <TextField 
                        type = "text"
                        placeholder = "Your name"
                        label = "Required"
                        value = { this.state.username }
                        onChange = { this.handleUpdateUsername } required / >
                      <Button variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
                    </div>
                </Modal>
        );
    }
}

export default observer(WinModal)
