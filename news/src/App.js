import React from "react";
import Blogs from "./Components/Blogs";
import Navbar from "./Components/Navbar";
import "./styling/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Blogs />
      </div>
    </div>
  );
};

export default App;
