import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Text extends Component {

    render() {
        const text = this.props.text;

        return (
            <Typography component="p">{text}</Typography>
        )
    }
}
