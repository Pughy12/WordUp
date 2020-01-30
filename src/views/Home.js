import React, { Component } from 'react';
import SimpleGame from '../containers/SimpleGame';

export default class Home extends Component {
    render() {
        return (
            <div className="word-up">
              <SimpleGame />
            </div>
        );
    }
}
