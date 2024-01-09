import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "../components/NotFound";
import { BrowserRouter } from "react-router-dom";

describe("NotFound", () => {
  test("renders not found page", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByAltText("image")).toBeInTheDocument();
  });
});
