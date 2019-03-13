import React, { Component } from 'react';
import OneRestaurant from './OneRestaurant';
import './css/RestMap.css';
import './css/RestList.css';


class RestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      starsMin: "0",
      starsMax: "5"
    }
  }

  handleChangeMin = (event) => {
    this.setState({ starsMin: event.target.value })
    this.props.getMinStars(event.target.value)
  }
  handleChangeMax = (event) => {
    this.setState({ starsMax: event.target.value })
    this.props.getMaxStars(event.target.value)
  }

  render() {
    return (
      <div className="restaurant-list">
        <form className="star-form">Afficher les restaurants notés de
          <select
            className="star-select"
            name="stars-min"
            value={this.state.starsMin}
            onChange={this.handleChangeMin}
          >
            <option value="0">0</option>
            {this.state.starsMax <= 1 ? null :
              <option value="1">1</option>}
            {this.state.starsMax <= 2 ? null :
              <option value="2">2</option>}
            {this.state.starsMax <= 3 ? null :
              <option value="3">3</option>}
            {this.state.starsMax <= 4 ? null :
              <option value="4">4</option>}
            {this.state.starsMax <= 5 ? null :
              <option value="5">5</option>}
          </select>
          à
          <select
            className="star-select"
            name="stars-max"
            value={this.state.starsMax}
            onChange={this.handleChangeMax}
          >
            {this.state.starsMin >= 1 ? null :
              <option value="1" >1</option>}
            {this.state.starsMin >= 2 ? null :
              <option value="2">2</option>}
            {this.state.starsMin >= 3 ? null :
              <option value="3">3</option>}
            {this.state.starsMin >= 4 ? null :
              <option value="4">4</option>}
            <option value="5">5</option>
          </select>
          etoiles
          </form>
        <div
          className="rest-list main-block" >
          {this.props.restaurants.map((restDetail, index) => {
            if (restDetail.rating >= this.state.starsMin && restDetail.rating <= this.state.starsMax) {
              return (<OneRestaurant key={index} placeId={restDetail.id} name={restDetail.name} rating={restDetail.rating} address={restDetail.address} index={index} picture={restDetail.photos[0]} coords={restDetail.coords} displayReviews={restDetail.displayReviews} openReviews={this.props.openReviews} google={this.props.google} />)
            } else {
              return null
            }
          })}
        </div >
      </div>
    )
  }
}

export default (RestList)

