import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/account/Login";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});



describe("login page", () => {
  test("renders login page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );



    expect(screen.getByAltText("img")).toBeInTheDocument();

    expect(screen.getByTestId("login-form"))
  });
});
