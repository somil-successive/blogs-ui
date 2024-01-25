import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BulkUpload from "../components/BulkUpload";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
describe("Bulk Upload", () => {
  test("renders bulk upload page", () => {
    render(
      <BrowserRouter>
        <BulkUpload />
      </BrowserRouter>
    );

    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload Listing")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();
    expect(screen.getByText("UPLOAD CSV FILE")).toBeInTheDocument();
    expect(screen.getByTestId("upload-btn")).toBeInTheDocument();
  });

  test("should handle file upload successfully", async () => {
    render(
      <BrowserRouter>
        <BulkUpload />
      </BrowserRouter>
    );

    const file = new File(["file contents"], "test-file.txt", {
      type: "text/plain",
    });

    const fileInput = screen.getByPlaceholderText("select file");
    await userEvent.upload(fileInput, file);

    const uploadButton = screen.getByTestId("upload-btn");
    await userEvent.click(uploadButton);

    waitFor(() => {
      expect(window.alert).to("File uploaded successfully.");
    });
  });

  test("should display an error message if uploading fails", async () => {
    axios.get.mockRejectedValue({ error: "Error uploading file:" });

    render(
      <BrowserRouter>
        <BulkUpload />
      </BrowserRouter>
    );

    waitFor(() => {
      expect(window.alert).to("Error uploading file:");
    });
  });
});
