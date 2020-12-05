import * as React from 'react';
import { ReviewItem } from '../../types';

type Props = ReviewItem;

const ReviewItem: React.FC<Props> = ({ comment, date, raiting, user }) => {
  const formatedDate = `
    ${new Date(date).getUTCFullYear()}-${
    new Date(date).getUTCMonth() + 1
  }-${new Date(date).getUTCDate()}
  `;
  const ratingStars = raiting * 2 * 10;
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
            <span style={{ width: `${ratingStars}%` }} />
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

export { ReviewItem };
