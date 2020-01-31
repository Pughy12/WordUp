import React, { Component } from 'react';
import Text from '../components/Text';

import Typography from '@material-ui/core/Typography';

export default class GuessResult extends Component {
    render() {
        // Only show max 5 elements in each list
        let guessedWordsBefore = this.props.guessedWordsBefore;
        guessedWordsBefore = guessedWordsBefore.slice(-5);

        let guessedWordsAfter = this.props.guessedWordsAfter;
        guessedWordsAfter = guessedWordsAfter.slice(0, 5);

        return (
            <section className='guess-results'>
                <div className='guess-results__list'>
                    {guessedWordsBefore.length === 0 ? '' : <Typography variant="h5">Your target word is after:</Typography>}
                    {guessedWordsBefore.map((word, i) => <span class="guess-results__item"><Text text={word} key={i} /></span> )}
                </div>
                <div className='guess-results__list'>
                    {guessedWordsAfter.length === 0 ? '' : <Typography variant="h5">Your target word is before:</Typography>}
                    {guessedWordsAfter.map((word, i) => <span class="guess-results__item"><Text text={word} key={i} /></span> )}
                </div>
            </section>
        )
    }
}
