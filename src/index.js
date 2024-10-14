import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom"; // Use BrowserRouter instead of Router
import { ThemeProvider } from "@mui/material/styles"; // Corrected import for ThemeProvider
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <BrowserRouter> {/* Use BrowserRouter here */}
        <ThemeProvider theme={theme}> {/* Wrap with ThemeProvider to apply MUI theme */}
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
