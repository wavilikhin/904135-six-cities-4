import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../reducer/reducer';
import { getAuthStatus, getUserEmail } from '../../reducer/user/selectors';
import { AppRoutes, AuthStatus } from '../../const';

type StateToPropsTypes = {
  authStatus: AuthStatus.AUTH | AuthStatus.NO_AUTH;
  userEmail: string;
};

type Props = StateToPropsTypes;

const Header: React.FC<Props> = ({
  authStatus,
  userEmail,
}): React.ReactElement => {
  return (
    <div className="page page--gray">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoutes.ROOT}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    to={
                      authStatus === 'NO_AUTH'
                        ? AppRoutes.LOGIN
                        : AppRoutes.FAVORITES
                    }
                  >
                    <span>
                      {authStatus === 'NO_AUTH' ? `Sign In` : userEmail}
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  authStatus: getAuthStatus(state),
  userEmail: getUserEmail(state),
});

export { Header };
export default connect(mapStateToProps, null)(Header);
