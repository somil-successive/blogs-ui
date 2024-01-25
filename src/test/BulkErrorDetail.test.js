import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BulkErrorDetail from "../components/BulkErrorDetail";

describe("NotFound", () => {
  test("should display a loading spinner", () => {
    render(
      <BrowserRouter>
        <BulkErrorDetail />
      </BrowserRouter>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("should display fetched data in the table", async () => {
    jest.mock("axios");
    const axios = require("axios");
    axios.get.mockResolvedValue({
      response: { data: [{ rowNumber: 1, errorDetails: "Error 1" }] },
    });

    render(
      <BrowserRouter>
        <BulkErrorDetail />
      </BrowserRouter>
    );

    waitFor(() => expect(screen.getByTestId("myTable")).toBeInTheDocument());
  });

  test("should display an error message if API call fails", async () => {
    render(
      <BrowserRouter>
        <BulkErrorDetail />
      </BrowserRouter>
    );

    jest.mock("axios");
    const axios = require("axios");

    await axios.get.mockRejectedValueOnce({
      response: { data: { message: "Error fetching data" } },
    });

    const ab = await screen.findByRole("heading", {
      name: "Error fetching data",
    });
    expect(ab).toBeInTheDocument();
  });
});
