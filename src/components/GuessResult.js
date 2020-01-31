import React, { Component } from 'react';
import Text from '../components/Text';

import Typography from '@material-ui/core/Typography';

export default class GuessResult extends Component {
    render() {
        let wordList = this.props.guessedWords;
        const type = this.props.listType;

        if (type === 'before') {
            wordList = wordList.slice(-5);
        }
        else {
            wordList = wordList.slice(0, 5);
        }

        return (
            <section className='guess-results'>
                <div className='guess-results__list'>
                    {/* wordList.length === 0 ? '' : <Typography variant="h5">Your target word is {type}:</Typography> */}
                    {wordList.map((word, i) => <span className="guess-results__item"><Text text={word} key={i + '-' + type} /></span> )}
                </div>
            </section>
        )
    }
}
