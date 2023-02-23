import React from "react";
import CoinList from "./components/CoinList";
import Navbar from "./components/Navbar";
import { Route, Router, Routes ,  } from "react-router-dom";
import BookMarkCoinPage from "./pages/BookMarkCoinPage";
const App = () => {
  return (
    <>
      <div className="container mt-3">
        <Navbar />
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="container mt-4">
              <CoinList />
            </div>
          }
        />
        <Route
          exact
          path="/watchlist"
          element={
            <div className="container mt-4">
              <BookMarkCoinPage/>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
