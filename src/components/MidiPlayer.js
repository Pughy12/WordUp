import React, { Component } from 'react';
// import midi_file from 'public/word-up.mid';

export default class MidiPlayer extends Component {

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
