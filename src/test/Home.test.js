import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  test("should navigate to a different page when clicking on a menu item", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload Listing")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();

    userEvent.click(screen.getByText("View"));
    expect(window.location.pathname).toBe("/view");

    userEvent.click(screen.getByText("Bulk Upload"));
    expect(window.location.pathname).toBe("/upload");

    userEvent.click(screen.getByText("Bulk Upload Listing"));
    expect(window.location.pathname).toBe("/bulk-list");

    userEvent.click(screen.getByText("logout"));
    expect(window.location.pathname).toBe("/");
  });
});
