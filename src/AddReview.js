import React, { Component } from 'react';
import './css/RestMap.css';
import './css/RestList.css';

class AddReview extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: "",
        rate: 0,
        review: "",
      }
    }
    handleChangeName = ({ target: { value } }) => {
      this.setState({ name: value })
    }
  
    handleChangeRate = ({ target: { value } }) => {
      this.setState({ rate: value })
    }
  
    handleChangeReview = ({ target: { value } }) => {
      this.setState({ review: value })
    }
  
    onSubmit = () => {
      let newReview = { author_name: this.state.name, profile_photo_url: "new", rating: this.state.rate, text: this.state.review }
      this.props.newReview(newReview)
      this.setState({ name: "", rate: 0, review: "" })
    }
  
    render() {
      return (
        <div className="review-block">
          <h3>Ajouter un avis :</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Nom :
            <input className="form-element" type="text" value={this.state.name} onChange={this.handleChangeName} />
            </label>
            <label>
              Note :
            <select
                className="form-element"
                name="user-rate"
                value={this.state.rate}
                onChange={this.handleChangeRate}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <textarea type="textarea" placeholder="Votre avis" value={this.state.review} onChange={this.handleChangeReview} />
          </form>
  
          <button className="blue-button form-button" onClick={this.onSubmit}><i className="fas fa-plus-circle"></i> Ajouter</button>
        </div>
      )
    }
  }

  export default (AddReview)