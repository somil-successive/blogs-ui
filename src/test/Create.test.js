import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import Create from "../components/Create";
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
  useParams: () => ({ id: "create" }),
}));

describe("Create new page", () => {
  test("Testing create form", async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );

    axios.post.mockResolvedValue({
      data: { data: "blog created successfully" },
    });
    const title = screen.getByLabelText("Title");
    fireEvent.change(title, { target: { value: "Blog by somil" } });

    const body = screen.getByLabelText("Body");
    fireEvent.change(body, { target: { value: "body" } });

    const categories = screen.getByLabelText("Categories");
    fireEvent.change(categories, { target: { value: "sports" } });

    const approvedTrue = screen.getByTestId("approved-true");
    fireEvent.click(approvedTrue);

    const sensitiveTrue = screen.getByTestId("sensitive-true");
    fireEvent.click(sensitiveTrue);

    await waitFor(() => {
      const sbtn = screen.getByTestId("add-btn");
      fireEvent.click(sbtn);
      //   expect(window.location.pathname).toBe("/view");
    });
  });

  test("Testing create form", async () => {
    render(
      <BrowserRouter>
        <Create />
      </BrowserRouter>
    );
    const { id } = useParams();
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });
    const title = screen.getByLabelText("Title");
    fireEvent.change(title, { target: { value: "Blog by somil" } });

    const body = screen.getByLabelText("Body");
    fireEvent.change(body, { target: { value: "body" } });

    const categories = screen.getByLabelText("Categories");
    fireEvent.change(categories, { target: { value: "sports" } });

    const approvedTrue = screen.getByTestId("approved-true");
    fireEvent.click(approvedTrue);

    const sensitiveTrue = screen.getByTestId("sensitive-true");
    fireEvent.click(sensitiveTrue);
    // const sbtn = screen.getByTestId("add-btn");
    // expect(sbtn).toBeInTheDocument();
    // fireEvent.click(sbtn);

    console.log("id is: ", id);

    await waitFor(() => {
      const sbtn = screen.getByTestId("add-btn");
      expect(sbtn).toBeInTheDocument();
      fireEvent.click(sbtn);
      expect(window.location.pathname).toBe("/");
    });
  });
});
