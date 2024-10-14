import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack,TextField, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import { Search } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./Header.css";

const Header = ({children, hasHiddenAuthButtons, handleSearch }) => {
  const history = useHistory();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const username = localStorage.getItem("username") || "User";

  // const handleLogout = () => {
  //   if (window.confirm("Are you sure you want to log out?")) {
  //     localStorage.clear();
  //     history.push("/login");
  //   }
  // };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
    // window.location.reload();
  };

  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_dark.svg" alt="QKart-icon" />
      </Box>


      {/* Display search bar if a search function is passed as a prop */}
      {children}
      {handleSearch && (
        <TextField
          className="search-desktop"
          size="small"
          placeholder="Search for items/categories"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}



      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          component={Link}
          to="/"
          role="button"
          aria-label="Back to explore"
        >
          Back To Explore
        </Button>
      ) : isLoggedIn ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src="/avatar.png" alt={username} />
          <p>{username}</p>
          <Button variant="contained" onClick={handleLogout} aria-label="Logout">
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Button variant="text" component={Link} to="/login" role="button" aria-label="Login">
            Login
          </Button>
          <Button variant="contained" component={Link} to="/register" role="button" aria-label="Register">
            Register
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;

