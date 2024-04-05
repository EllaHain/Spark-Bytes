import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/utility/validationUtils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { updateAuthToken } = useAuth(); //getting the updateAuthToken from useAuth

  const login = async (token: string) => {
    updateAuthToken(token); //calls updateAuthToken function to update authentication token
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      //need to validate the email and password before moving forward, if either is not validated we send an error
      if (!validateEmail(email) || !validatePassword(password)) {
        message.error("Invalid email or password");
        setLoading(false);
      }

      const response = await fetch("http://localhost:5005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        //we want to store the token into AuthToken if the login is successful
        login(data.token); //calls login function to store the token
        message.success("Login successful");
        //now that user has successfully logged in, we send them to the home page
        window.location.href = "../login/index";
      } else {
        //displays an error message when there are invalid credentials
        message.error(data.message);
        console.error("Login did not succeed.");
      }
    } catch (error) {
      console.error("Login failed: ", error);
      message.error("An error has ocurred, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f8ea",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "white",
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 style={{ alignContent: "center" }}>Login</h1>
        <Form name="login" onFinish={handleLogin}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email"></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
