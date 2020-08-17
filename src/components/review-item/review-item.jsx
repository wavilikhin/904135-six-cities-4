import React from 'react';
import PropTypes from 'prop-types';

const ReviewItem = ({ comment, id, date, raiting, user }) => {
  const formatedDate = `
    ${new Date(date).getUTCFullYear()}-${
    new Date(date).getUTCMonth() + 1
  }-${new Date(date).getUTCDate()}
  `;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatar_url}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          {formatedDate}
        </time>
      </div>
    </li>
  );
};

ReviewItem.prototypes = {
  comment: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  raiting: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    is_pro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default ReviewItem;
