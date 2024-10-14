import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory(); // Use history for navigation after login
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to validate input
  const validateInput = (data) => {
    const { username, password } = data;
    if (!username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (!password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    return true;
  };

  // Function to perform login
  const login = async (data) => {
    if (!validateInput(data)) return;

    setLoading(true);
    try {
      const response = await axios.post(`${config.endpoint}/auth/login`, {
        username: data.username,
        password: data.password,
      });

      if (response.status === 201) {
        persistLogin(
          response.data.token,
          response.data.username,
          response.data.balance
        );
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        history.push("/"); // Navigate to the home page after login
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Please try again.",
          { variant: "error" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to store login information in localStorage
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            placeholder="Enter Password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            className="button"
            variant="contained"
            onClick={() => login(formData)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "LOGIN TO QKART"}
          </Button>
          <p className="secondary-action">
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
