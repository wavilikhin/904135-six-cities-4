import React from 'react';
import renderer from 'react-test-renderer';
import withActiveItem from './with-active-item.jsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NameSpace from '../../reducer/name-space.js';
import { OFFERS } from '../../test/__mocks__/offers.js';

const mockStore = configureStore([]);

const mockData = {
  activeItem: 'Amsterdam',
  onActiveItemChange: () => {},
};

const MockComponent = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};

const MockComponentWrapped = withActiveItem(MockComponent, {
  stateUpdateRequired: false,
});

it(`withActiveItem is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {
      city: 'Amsterdam',
    },
    [NameSpace.DATA]: {
      offers: OFFERS,
    },
    [NameSpace.USER]: {
      userFavorites: [],
    },
  });
  const tree = renderer
    .create(
      <Provider store={store}>
        <MockComponentWrapped
          activeItem={mockData.activeItem}
          onActiveItemChange={mockData.onActiveItemChange}
        />
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
