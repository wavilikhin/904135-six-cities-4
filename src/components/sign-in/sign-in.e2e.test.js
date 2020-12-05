import * as React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SignIn } from './sign-in.jsx';

configure({
  adapter: new Adapter(),
});

describe(`SignIn component e2e test`, () => {
  it(`Should submit with no values`, () => {
    const onSubmit = jest.fn((authData) => ({ authData }));

    const signIn = shallow(<SignIn onSubmit={onSubmit} />);
    signIn.setState({ email: `` });
    signIn.setState({ password: `` });

    const submitBtn = signIn.find(`button.login__submit`);
    submitBtn.simulate(`click`, { preventDefault() {} });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.results[0].value).toMatchObject({
      authData: { email: ``, password: `` },
    });
  });

  it(`Should submit with given values`, () => {
    const onSubmit = jest.fn((authData) => ({ authData }));

    const signIn = shallow(<SignIn onSubmit={onSubmit} />);
    signIn.setState({ email: `fake@mail.com` });
    signIn.setState({ password: `fakepass` });

    const submitBtn = signIn.find(`button.login__submit`);
    submitBtn.simulate(`click`, { preventDefault() {} });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.results[0].value).toMatchObject({
      authData: { email: `fake@mail.com`, password: `fakepass` },
    });
  });
});
