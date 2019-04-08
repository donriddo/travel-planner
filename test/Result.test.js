import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Result from '../src/components/Result/Result';
import { setupGoogleMock } from './setup';

const mockStore = configureMockStore();
const store = mockStore({
    search: { start: '', end: '', passengers: '', date: '' }
});

beforeAll(() => {
  setupGoogleMock();
});

test('Result test', () => {
  const component = renderer.create(
    <Provider store={store}>
        <Result location={{}} />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});