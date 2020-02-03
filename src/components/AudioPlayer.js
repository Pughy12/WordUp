import React, { Component } from 'react';

export default class AudioPlayer extends Component {

    render() {
        return (
            <div>
                <audio preload="auto" autoPlay="autoplay">
                    <source src="word-up.mp3" type="audio/mpeg" />
                </audio>
            </div>
        );
    }

}
