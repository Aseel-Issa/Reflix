import React, { Component } from 'react';
import Movie from './Movie';

class Catalog extends Component {
    constructor() {
        super()
        this.state = {
            movies: [
                { id: 0, display: true, isRented: false, title: "Tarzan", img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811"},
                { id: 1, display: true, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg"},
                { id: 2, display: true, isRented: false, title: "Beauty and the Beast", img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg"},
                { id: 3, display: true, isRented: false, title: "The Sword in the Stone", img: "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg"},
                { id: 4, display: true, isRented: false, title: "Beauty and the Beast", img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg"}
            ],
            onPageLoad: true,
            displayRented: 0,
            searchString: ""
        }
    }

    updateMovie = (id, state, user) => {
        let displayRented
        if(!state && user.budget-3 < 0){
            console.log('You can not rent more movies!')
            return
        }
        if(!state && user.budget-3 >= 0){
            user.budget-=3
            displayRented = this.state.displayRented + 1
        }else{
            user.budget+=3
            displayRented = this.state.displayRented - 1
        }
        console.log('user budget: '+user.budget)
        let newMovies = this.state.movies
        newMovies.forEach(element => {
            if(element.id == id){
                element.isRented = !state
            }
        });
        this.setState({movies: newMovies, displayRented: displayRented})
        this.props.updateUser(user)
    }

    renderOnPageLoad = () => {
        let displayRented = 0
        let newMovies = this.state.movies
        for(let i=0 ;i< this.props.user.movies.length; i++){
            for(let j=0; j<newMovies.length; j++){
                if(this.props.user.movies[i].id == newMovies[j].id){
                    newMovies[j].isRented = true
                    displayRented += 1
                    break;
                }
            }
        }
        this.setState({movies: newMovies,
            displayRented: displayRented,
            onPageLoad: false})
    }

    search = (e) =>{
        let value = e.target.value.toLowerCase()
        let newMovies = []
        this.state.movies.forEach(element => {
            let modified = element
            if(element.title.toLowerCase().includes(value)){
                modified.display = true
            }else{
                modified.display = false
            }
            newMovies.push(modified)
            
        });
        this.setState({movies: newMovies, searchString: value})
    }

    render() {
        if(this.state.onPageLoad){
            this.renderOnPageLoad()
        }
        
        let rented = []
        let allMovies = []
            this.state.movies.forEach(element => {
                if(!element.display){
                    return;
                }
                if(element.isRented){
                    rented.push(<Movie key={element.id} movie={element} user={this.props.user} updateMovie={this.updateMovie} showMoviesDetails={this.showMoviesDetails}/>)
                }
                allMovies.push(<Movie key={element.id} movie={element} user={this.props.user} updateMovie={this.updateMovie} showMoviesDetails={this.showMoviesDetails}/>)
            });

            let results = []
            if(this.state.displayRented){
                results.push(<div className='rentedSection'>Rented:</div>)
            }

        return (
            <div className='Catalog'>
            <input type='text' value={this.state.searchString} onChange={this.search} placeholder='type the title of the movie...'></input>
            <div>Budget: {this.props.user.budget}</div>
            {results}
            {rented}
            <div>Catalog:</div>
            {allMovies}
            </div>
        )
    }

}

export default Catalog;