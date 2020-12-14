import * as React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = (): React.ReactElement => {
  return (
    <>
      <div>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Oops... page not found.</b>
                <p className="favorites__status-description">
                  <Link className="link" to={'/'}>
                    to main page
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="/img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </a>
        </footer>
      </div>
    </>
  );
};

export default NotFound;
