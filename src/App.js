import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import SinglePost from "./components/SinglePost";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes exact>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:slug" element={<SinglePost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
