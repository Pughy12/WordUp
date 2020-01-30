import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class SubmitButton extends Component {
    render() {
        const error = this.props.error;

        return (
            <Button type="submit" variant="contained" color="primary" disabled={error}>Submit</Button>
        );
    }
}
