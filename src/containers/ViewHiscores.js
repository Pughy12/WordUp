import React, { Component } from 'react';
import Text from '../components/Text';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

import hiscoreService from '../services/hiscoreService';

export default class ViewHiscores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            currentHiscores: []
        }
    }

    handleOpen = async() => {
        const hiscores = await hiscoreService.getHiscores();
        this.setState({
            open: true,
            currentHiscores: hiscores
        });
        console.log(`Current hiscores: ${this.state.currentHiscores}`);
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div className='hiscores-container'>
                <Button variant="contained" color="secondary" onClick={this.handleOpen}>View Hiscores</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className='hiscores-modal-container'>
                      <h2 id="simple-modal-title">Hiscores</h2>
                        <table>
                            <thead>
                                <tr><th>Name</th><th>Score</th><th>Date</th></tr>
                            </thead>
                            <tbody>
                                {this.state.currentHiscores.map((hiscore, i) => <tr key={i + '-hiscore'}><td>{hiscore.name}</td><td>{hiscore.score}</td><td>{hiscore.date}</td></tr>)}
                            </tbody>
                        </table>
                      <Button variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}
