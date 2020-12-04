// main
import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// router
import { Router } from "react-router-dom";
import history from "../../history.js";
// sotore
import { OFFERS } from "../../test/__mocks__/offers.js";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mockedStore } from "../../test/__mocks__/store.js";
// components
import { OfferCard } from "./offer-card.jsx";
// data
const mockStore = configureStore([]);
const store = mockStore(mockedStore);

const cardData = OFFERS[0];
const userFavorites = [];

configure({
  adapter: new Adapter(),
});

describe(`OfferCard component e2e test`, () => {});
