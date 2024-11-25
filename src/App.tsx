import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";

import { Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthRoute from "./Components/AuthRoute";
import ChatApp from "./Pages/Chat-app";
import dotenv from "dotenv";
dotenv.config();

function App() {
  return (
    <Routes>
      <Route
        path="ChatPath"
        element={
          <AuthRoute>
            {" "}
            <ChatApp />{" "}
          </AuthRoute>
        }
      />
      <Route path="/" element={<LoginPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
