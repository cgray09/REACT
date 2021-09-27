import React from "react";
import { useSelector } from "react-redux";
import Blogs from "./Components/Blogs";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import { selectSignedIn } from "./features/userSlice";
import Footer from './Components/Footer';
import "./styling/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Homepage />
        {isSignedIn && <Blogs />}
      </div>
      <Footer/>
    </div>
  );
};

export default App;
