import React, { Component } from 'react';
import './css/App.css';
import RestMap from './RestMap';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {},
      isLoaded: false
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((posit) => this.setState({ position: { lat: posit.coords.latitude, lng: posit.coords.longitude }, isLoaded : true }))
  }

  componentDidMount() {
    this.getLocation()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p><i className="fas fa-utensils"></i> Yummy<span className="subtitle">Les meilleurs restaurants près de chez vous</span></p>
        </header>
        <div className="main-banner">
          <p>Vous cherchez<span className="type-name-list"> un restaurant </span>?</p>
        </div>
        <RestMap position={this.state.position} coordsLoaded={this.state.isLoaded}/>
        <footer>
        <p>Maxime Nedelec - Ⓒ2018 - Application réalisée dans le cadre de la formation Developpeur d'applications Frontend d'Openclassrooms</p>
        </footer>
      </div>
    );
  }
}

export default App;
