import React, { useState } from "react";
import { Card, Button, Input, Space, Typography, Form } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [account, setAccount] = useState("login");
  const navigate = useNavigate();


  const handleLogin = async (values) => {
    try {
      console.log(values);

      const res = await axios.post(
        "http://localhost:4000/user/login",
        values
      );

      if (res.status === 200) {
        console.log("Login successful");

        navigate("/view");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log("Error during login", error);
    }
  };

  const handleRegister = async (values) => {
    try {

      const res = await axios.post(
        "http://localhost:4000/user/register",
        values
      );

      if (res.status === 200) {
        console.log("Register successful");
        alert("Registered successfully");
      } else {
        console.error("Register failed");
      }
    } catch (error) {
      console.log("Error during register", error);
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
        <Form data-testid='login-form' onFinish={account === 'login' ? handleLogin : handleRegister}>

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
                data-testid="logBtn"
                block
                onClick={handleLogin}
              >
                Login
              </Button>
              <Typography style={{ margin: "10px 0" }}>OR</Typography>
              <Button type="dashed" onClick={() => setAccount("register")}>
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
                rules={[{ required: true, message: "Password is required" }]}
                style={{ margin: 5 }}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" block onClick={handleRegister} htmlType="submit">
                Register
              </Button>
              <Typography style={{ margin: "10px 0" }}>OR</Typography>
              <Button type="dashed" onClick={() => setAccount("login")}>
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
