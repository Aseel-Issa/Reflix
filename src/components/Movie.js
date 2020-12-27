import React, { Component } from 'react';
import { createBrowserHistory as history} from 'history';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Movie extends Component {

    showMoviesDetails = () => {
        let path  = '/movies/'+this.props.movie.id
        // does not work 100% :(
        history().push(path)
    }

    updateMovie = () => {
        this.props.updateMovie(this.props.movie.id, this.props.movie.isRented, this.props.user)
    }

  render() {
    let img = "url(" + this.props.movie.img + ")"
    const btnText = this.props.movie.isRented? '-' : '+'
    ﻿return (
    <div className='movie'>
    
        <div className={this.props.movie.isRented? 'rented' : 'notRented'} style={{
            backgroundImage: img,
            width: '300px',
            height: '300px'
          }}>
            <button onClick={this.updateMovie}>{btnText}</button>
            {/* <Router>
        <Link to={'/movies/'+this.props.movie.id}> */}
            <div onClick={this.showMoviesDetails} style={{
            width: '300px',
            height: '280px'
          }}></div>
          {/* </Link>
    </Router> */}
        </div>
        
    </div>
    )
  }
 
}

export default Movie;