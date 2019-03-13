import React, { Component } from 'react';
import RestList from './RestList';
import './css/RestMap.css';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


export class RestMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      restaurants: [],
      starsMin: "0",
      starsMax: "5",
      mapClicked: false,
      newRestaurantAddAddress: false,
      newRestCoords: {},
      newRestaurantName: "",
      newAddress: ""
      
    }
  }
  getMinStarsInfos = (dataFromChild) => {
    this.setState({ starsMin: dataFromChild },
    )
  }

  getMaxStarsInfos = (dataFromChild) => {
    this.setState({ starsMax: dataFromChild },
    )
  }

  onMapReady = (mapProps, map) => this.searchNearby(map, map.center)

  searchNearby = (map, center) => {
    const { google } = this.props

    const service = new google.maps.places.PlacesService(map)

    const request = {
      location: this.props.position,
      radius: '1000',
      type: ['restaurant']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const resultToRestaurant = []
        results.forEach(function (restaurant) {
          let restFields = { id: restaurant.place_id, name: restaurant.name, address: restaurant.vicinity, coords: restaurant.geometry.location, rating: restaurant.rating, photos: restaurant.photos, displayReviews: false }
          resultToRestaurant.push(restFields)
        })
        this.setState({ loaded: true, restaurants: resultToRestaurant })
        console.log(this.state.restaurants)
      }
    })
  }


  onMapClick(location) {
    this.setState({ mapClicked: !this.state.mapClicked, newRestCoords: location })
  }

  handleChangeNewRestaurantName = ({ target: { value } }) => {
    this.setState({ newRestaurantName: value })
  }

  toAddressModule = () => {
    this.setState({ mapClicked: !this.state.mapClicked, newRestaurantAddAddress: !this.state.newRestaurantAddAddress, })
  }

  handleChangeNewRestaurantAdress = ({ target: { value } }) => {
    this.setState({ newAddress: value })
  }

  addRestaurant = () => {
    let newRestaurant = { id: 1, name: this.state.newRestaurantName, address: this.state.newAddress, coords: this.state.newRestCoords, rating: 0, photos: ["none"], displayReviews: false }
    let addRestaurant = this.state.restaurants
    addRestaurant.push(newRestaurant)
    this.setState({ restaurants: addRestaurant, newRestaurantAddAddress: !this.state.newRestaurantAddAddress })
    this.setState({ newRestCoords: {}, newRestaurantName: "", newAddress: "" })
  }

  onMarkerClick = (id) => {
    document.querySelector("#restaurant-id" + id).scrollIntoView()
    let changeRest = this.state.restaurants.concat([])
    changeRest.forEach(function (item, index) {
      if (index !== id) {
        item.displayReviews = false
      }
    })
    changeRest[id].displayReviews = !changeRest[id].displayReviews
    this.setState({ restaurants: changeRest })
  }


  render() {
    const style = {
      width: '100%',
      height: '100%',
      position: 'relative'
    }

    return (
      <main>
        {this.props.coordsLoaded ?
          <div className="main-content">
            <RestList restaurants={this.state.restaurants} getMaxStars={this.getMaxStarsInfos} getMinStars={this.getMinStarsInfos} google={this.props.google} openReviews={this.onMarkerClick} />
            <div className="map-container">
              <Map
                google={this.props.google}
                onReady={this.onMapReady}
                style={style}
                zoom={14}
                initialCenter={this.props.position}
                center={this.props.position}
                onClick={(t, map, c) => this.onMapClick(c.latLng, map)}
              >
                <Marker
                  name={'Votre position'}
                  position={this.props.position}
                  animation={this.props.google.maps.Animation.DROP}
                  icon={require("./images/google-map-marker-small.png")}
                />

                {this.state.restaurants.map((restDetail, index) => {
                  if (restDetail.rating >= this.state.starsMin && restDetail.rating <= this.state.starsMax) {
                    return <Marker
                      name={restDetail.name}
                      key={index}
                      position={restDetail.coords}
                      animation={this.props.google.maps.Animation.DROP}
                      onClick={() => this.onMarkerClick(index)}
                      icon={require("./images/restaurant-marker-small.png")}
                    />
                  } else {
                    return null
                  }
                }
                )
                }
              </Map>

              {this.state.mapClicked ?
                <div className="new-restaurant">
                  <form className="form-new-restaurant">
                    <button className="quit-button" onClick={(e) => this.onMapClick(e)}><i className="fas fa-times"></i></button>
                    <div className="first-line-add">
                      <label>
                        Entrez le nom du restaurant à ajouter :
                      <input type="text" value={this.state.newRestaurantName} onChange={this.handleChangeNewRestaurantName} />

                      </label>
                    </div>
                    <div className="second-line">
                      <button className="blue-button" onClick={this.toAddressModule} >suivant <i className="fas fa-arrow-circle-right"></i></button>
                    </div>
                  </form>
                </div>
                : null
              }
              {this.state.newRestaurantAddAddress ?
                <div className="new-restaurant">
                  <form className="form-new-restaurant">
                    <div className="first-line-add">
                      <label>
                        Entrez l'adresse du restaurant :
                   <input type="text" value={this.state.newAddress} onChange={this.handleChangeNewRestaurantAdress} />
                        <button className="quit-button" onClick={(e) => this.onMapClick(e)}><i className="fas fa-times"></i></button>
                      </label>
                    </div>
                    <div className="second-line">
                      <button className="blue-button" onClick={this.addRestaurant} >Ajouter <i className="far fa-check-circle"></i></button>
                    </div>
                  </form>
                </div>
                : null
              }
            </div>
          </div>
          : <div className="loading-animation">
            <p className="loading">Chargement des restaurants</p>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        }
      </main>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDh484ToeyTjznTjjArO486Ebm00xRe5vM")
})(RestMap)