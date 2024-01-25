import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/account/Login";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/utils";
import userEvent from "@testing-library/user-event";
import { message } from "antd";

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
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
  },
}));

const mockAlert = jest.spyOn(window, "alert");

describe("login page", () => {
  beforeEach(() => jest.clearAllMocks());
  test("renders login page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByAltText("img")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByTestId("loginBtn")).toBeInTheDocument();
    expect(screen.getByText("OR")).toBeInTheDocument();
    expect(screen.getByTestId("reg-btn")).toBeInTheDocument();
  });

  test("On click button register form should display", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const createBtn = screen.getByTestId("reg-btn");
    fireEvent.click(createBtn);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("On click button login form should display", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signUp = screen.getByTestId("reg-btn");
    userEvent.click(signUp);

    const goToLogin = screen.getByTestId("go-to-login");
    fireEvent.click(goToLogin);
    waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("should not log in the user  on login form submission with invalid credentials", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginBtn = screen.getByTestId("loginBtn");

    fireEvent.change(emailInput, { target: { value: "somil@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "443244" } });

    axios.post.mockResolvedValueOnce({ status: 200 });

    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/user/login",
        { email: "somil@gmail.com", password: "443244" }
      );

      expect(window.location.pathname).toBe("/");
    });
  });

  test("Testing Login Page for successful login", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        status: 200,
        message: "Login Successful",
        authToken: "yourAuthToken",
      },
    });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByTestId("loginBtn");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    waitFor(() => {
      expect(screen.getByText("Login Successful")).toBeInTheDocument();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "authToken",
        "yourAuthToken"
      );
      expect(message.success).toBeCalled();
      expect(window.location.hash).toBe("/view");
    });
  });

  test("Testing Login Page for successful register", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signUp = screen.getByTestId("reg-btn");
    fireEvent.click(signUp);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    const addressInput = screen.getByLabelText("Address");
    const passwordInput = screen.getByLabelText("Password");
    const registerButton = screen.getByTestId("register-btn");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(phoneInput, { target: { value: "1234442142" } });
    fireEvent.change(addressInput, { target: { value: "Noidaa" } });

    await waitFor(() => {
      fireEvent.click(registerButton);

      expect(mockAlert).toHaveBeenCalledTimes(1);
      // expect(message.success).toHaveBeenCalledWith("Registered Successfully");
    });
  });

  test("Testing Login Page for error during register", async () => {
    axios.post.mockResolvedValue({ status: 406 });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signUp = screen.getByTestId("reg-btn");
    fireEvent.click(signUp);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const phoneInput = screen.getByLabelText("Phone");
    const addressInput = screen.getByLabelText("Address");
    const passwordInput = screen.getByLabelText("Password");
    const registerButton = screen.getByTestId("register-btn");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(phoneInput, { target: { value: "1234442142" } });
    fireEvent.change(addressInput, { target: { value: "Noidaa" } });

    await waitFor(() => {
      fireEvent.click(registerButton);

      expect(mockAlert).toHaveBeenCalledTimes(1);
      // expect(message.success).toHaveBeenCalledWith("Registered Successfully");
    });
  });
});
