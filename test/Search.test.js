import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Search from '../src/components/Search/Search';
import { setupGoogleMock } from './setup';

const mockStore = configureMockStore();
const store = mockStore({
    search: { start: '', end: '', passengers: '', date: '' }
});

beforeAll(() => {
  setupGoogleMock();
});

test('Search test', () => {
  const component = renderer.create(
    <Provider store={store}>
        <Search location={{}} />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});