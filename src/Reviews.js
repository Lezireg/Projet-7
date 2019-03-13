import React, { Component } from 'react';
import AddReview from './AddReview';
import './css/RestMap.css';
import './css/RestList.css';

class Reviews extends Component {
    constructor(props) {
      super(props)
      this.state = {
        reviews: this.props.reviews.reviews,
        newReview: {},
        moyenne: Number
      }
    }
  
    getNewReview = (dataFromChild) => {
      this.setState({ newReview: dataFromChild })
    }
  
    countAverage() {
      if (this.props.placeId === 1) {
        let averageArray = []
        this.state.reviews.forEach(function (a) {
          averageArray.push(a.rating)
        })
        let total = 0
        for (let i = 0; i < averageArray.length; i++) {
          let a = total + +averageArray[i]
          total = a
        }
        let moyenne = total / averageArray.length
        this.props.average(moyenne)
        this.setState({ moyenne: moyenne })
      }
    }
  
    componentDidUpdate(prevProps, prevstate) {
      if (this.state.newReview !== prevstate.newReview) {
        let reviews = this.state.reviews
        reviews.push(this.state.newReview)
        this.setState({ reviews: reviews })
        this.countAverage()
      }
    }
  
    render() {
      return (
        <div className="reviews-container">
          <div className="arrow-down"></div>
          {this.props.picture === "none" ? <img className="restaurant-illustration" src={"https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + this.props.coords.lat() + "," + this.props.coords.lng() + "&fov=90&heading=235&pitch=10&key=AIzaSyDh484ToeyTjznTjjArO486Ebm00xRe5vM"} alt="street view"></img> 
          : <img className="restaurant-illustration" src={this.props.picture.getUrl()} alt={"restaurant"}></img>
          }
          <div className="reviews-details">
            <h3>Avis</h3>
            {this.state.reviews.length !== 0 ? this.state.reviews.map((reviewsDetail, index) => {
                return (
                  <div key={index}>
                    <div className="first-line">
                      {reviewsDetail.profile_photo_url === "new" ? <img className="profile-img" src={require("./images/profile.png")} alt="new-user" /> 
                      : <img className="profile-img" src={reviewsDetail.profile_photo_url} alt={"restaurant"}></img>}
                      <div className="profile-name">{reviewsDetail.author_name}</div>
                      <div className="user-rate">{reviewsDetail.rating}</div>
                      <span className="rate-base"> /5</span>
                    </div>
                    <p className="corps">"{reviewsDetail.text}"</p>
                  </div>
                )
              }
              ) : <div className="empty-reviews">Aucun avis</div>}
            <AddReview newReview={this.getNewReview} />
          </div>
        </div>
      )
    }
  }
  
  export default (Reviews)