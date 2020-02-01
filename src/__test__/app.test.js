import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

afterEach(cleanup);

it("render without crashing", () => {
  const { getByText } = render(<App />);
  expect(getByText(/hello/i)).toBeInTheDocument();
});
