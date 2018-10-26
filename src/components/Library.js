 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import albumData from './../data/albums';
 import './library.css'

 class Library extends Component {
   constructor(props) {
  super(props);
  this.state = { albums: albumData };
  }

   render() {
    return (
      <section className='library'>
        {
          this.state.albums.map( (album, index) =>
            <Link to={`/album/${album.slug}`} key={index}>
              <button id="albumButton">
                  <img src={album.albumCover} class="albumCover" alt={album.title} />
                  <div id="albumTitle">{album.title}</div>
                  <div id="albumArtist">{album.artist}</div>
                  <div id="numberOfSongs">{album.songs.length} songs</div>
              </button>
            </Link>
          )
        }
      </section>
     );
   }
 }

export default Library;
