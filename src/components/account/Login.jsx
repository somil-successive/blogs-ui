import React, { useState } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Typography,
  Form,
  message,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [account, setAccount] = useState("login");

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      console.log("event :", values);

      const res = await axios.post("http://localhost:4000/user/login", values);

      if (res.status === 200) {
        localStorage.setItem("authToken", res?.data.authToken);
        message.success("Login Successfull");

        navigate("/view");
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Invalid Credentials",
      });
    }
  };

  const handleRegister = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/user/register",
        values
      );

      if (res.status === 200) {
        message.success("Registered Successfully");
      } else {
        throw new Error("Register failed");
      }
    } catch (error) {
      message.error("Register Failed");
    }
  };

  return (
    <>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Blogger_logo.svg/2560px-Blogger_logo.svg.png"
        height={150}
        width={300}
        alt="img"
      />

      <Card
        title={account === "login" ? "Login" : "Register"}
        style={{
          fontFamily: "fantasy",
          fontStyle: "italic",
          width: 400,
          margin: "auto",
          marginTop: 50,
          borderRadius: 10,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Form
          data-testid="login-form"
          onFinish={account === "login" ? handleLogin : handleRegister}
        >
          {account === "login" ? (
            <Space direction="vertical">
              <Form.Item
                label="Email"
                name="email"
                data-testid="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                data-testid="pass"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                data-testid="loginBtn"
                block
              >
                Login
              </Button>
              <Typography style={{ margin: "10px 0" }}>OR</Typography>
              <Button
                data-testid="reg-btn"
                type="dashed"
                onClick={() => setAccount("register")}
              >
                Create new account
              </Button>
            </Space>
          ) : (
            <Space direction="vertical">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Phone is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Password is required" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters",
                  },
                ]}
                style={{ margin: 5 }}
              >
                <Input.Password />
              </Form.Item>
              <Button
                data-testid="register-btn"
                type="primary"
                block
                htmlType="submit"
              >
                Register
              </Button>
              <Typography style={{ margin: "10px 0" }}>OR</Typography>
              <Button
                data-testid="go-to-login"
                type="dashed"
                onClick={() => setAccount("login")}
              >
                Already have an account
              </Button>
            </Space>
          )}
        </Form>
      </Card>
    </>
  );
};

export default Login;
