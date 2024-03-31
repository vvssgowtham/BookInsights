import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Book from "./components/Book";
import UpdateBookInfo from "./components/UpdateBookInfo";
import CreateBook from "./components/CreateBook";

export const store = createContext();

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("token", token);
  }, [token]);

  return (
    <store.Provider value={[token, setToken]}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/update-book/:id" element={<UpdateBookInfo />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Routes>
      </Router>
    </store.Provider>
  );
};

export default App;
