import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import BulkUploadListing from "../components/BulkUploadListing";
import axios from "axios";
import userEvent from "@testing-library/user-event";

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

jest.mock("axios");
describe("Bulk Upload Listing", () => {
  const mockAlert = jest.spyOn(window, "alert");

  test("should render bulk upload listing page with table of bulk uploads details", async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });

    render(
      <BrowserRouter>
        <BulkUploadListing />
      </BrowserRouter>
    );

    waitFor(() => {
      expect(screen.getByText("Bulk Uploads Details")).toBeInTheDocument();
      expect(screen.getByText("Records Processed:")).toBeInTheDocument();
      expect(screen.getByText("Errors:")).toBeInTheDocument();
      expect(screen.getByText("Time Taken:")).toBeInTheDocument();
      expect(screen.getByText("Uploaded At:")).toBeInTheDocument();
      expect(screen.getByText("Session Id:")).toBeInTheDocument();
      expect(screen.getByText("View")).toBeInTheDocument();
      expect(screen.getByText("Bulk Upload")).toBeInTheDocument();
    });
  });

  test("renders bulk upload listing with details and actions", async () => {
    const mockHandleViewBulkUploadErrors = jest.fn();

    const data = [
      {
        _id: "1",
        recordsProcessed: 100,
        totalErrors: 5,
        timeTaken: "20 sec",
        createdAt: new Date().toISOString(),
        session_id: "session-123",
      },
    ];

    render(
      <MemoryRouter>
        <BulkUploadListing
          data={data}
          handleViewBulkUploadErrors={mockHandleViewBulkUploadErrors}
        />
      </MemoryRouter>
    );

    waitFor(async () => {
      const viewErrorButton = await screen.findByTestId("view-error");
      userEvent.click(viewErrorButton);
      expect(window.location.pathname).toBe("/bulk-errors/session-123");
    });
  });

  test("should render bulk upload listing page with correct number of bulk uploads", async () => {
    const data = [
      {
        _id: "1",
        recordsProcessed: 100,
        totalErrors: 5,
        timeTaken: "20 sec",
        createdAt: new Date().toISOString(),
        session_id: "session-123",
      },
    ];

    axios.get.mockResolvedValue({ data: { data } });

    render(
      <BrowserRouter>
        <BulkUploadListing />
      </BrowserRouter>
    );

    await waitFor(() => {
      const ViewErrorBtn = screen.getByText("View Errors");
      expect(ViewErrorBtn).toBeInTheDocument();
      ViewErrorBtn.click(ViewErrorBtn);
    });
  });

  test("should display error message in console when there is an error fetching data", async () => {
    await axios.get.mockRejectedValue(new Error("Error fetching data"));

    render(
      <BrowserRouter>
        <BulkUploadListing />
      </BrowserRouter>
    );

    await waitFor(() => {
      // expect(window.alert);
      expect(mockAlert).toHaveBeenCalled();
    });
  });
});
