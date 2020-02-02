/* eslint-disable no-undef */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "..";

afterEach(cleanup);

it("render without crashing", () => {
  const onSignIn = jest.fn();
  const onSignUp = jest.fn();
  const onResetPassword = jest.fn();

  const { getByText, getByPlaceholderText } = render(
    <SignIn
      onSignIn={onSignIn}
      onSignUp={onSignUp}
      onResetPassword={onResetPassword}
    />
  );
  const usernameElement = getByPlaceholderText(/email/i);
  const passwordElement = getByPlaceholderText(/password/i);
  const submitButtonElement = getByText(/sign in/i);

  expect(usernameElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(submitButtonElement).toBeInTheDocument();
});

// it("call onSubmit with username and password", () => {
//   const username = "thyahan";
//   const password = "P@SsW0rD_Dr0WsS@P";
//   const onSubmit = jest.fn();

//   const { getByLabelText, getByText } = render(<SignIn onSubmit={onSubmit} />);
//   const usernameElement = getByLabelText(/username/i);
//   const passwordElement = getByLabelText(/password/i);
//   const onSubmitElement = getByText(/sign in/i);

//   usernameElement.value = username;
//   passwordElement.value = password;
//   onSubmitElement.click();

//   expect(onSubmit).toHaveBeenCalledTimes(1);
//   expect(onSubmit).toHaveBeenCalledWith({ username, password });
// });

// it("matches snapshot", () => {
//   const onSubmit = jest.fn();
//   const { asFragment } = render(<SignIn onSubmit={onSubmit} />);
//   expect(asFragment()).toMatchSnapshot();
// });
