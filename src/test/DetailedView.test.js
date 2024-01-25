import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DetailedView from "../components/DetailedView";
import axios from "axios";

jest.mock("axios");
describe("Home", () => {
  jest.mock("axios");
  test("should display the blog post's details", () => {
    render(
      <BrowserRouter>
        <DetailedView />
      </BrowserRouter>
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload Listing")).toBeInTheDocument();
    expect(screen.getByText("Category:")).toBeInTheDocument();
    expect(screen.getByText("Sensitive:")).toBeInTheDocument();
    expect(screen.getByText("Approved:")).toBeInTheDocument();
    expect(screen.getByText("Likes:")).toBeInTheDocument();
    expect(screen.getByText("Tags:")).toBeInTheDocument();
    expect(screen.getByText("Created At:")).toBeInTheDocument();
    expect(screen.getByText("Last Updated:")).toBeInTheDocument();
    expect(screen.getByText("Id:")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
  });

  test("should  handle the error in showing blog", () => {
    axios.get.mockRejectedValueOnce({
      response: { data: { message: "Error message" } },
    });

    render(
      <BrowserRouter>
        <DetailedView />
      </BrowserRouter>
    );
    expect(window.location.pathname).toBe("/");
  });
});
