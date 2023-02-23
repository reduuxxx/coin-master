import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import BookMarkCoinPage from "./pages/BookMarkCoinPage";
import HomePage from "./pages/HomePage";
import { DataContext } from "./utils/ContextFile";
import { Typography } from "@mui/material";
const App = () => {
  const { account } = useContext(DataContext);
  return (
    <>
      <div className="container mt-3">
        <Navbar />
      </div>

      {account ? (
        <>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="container mt-4">
                  <HomePage />
                </div>
              }
            />
            <Route
              exact
              path="/watchlist"
              element={
                <div className="container mt-4">
                  <BookMarkCoinPage />
                </div>
              }
            />
          </Routes>
        </>
      ) : (
        <div className="container mt-5">
          <Typography
            variant="h3"
            
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 400,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Account is not connected !!! Please Connect your Wallet ...
          </Typography>
        </div>
      )}
    </>
  );
};

export default App;
