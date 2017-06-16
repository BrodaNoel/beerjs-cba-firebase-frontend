import React, { Component } from 'react';
import axios from 'axios';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyDMdHUfkYkk-ipL6Psf8c4NyeOUIhPgCYo",
  authDomain: "beerjscba.firebaseapp.com",
  databaseURL: "https://beerjscba.firebaseio.com",
  projectId: "beerjscba",
  storageBucket: "beerjscba.appspot.com",
  messagingSenderId: "952997061161"
});

class App extends Component {
  saludo() {
    axios({
      url: 'https://us-central1-beerjscba.cloudfunctions.net/api/saludo',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.firebaseToken
      }
    }).then((response) => {
      console.log(response.data);
    });
  }

  twitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      result.user.getIdToken().then(token => {
        // token: Firebase Token
        // result.user: Twitter-User data
        // result.credential: Twitter-User credentials (token and secret)
        window.firebaseToken = token;
      });

    }).catch(error => {
      console.log('error', `${error.code}: ${error.message}`)
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to BeerJS CBA! - Olapic</h2>
        </div>

        <button onClick={this.twitter}>login with twitter</button>
        <button onClick={this.saludo}>Saludar</button>
      </div>
    );
  }
}

export default App;
