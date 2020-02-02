/* eslint-disable no-undef */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import reducers from "../reducers";
import App from "../App";

afterEach(cleanup);

function renderWithRedux(
  ui,
  { initialState, store = createStore(reducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

it("render without crashing", () => {
  const { getByText } = renderWithRedux(<App />);
  expect(getByText(/Loading../i)).toBeInTheDocument();
});
