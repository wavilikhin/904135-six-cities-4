import React, { Fragment } from "react";

import { ReviewItem, ReviewItemType } from "../review-item/review-item";

interface Props {
  reviews: ReviewItemType[];
}

const ReviewsList: React.FC<Props> = ({ reviews }) => {
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
              raiting={review.raiting}
              user={review.user}
            />
          );
        })}
      </ul>
    </Fragment>
  );
};

export default ReviewsList;
