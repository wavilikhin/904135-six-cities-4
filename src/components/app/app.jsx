import React from 'react';
import { connect } from 'react-redux';
import { getAuthStatus } from '../../reducer/user/selectors.js';

import Main from '../main/main.jsx';
import SignIn from '../sign-in/sign-in.jsx';

const App = (props) => {
  const { authStatus } = props;

  if (authStatus === 'NO_AUTH') {
    return <SignIn />;
  }
  return <Main />;
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

export { App };
export default connect(mapStateToProps, null)(App);
