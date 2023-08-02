import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import { FiChevronDown } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import tbrPhoto from "../../assets/tbr-logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutRedux } from "../../redux/userSlice";
import toast from "react-hot-toast";
const NavBar = () => {
  const [isMenuSubMenu, setIsMenuSubMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const userData = useSelector((state) => state.user);
  console.log(userData.email);

  const dispatch = useDispatch();

  const toggleSubmenu = () => {
    setIsMenuSubMenu(!isMenuSubMenu);
  };

  /*display mobile navigation*/
  const currentNav = "mobile_nav";
  const [mobNav, setMobNav] = useState("mobile_nav-closed");
  const openNav = () => {
    setMobNav("mobile__nav-open");
  };

  const closeNav = () => {
    setMobNav("mobile_nav-closed");
  };

  const handlerShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handlerLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
  };
  console.log(process.env.REACT_APP_ADMIN_EMAIL);

  return (
    <div className="header">
      <NavLink to="/Home" className="logo-container">
        <img src={tbrPhoto} alt="" />
      </NavLink>
      <nav className="nav" id="nav-active">
        <ul className="ul">
          <li>
            <NavLink to="/Home" className="navlink">
              Home
            </NavLink>
          </li>

          <li id="nav__li" className="droplink">
            <NavLink to="#" className="navlink ">
              Services
            </NavLink>

            <div className="drop-items">
              <NavLink to="/Ride">
                <div className="drop-hover">Take a Ride</div>
              </NavLink>

              <NavLink to="/Booking">
                <div className="drop-hover">Booking</div>
              </NavLink>

              <NavLink to="/Rent">
                <div className="drop-hover">Renting</div>
              </NavLink>
            </div>
          </li>
          <li>
            <NavLink to="/Help" className="navlink">
              Help
            </NavLink>
          </li>
          <li>
            <NavLink to="/About us" className="navlink">
              About us
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="navbtn">
        {userData.image ? (
          <div onClick={handlerShowMenu}>
            {/* <div className="fa-icons">
              <div className="bars">
                <FaBars />
              </div>
              <div className="circle"> */}
            <div
              style={{
                width: "3rem",
                height: "3rem",
              }}
            >
              <img
                src={userData.image}
                alt="user profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            </div>
            {/* <FaUserCircle />
              </div>
            </div> */}
            {showMenu && (
              <div className="shows">
                {/* {userData.email === process.env.REACT_APP_ADMIN_EMAIL &&} */}
                <div className="sign">
                  <div className="sign-in">
                    <NavLink to="/Signin">Message</NavLink>
                  </div>
                  <div>
                    <NavLink to="/Signup">Notifications</NavLink>
                  </div>
                </div>
                <div className="shows-page">
                  <p>
                    <NavLink to="/our home">Our home</NavLink>
                  </p>
                  <p>
                    <NavLink to="/our home">Help</NavLink>
                  </p>
                  <p onClick={handlerLogout} style={{ cursor: "pointer" }}>
                    Log out ({userData.firstName})
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="navbtn">
            <div className="sign_btn">
              <NavLink to="/Signin">
                <button className="btn" id="btn_n">
                  Signin
                </button>
              </NavLink>
            </div>
            <div className="sign_btn">
              <NavLink to="/Signup">
                <button className="btn" id="btn_full">
                  Signup
                </button>
              </NavLink>
            </div>
          </div>
        )}

        {/* mobile na bar */}

        <div className="nav_icon">
          <button onClick={openNav}>
            <FaBars />
          </button>

          <div className={currentNav + " " + mobNav}>
            <div className="close_menu">
              <button onClick={closeNav}>
                <FaTimes />
              </button>
            </div>

            <div className="nav_bar">
              <nav className="nav-mobile-links">
                <ul className="ul-mobile">
                  <li>
                    <NavLink
                      to="/Home"
                      className="navlink-mob"
                      activeClassName="active"
                    >
                      <pan className="navlink__home">Home</pan>
                    </NavLink>
                  </li>

                  <li
                    className="navlink-mob"
                    id="nav__li"
                    onClick={toggleSubmenu}
                  >
                    <Link to="#" className="navlink-mob">
                      Services <FiChevronDown />
                    </Link>
                    {isMenuSubMenu ? (
                      <div className="class-mob">
                        <ul style={{ listStyle: "none" }}>
                          <li>
                            <NavLink
                              to="/Ride"
                              className="class-mob-link"
                              id="id"
                            >
                              Take a Ride
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/Booking"
                              className="class-mob-link"
                              id="id"
                            >
                              Booking
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/Rent"
                              className="class-mob-link"
                              id="id"
                            >
                              Rental
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </li>
                  <li>
                    <NavLink
                      to="/Help"
                      className="navlink-mob"
                      activeClassName="active"
                    >
                      Help
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/About us"
                      className="navlink-mob"
                      activeClassName="active"
                    >
                      About us
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
