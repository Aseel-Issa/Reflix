import React, { Component } from 'react';
import Catalog from './Catalog';

class LandingPage extends Component {

    constructor(){
        super()
        this.state = {
          users: [
              {name: 'Mona', id:'0', background:'blue', movies:[{id: '0'}], budget: 7},
              {name: 'Jasmyne', id:'1', background:'red', movies:[], budget: 10},
              {name: 'Aura', id:'2', background:'green', movies:[], budget: 10},
              {name: 'Tina', id:'3', background:'yellow', movies:[], budget: 10}
                ],
          currentUser: {},
          moveToCatalog: false
        }
      }

    moveToCatalog = (user) => {
        this.setState({currentUser: user,
            moveToCatalog: true})

        // <Catalog user={user}/>
    }

    updateUser = (user) => {
        let users = []
        this.state.users.forEach(element => {
            if(user.id == element.id){
                users.push(user)
            }else{
                users.push(element)
            }
        });
        this.setState({users: users})
    }

  render() {

    let show 
    if(this.state.moveToCatalog){
        show = <Catalog user={this.state.currentUser} showMoviesDetails={this.showMoviesDetails} updateUser={this.updateUser} />
    }
    else{
        let userDivs = []
        this.state.users.forEach(element => {
        userDivs.push(<button className='user' key={element.id} style={{
            backgroundColor: element.background,
            width: '200px',
            height: '100px'
          }} onClick={() => this.moveToCatalog(element)}>{element.name}</button>)
    });
        show = <div className='users'>{userDivs}</div>
    }

    ﻿return (
    <div>
          {show}
    </div>
    )
  }
 
}

export default LandingPage;