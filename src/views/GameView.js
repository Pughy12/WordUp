import React, { Component } from 'react';
import GuessMyWordGame from '../containers/GuessMyWordGame';
import MidiPlayer from '../components/MidiPlayer';
import WordService from '../services/wordService'

export default class GameView extends Component {

    componentDidMount() {
        WordService.loadWords();
    }

    render() {
        return (
            <div className="word-up">
              <MidiPlayer />
              <GuessMyWordGame />
            </div>
        );
    }
}