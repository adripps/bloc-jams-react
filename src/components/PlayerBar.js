import React, { Component } from 'react';

class PlayerBar extends Component {
  formatTime(newTime) {
    if (newTime === undefined) {
      return "-:--"
    }
    let minutes = newTime / 60;
    let seconds = newTime % 60;
    return parseInt(minutes) + ":" + parseInt(seconds)
  }
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
            <ion-icon name="skip-backward"></ion-icon>
          </button>
            <button id="play-pause" onClick={this.props.handleSongClick} >
             <ion-icon name={this.props.isPlaying ? 'pause' : 'play'}></ion-icon>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
            <ion-icon name="skip-forward"></ion-icon>
          </button>
        </section>
        <section id="time-control">
        <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
        <input
          type="range"
          className="seek-bar"
          value={(this.props.currentTime / this.props.duration) || 0}
          max="1"
          min="0"
          step="0.01"
          onChange={this.props.handleTimeChange}
        />
        <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
        </section>
        <section id="volume-control">
          <ion-icon name="volume-low"></ion-icon>
          <input
            name='current-volume'
            type="range"
            className="volume-bar"
            value={(this.props.currentVolume)}
            max='100'
            min='0'
            step='1'
            onChange={this.props.handleVolumeChange}
          />
          <ion-icon name="volume-high"></ion-icon>
          <div className="current-volume">{this.props.currentVolume}</div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
