import React, { Suspense, Component } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import Home from "./components/Home";
import Predict from "./components/Predict";
import Recommend from "./components/Recommend";
import Login from "./components/Login";
import Register from "./components/Register";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LanguageMenu from "./components/LanguageMenu";

function App({ t }) {
  return (
    <Router>
      <div
        className="App"
        style={{
          background: "url('background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AppBar
            position="static"
            style={{
              background: "green",
              color: "white",
              background: "rgba(0,255,0,0.5)",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  color="inherit"
                  sx={{ flexGrow: 1 }}
                  component="div"
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("app.title")}
                  </Link>
                </Typography>

                <LanguageMenu />
                <button
                  style={{
                    width: "5rem",
                    marginLeft: "0.8rem",
                    background: "none",
                    color: "white",
                    fontFamily: "times-new-roman",
                    fontSize: "1.1rem",
                  }}
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Log out
                  </Link>
                </button>
              </Toolbar>
            </Box>
          </AppBar>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/recommend" element={<Recommend />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default withTranslation()(App);
