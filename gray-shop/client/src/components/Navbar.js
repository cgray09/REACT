import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";
import { DropdownButton, Dropdown, ButtonGroup, SplitButton, Button } from 'react-bootstrap';

export default function Navbar() {
  const cartreducer = useSelector((state) => state.cartReducer);

  const { cartItems } = cartreducer;

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch()

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          GRAY SHOP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"><i class="fas fa-bars" style={{color:'white'}}></i></span>
        </button>



        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {currentUser ? (
              <div class="dropdown">
                {/* <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"

                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i style={{color:'white'}} className="fa fa-user" aria-hidden="true"></i> {currentUser.name}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                  <li className="dropdown-item" onClick={()=>{dispatch(logoutUser())}}>
                    Logout <i class="fas fa-sign-out-alt"></i>
                  </li>
                </div> */}


                <div class="dropdown">
                  <a className="c">
                    <i class="fa fa-user i-style" aria-hidden="true"></i>
                    {currentUser.name}
                    <i class="fas fa-caret-down"></i>
                  </a>
                  <div class="dropdown-content">
                    <a className="a-style" href="/profile">Profile</a>
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
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}

            <li className="nav-item">
              <a className="nav-link" href="/cart">
                <i class="fas fa-shopping-cart"></i> {cartItems.length}
              </a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
