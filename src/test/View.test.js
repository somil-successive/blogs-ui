import React from "react";
import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import View from "../components/View";

describe("view page", () => {
  test("renders view page", async () => {
    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );

    const searchField = screen.queryByPlaceholderText("Search Here....");
    expect(searchField);

    // expect(screen.queryByTestId("search-btn"))

    // fireEvent.change(searchField, {
    //   target: { value: "hello" },
    // });

    // const createButton = screen.getByTestId("create-btn")
    // fireEvent.click(createButton);

    // expect(window.location.pathname).toBe('/create');
  });
});
