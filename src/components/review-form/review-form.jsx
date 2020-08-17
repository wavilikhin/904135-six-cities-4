import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      raiting: null,
    };

    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleRaitingChange = this._handleRaitingChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleTextChange(evt) {
    this.setState({
      text: evt.target.value,
    });
  }

  _handleRaitingChange(evt) {
    this.setState({
      raiting: evt.target.value,
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.replace(/\s/g, '').length < 50)
      return console.log(`2short`);
    if (this.state.raiting == null) return console.log(`Raiting null`);
    console.log(`eeee`);
    this.props.handleSubmit(this.props.hotelId, {
      comment: this.state.text,
      raiting: this.state.raiting,
    });
  }

  render() {
    return (
      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={5}
            id="5-stars"
            type="radio"
            onChange={this._handleRaitingChange}
          />
          <label
            htmlFor="5-stars"
            className="reviews__rating-label form__rating-label"
            title="perfect"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={4}
            id="4-stars"
            type="radio"
            onChange={this._handleRaitingChange}
          />
          <label
            htmlFor="4-stars"
            className="reviews__rating-label form__rating-label"
            title="good"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={3}
            id="3-stars"
            type="radio"
            onChange={this._handleRaitingChange}
          />
          <label
            htmlFor="3-stars"
            className="reviews__rating-label form__rating-label"
            title="not bad"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={2}
            id="2-stars"
            type="radio"
            onChange={this._handleRaitingChange}
          />
          <label
            htmlFor="2-stars"
            className="reviews__rating-label form__rating-label"
            title="badly"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={1}
            id="1-star"
            type="radio"
            onChange={this._handleRaitingChange}
          />
          <label
            htmlFor="1-star"
            className="reviews__rating-label form__rating-label"
            title="terribly"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          defaultValue={''}
          onChange={this._handleTextChange}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            onClick={this._handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  hotelId: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
