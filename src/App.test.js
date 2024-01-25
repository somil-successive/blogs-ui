import { render } from "@testing-library/react";
import App from "./App";

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

test("renders learn react link", () => {
  render(<App />);

  expect(window.location.pathname).toBe("/");
});
