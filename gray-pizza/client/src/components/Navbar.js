import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userActions";
import Filter from "./Filter";

export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const dispatch = useDispatch()

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          GRAY PIZZA
        </a>
        <Filter/>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"><i style={{color:'black'}} className="fas fa-bars"></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {currentUser ? (
              <div className="dropdown mt-2">
              {/* <a style={{color:'black'}} className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {currentUser.name}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="/orders">Orders</a>
                <a className="dropdown-item" href="#" onClick={()=>{dispatch(logoutUser())}}><li>Logout</li></a>
              </div> */}

              <div class="dropdown">
                <div >
                
                  <a className="div-style">
                    <i class="fa fa-user i-style" aria-hidden="true"></i>
                    {currentUser.name}
                    <i class="fas fa-caret-down"></i>
                  </a>
                  
                </div>
                <div class="dropdown-content">
                  <a className="a-style" href="/orders">
                    Orders
                  </a>
                  <a className="a-style" onClick={()=>{dispatch(logoutUser())}}>
                    Logout
                  </a>
                </div>
                

              </div>


            </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link login-style" href="/login">
                  Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="cart-style" href="/cart">
              <i class="fas fa-shopping-cart"></i> {cartstate.cartItems.length}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
