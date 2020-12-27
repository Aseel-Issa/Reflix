import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './components/Home';
import Catalog from './components/Catalog';
import MovieDetail from './components/MovieDetail';

class App extends Component {

  render() {
    ﻿return (
      <div>
        <Router>
            <Link to="/home">Home</Link>
            &nbsp;&nbsp;
            <Link to="/catalog">Catalog</Link>
            <Route path="/home" component={Home}/>
            <Route path="/catalog" component={Catalog}/>
            <Route path="/movies/:id" component={ ({match}) => <MovieDetail match={match} />}/>
        </Router>
        <LandingPage />
      </div>
    )
  }
 
}

export default App;
