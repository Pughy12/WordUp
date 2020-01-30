import React, { Component } from 'react';
import Text from '../components/Text';

import Typography from '@material-ui/core/Typography';

export default class GuessResult extends Component {
    render() {
        const guessedWordsBefore = this.props.guessedWordsBefore;
        const guessedWordsAfter = this.props.guessedWordsAfter;

        return (
            <section className='guess-results'>
                <div className='guess-results__list'>
                    {guessedWordsBefore.length === 0 ? '' : <Typography variant="h5">Your target word is after:</Typography>}
                    {guessedWordsBefore.map((word, i) => <Text text={word} key={i} /> )}
                </div>
                <div className='guess-results__list'>
                    {guessedWordsAfter.length === 0 ? '' : <Typography variant="h5">Your target word is before:</Typography>}
                    {guessedWordsAfter.map((word, i) => <Text text={word} key={i} /> )}
                </div>
            </section>
        )
    }
}
