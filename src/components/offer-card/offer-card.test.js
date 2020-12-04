// main
import React from "react";
import renderer from "react-test-renderer";
// router
import { Router } from "react-router-dom";
import history from "../../history.js";
// store
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
//data
import { OfferCard } from "./offer-card.jsx";
import { OFFERS } from "../../test/__mocks__/offers.js";
import { mockedStore } from "../../test/__mocks__/store.js";

const mockStore = configureStore([]);
const store = mockStore(mockedStore);
const cardData = OFFERS[0];

describe(`OfferCard component snapshot test`, () => {
  it(`Should render content card with given data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <OfferCard
              cardData={cardData}
              handleFavoritesUpdate={() => {}}
              favoritesIds={[]}
              handleCurrentOfferUpdate={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
