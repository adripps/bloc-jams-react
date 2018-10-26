import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          
          <nav>
            <Link to='/'><button id="homeButton"><img id="bloc-jams-logo" src='/assets/images/bloc_jams_logo.png' width="200" height="200" alt="Bloc Jams"/></button></Link>
            <Link to='/library'><button id="libraryButton">Music Library</button></Link>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
