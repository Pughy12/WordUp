import React, { Component } from 'react';
import BetweenGame from '../containers/BetweenGame';
import WordService from '../services/wordService'

export default class GameView extends Component {

    componentDidMount() {
        WordService.loadWords();
    }

    render() {
        return (
            <div className="word-up">
              <BetweenGame />
            </div>
        );
    }
}
