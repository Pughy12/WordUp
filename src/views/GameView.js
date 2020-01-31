import React, { Component } from 'react';
import SimpleGameCopy from '../containers/SimpleGameCopy';

export default class GameView extends Component {
    render() {
        return (
            <div className="word-up">
              <SimpleGameCopy />
            </div>
        );
    }
}
