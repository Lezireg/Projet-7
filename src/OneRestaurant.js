import React, { Component } from 'react';
import Reviews from './Reviews';
import './css/RestMap.css';
import './css/RestList.css';

class OneRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayReviews: false,
      reviewsLoaded: false,
      reviews: [],
      average: 0
    }
  }
  getAverage = (dataFromChild) => {
    this.setState({ average: dataFromChild })
  }

  toStars(average, index) {
    if (average === 0) {
      let starsCount = "Aucun avis"
      return starsCount
    } else {
      let starsNumber = Math.round(average * 2) / 2
      let starsCount = []
      for (let i = 1; i <= starsNumber; i++) {
        starsCount.push(<i className="fas fa-star" key={index + i}></i>)
      }
      if (Math.trunc(starsNumber) !== starsNumber) {
        starsCount.push(<i className="fas fa-star-half" key={index + "hs"}></i>)
      }
      return starsCount
    }
  }
  reviewsRequest() {
    if (this.props.placeId !== 1) {
      const google = this.props.google

      var request = {
        placeId: this.props.placeId,
        fields: ["review"],
      };


      let service = new google.maps.places.PlacesService(document.createElement("div"))
      service.getDetails(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.setState({ reviews: result, reviewsLoaded: true });

        }
      })
    }
    else {
      this.setState({ reviews: { reviews: [] }, reviewsLoaded: true })
    }
  }

  displayReviews = () => {
    this.setState({ displayReviews: !this.state.displayReviews })
    if (this.state.reviews.length === 0) { this.reviewsRequest() }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.displayReviews !== prevProps.displayReviews) {
      this.displayReviews();
    }
  }

  render() {

    return (
      <div className="rest-entry" id={"restaurant-id" + this.props.index}>
        <div onClick={() => this.props.openReviews(this.props.index)}>
          <div className="rest-first-line">
            <h1>{this.props.name}</h1>
            {this.props.placeId === 1 ?
              <span className="stars">{this.toStars(this.state.average, this.props.index)}</span>
              : <span className="stars">{this.toStars(this.props.rating, this.props.index)}</span>}
          </div>
          <p className="address">{this.props.address}
            <button className="review-button">avis</button>
          </p>
        </div>

        {this.state.displayReviews ?
          <div>
            {this.state.reviewsLoaded ?
              <Reviews placeId={this.props.placeId} picture={this.props.picture} reviews={this.state.reviews} coords={this.props.coords} average={this.getAverage} />
              : null}
          </div> : null}
      </div>
    )
  }
}

export default (OneRestaurant)