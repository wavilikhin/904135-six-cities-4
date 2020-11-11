import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReviewItem from '../review-item/review-item.jsx';

const ReviewsList = ({ reviews }) => {
  return (
    <Fragment>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review, i) => {
          return (
            <ReviewItem
              key={`${review.id}+${i}`}
              comment={review.comment}
              id={review.id}
              date={review.date}
              rating={review.rating}
              user={review.user}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

ReviewsList.prototypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ),
};
export default ReviewsList;
