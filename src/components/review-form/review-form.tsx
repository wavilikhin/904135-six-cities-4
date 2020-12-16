import * as React from 'react';
import { Comment } from '../../types';
interface Props {
  hotelId: number;
  handleSubmit: (hotelId: number, obj: Comment) => void;
}

interface State {
  text: string;
  rating: number;
}
class ReviewForm extends React.PureComponent<Props, State> {
  props: Props;
  state: State;
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  oneStarRating: React.RefObject<HTMLInputElement>;
  twoStarRating: React.RefObject<HTMLInputElement>;
  threeStarRating: React.RefObject<HTMLInputElement>;
  fourStarRating: React.RefObject<HTMLInputElement>;
  fiveStarRating: React.RefObject<HTMLInputElement>;
  ratingStars: React.RefObject<HTMLInputElement>[];

  constructor(props: Props) {
    super(props);

    this.textAreaRef = React.createRef();
    this.oneStarRating = React.createRef();
    this.twoStarRating = React.createRef();
    this.threeStarRating = React.createRef();
    this.fourStarRating = React.createRef();
    this.fiveStarRating = React.createRef();
    this.ratingStars = [
      this.oneStarRating,
      this.twoStarRating,
      this.threeStarRating,
      this.fourStarRating,
      this.fiveStarRating,
    ];

    this.state = {
      text: '',
      rating: null,
    };

    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleRatingChange = this._handleRatingChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  // FIXME: Event type
  _handleTextChange(evt: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({
      text: evt.target.value,
    });
  }

  // FIXME: Event type
  _handleRatingChange(evt: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      rating: Number(evt.target.value),
    });
  }

  // FIXME: Event type
  _handleSubmit(e: React.MouseEvent<HTMLElement>): void {
    e.preventDefault();

    // TODO Доделать оповещение об ошибке
    if (this.state.text.replace(/\s/g, '').length < 50)
      return console.log(`2short`);

    // TODO Доделать оповещение об ошибке
    if (this.state.rating == null) return console.log(`Rating null`);

    this.props.handleSubmit(this.props.hotelId, {
      comment: this.state.text,
      rating: this.state.rating,
    });

    this.setState({
      text: '',
      rating: null,
    });

    this.textAreaRef.current.value = '';
    this.ratingStars.forEach((star) => (star.current.checked = false));
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
            ref={this.fiveStarRating}
            onChange={this._handleRatingChange}
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
            ref={this.fourStarRating}
            onChange={this._handleRatingChange}
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
            ref={this.threeStarRating}
            onChange={this._handleRatingChange}
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
            ref={this.twoStarRating}
            onChange={this._handleRatingChange}
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
            ref={this.oneStarRating}
            onChange={this._handleRatingChange}
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
          ref={this.textAreaRef}
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
export default ReviewForm;
