import React from "react";
import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import Create from "../components/Create";
import userEvent from "@testing-library/user-event";
import axios from "axios";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "12345" }),
}));

describe("Edit page", () => {
  test("submits the form for adding a blog", async () => {
    const mockData = {
      title: "Test Blog",
      body: {
        description: "This is a test blog",
        links: "www.testblog.com",
      },
      likes: "10",
      approved: "true",
      imageUrl: "www.testimage.com",
      categories: "1",
      isSensitive: false,
      tags: "test",
      writer: {
        id: "12345",
        name: "Test Writer",
        email: "test@test.com",
        profileUrl: "www.testwriter.com",
      },
    };

    axios.get.mockResolvedValue({ data: { data: mockData } });
    axios.patch.mockResolvedValue({ data: { data: "abcd" } });

    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    // const submtButton = screen.getByTestId("add-btn");
    // expect(submtButton).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toHaveValue("Test Blog");
      expect(screen.getByLabelText("Body")).toHaveValue("This is a test blog");
      expect(screen.getByLabelText("likes")).toHaveValue("10");
      // expect(screen.getByLabelText("Approved")).toHaveValue("true");
      expect(screen.getByLabelText("imageUrl")).toHaveValue(
        "www.testimage.com"
      );
      // expect(screen.getByLabelText("Categories")).toHaveValue("sports");
      // expect(screen.getByLabelText("isSensitive")).toHaveValue(false);
      expect(screen.getByLabelText("tags")).toHaveValue("test");
      expect(screen.getByLabelText("Writer-Id")).toHaveValue("12345");
      expect(screen.getByLabelText("Writer-Name")).toHaveValue("Test Writer");
      expect(screen.getByLabelText("Writer-Email")).toHaveValue(
        "test@test.com"
      );
      expect(screen.getByLabelText("Writer-ProfilePicUrl")).toHaveValue(
        "www.testwriter.com"
      );
    });
    await waitFor(() => {
      const sbtn = screen.getByTestId("add-btn");
      fireEvent.click(sbtn);
    });
  });

  test("error while adding a blog", async () => {
    const mockData = {
      title: "Test Blog",
      body: {
        description: "This is a test blog",
        links: "www.testblog.com",
      },
      likes: "10",
      approved: "true",
      imageUrl: "www.testimage.com",
      categories: "1",
      isSensitive: false,
      tags: "test",
      writer: {
        id: "12345",
        name: "Test Writer",
        email: "test@test.com",
        profileUrl: "www.testwriter.com",
      },
    };

    axios.get.mockResolvedValue({ data: { data: mockData } });
    axios.patch.mockRejectedValueOnce({ response: { status: 401 } });

    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toHaveValue("Test Blog");
      expect(screen.getByLabelText("Body")).toHaveValue("This is a test blog");
      expect(screen.getByLabelText("likes")).toHaveValue("10");
      expect(screen.getByLabelText("imageUrl")).toHaveValue(
        "www.testimage.com"
      );
      expect(screen.getByLabelText("tags")).toHaveValue("test");
      expect(screen.getByLabelText("Writer-Id")).toHaveValue("12345");
      expect(screen.getByLabelText("Writer-Name")).toHaveValue("Test Writer");
      expect(screen.getByLabelText("Writer-Email")).toHaveValue(
        "test@test.com"
      );
      expect(screen.getByLabelText("Writer-ProfilePicUrl")).toHaveValue(
        "www.testwriter.com"
      );
    });

    await waitFor(() => {
      const sbtn = screen.getByTestId("add-btn");
      fireEvent.click(sbtn);
      expect(window.location.pathname).toBe("/");
    });
  });
});
