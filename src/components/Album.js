import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './album.css';

class Album extends Component {

  constructor(props) {
  super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      test: album.songs.title,
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 50,
      isPlaying: false,
      isHovering: false,
      currentTargetIndex: 0
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  formatTime(newTime) {
    if (newTime === undefined) {
      return "-:--"
    }
    let minutes = newTime / 60;
    let seconds = newTime % 60;
    if (seconds < 10) {
      return parseInt(minutes) + ":0" + parseInt(seconds)
    }
    return parseInt(minutes) + ":" + parseInt(seconds)
  }


  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: this.formatTime(newTime) });
  }

  handleVolumeChange(e) {
    let volumeLevel = e.target.value
    this.setState({currentVolume: volumeLevel});
    this.audioElement.volume = volumeLevel / 100;
  }

  play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
  }

  pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
  }

  setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }

  }

  playAppear(e) {
    this.setState({isHovering: true});
    var targetIndex = e.target;
    this.setState({ currentTargetIndex: targetIndex.innerText })
  }

  numberAppear() {
    this.setState({isHovering: false});
  }

  handlePlayAppear(song, index) {
    const isSameSong = this.state.currentSong === song;
    var currentIndex = index;
    const displayPlayIcon = <ion-icon name="play" onMouseEnter={(e) => this.playAppear(e)} onMouseLeave={() => this.numberAppear()}></ion-icon>
    const displayPauseIcon = <ion-icon name="pause" onMouseEnter={(e) => this.playAppear(e)} onMouseLeave={() => this.numberAppear()}></ion-icon>
    const displayTrackNumber = <span id="trackNumber"onMouseEnter={(e) => this.playAppear(e)} onMouseLeave={() => this.numberAppear()}>{currentIndex + 1}</span>

    if (this.state.currentTargetIndex == (currentIndex + 1)) {
      return displayPlayIcon;
    }
    if (this.state.isPlaying && isSameSong) {
      return displayPauseIcon;
    }
    if (this.state.isPlaying === false && isSameSong) {
      return displayPlayIcon;
    }
    if (!isSameSong) {
      return displayTrackNumber;
    }

  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    if (newSong === undefined){
      this.setSong(this.state.album.songs[0])
      this.play();
    }
    else {
      this.setSong(newSong);
      this.play();
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
            <table id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
              { this.state.album.songs.map( (song, index) =>
                    <tr className="song" key={song.title} onClick={() => this.handleSongClick(song)}>
                      <td id='index'>{this.handlePlayAppear(song, index)}</td>
                      <td id='songTitle'>{song.title}</td>
                      <td id='time'>{this.formatTime(song.duration)}</td>
                  </tr>
                )
              }

              </tbody>
          </table>
            <PlayerBar
              isPlaying={this.state.isPlaying}
              currentSong={this.state.currentSong}
              currentTime={this.audioElement.currentTime}
              duration={this.audioElement.duration}
              currentVolume={this.state.currentVolume}
              currentTargetIndex={this.state.currentTargetIndex}

              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
              formatTime={(newTime) => this.formatTime(newTime)}

            />
      </section>
    );
  }
}

export default Album;
