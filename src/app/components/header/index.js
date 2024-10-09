import React, { Component } from "react";
import Login from "../../auth/login";
import { withRouter } from "react-router-dom";
import Cartsidebar from "../web/views/cart-sidebar";
import { GetUserLogin } from "../services";
import { GetCategoryDetails } from "../services";
import "./style.css"; // Include the updated CSS file

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userName: "",
      searchtxt: "",
      categories: [],
      dropdownVisible: false,
      isMobile: false, // To track if it's mobile view
    };
  }

  async componentDidMount() {
    let cookies = await GetUserLogin.isAuthenticate();
    this.setState({ token: cookies });
    let email = sessionStorage.getItem("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ userName: user.data.fullName });
      }
    }

    // Fetch categories
    this.fetchCategories();

    // Set mobile view based on screen width
    this.checkMobileView();
    window.addEventListener("resize", this.checkMobileView);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.checkMobileView);
  }

  checkMobileView = () => {
    this.setState({ isMobile: window.innerWidth <= 768 }); // Mobile if width is less than or equal to 768px
  };
  fetchCategories = async () => {
    try {
      const list = await GetCategoryDetails.getAllCategorySubCategoryList();
      this.setState({ categories: list.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
    this.props.history.push("/"); // Redirect to home or login page after logout
  };

  handleClickSearch = (event) => {
    const { searchtxt } = this.state;
    this.props.history.push(`/product/catalogsearch/result/${searchtxt}`);
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  render() {
    const { token, userName, searchtxt, dropdownVisible, isMobile } =
      this.state;

    return (
      <div>
        <header className="header clearfix">
          <nav className="navbar navbar-light navbar-expand-lg">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img src="/img/jclogo.png" alt="logo" />
              </a>

              <div
                className="navbar-nav ml-auto"
                style={{
                    display: isMobile ? "block" : "none",
                    padding: "10px 15px", // Adjust padding as needed
                  }}
              >
                <ul className="list-inline main-nav-right">
                  <li className="list-inline-item">
                    <a
                      data-target="#bd-example-modal"
                      data-toggle="modal"
                      className="btn btn-link"
                      style={token ? { display: "none" } : { display: "block" }}
                    >
                      <i className="mdi mdi-account-circle" /> Login/Sign Up
                    </a>
                    <div
                      className="dropdown"
                      style={token ? { display: "block" } : { display: "none" }}
                    >
                      <button
                        className="btn btn-account dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="mdi mdi-account-circle" />
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                        style={{
                            position: 'absolute', // or 'fixed' depending on your preference
                            top: '60px', // Adjust this value based on your header height
                            left: '0',
                            right: '0',
                            zIndex: '1000', // Ensure it's above other elements

                          }}
                      >
                        <a className="dropdown-item" href="/account/view">
                          <i className="uil uil-apps" /> Dashboard
                        </a>
                        <a className="dropdown-item" href="/account/profile">
                          <i
                            className="mdi mdi-account-outline"
                            aria-hidden="true"
                          ></i>{" "}
                          My Profile
                        </a>
                        <a className="dropdown-item" href="/account/wishlist">
                          <i
                            className="mdi mdi-heart-outline"
                            aria-hidden="true"
                          ></i>{" "}
                          Wish List
                        </a>
                        <a className="dropdown-item" href="/account/order/list">
                          <i
                            className="mdi mdi-format-list-bulleted"
                            aria-hidden="true"
                          ></i>{" "}
                          Orders List
                        </a>
                        <div className="dropdown-divider"></div>
                        <span
                          className="dropdown-item"
                          onClick={this.handleLogout}
                        >
                          <i className="mdi mdi-lock" aria-hidden="true"></i>{" "}
                          Logout
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-inline-item cart-btn">
                    <Cartsidebar />
                  </li>
                </ul>
              </div>

              <button
                className="navbar-toggler"
                type="button"
                onClick={this.toggleDropdown}
                aria-controls="navbarNavDropdown"
                aria-expanded={dropdownVisible}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className={`navbar-collapse ${dropdownVisible ? "show" : ""}`}
                id="navbarNavDropdown"
              >
                <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <div
                    className={`top-categories-search-main ${
                      dropdownVisible ? "d-block" : "d-none"
                    }`}
                  >
                    <div className="top-categories-search">
                      <input
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search products in Your City"
                        type="text"
                        name="searchtxt"
                        value={searchtxt}
                        onChange={this.handleChange}
                      />
                      <button
                        className="btn btn-secondary"
                        onClick={this.handleClickSearch}
                      >
                        <i className="mdi mdi-file-find" /> Search
                      </button>
                    </div>
                  </div>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="/product/catalogsearch/result"
                      >
                        Categories
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://www.youtube.com/watch?v=UAPpNfXqFCo&feature=youtu.be"
                      >
                        How to Buy Designs (తెలుగు)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://www.youtube.com/watch?v=di3FWmT3QnY"
                      >
                        How to Buy Designs (ಕನ್ನಡ)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://drive.google.com/drive/folders/1E3v2HpcRObeTQvkpUNlVrDav-3XAUWU_"
                      >
                        Catalog
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="navbar-nav ml-auto"
                  style={isMobile ? { display: "none" } : { display: "block" }}
                >
                  <ul className="list-inline main-nav-right">
                    <li className="list-inline-item">
                      <a
                        data-target="#bd-example-modal"
                        data-toggle="modal"
                        className="btn btn-link"
                        style={
                          token ? { display: "none" } : { display: "block" }
                        }
                      >
                        <i className="mdi mdi-account-circle" /> Login/Sign Up
                      </a>
                      <div
                        className="dropdown"
                        style={
                          token ? { display: "block" } : { display: "none" }
                        }
                      >
                        <button
                          className="btn btn-account dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {userName}
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="/account/view">
                            <i className="uil uil-apps" /> Dashboard
                          </a>
                          <a className="dropdown-item" href="/account/profile">
                            <i
                              className="mdi mdi-account-outline"
                              aria-hidden="true"
                            ></i>{" "}
                            My Profile
                          </a>
                          <a className="dropdown-item" href="/account/wishlist">
                            <i
                              className="mdi mdi-heart-outline"
                              aria-hidden="true"
                            ></i>{" "}
                            Wish List
                          </a>
                          <a
                            className="dropdown-item"
                            href="/account/order/list"
                          >
                            <i
                              className="mdi mdi-format-list-bulleted"
                              aria-hidden="true"
                            ></i>{" "}
                            Orders List
                          </a>
                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            onClick={this.handleLogout}
                          >
                            <i className="mdi mdi-lock" aria-hidden="true"></i>{" "}
                            Logout
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="list-inline-item cart-btn">
                      <Cartsidebar />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Login />
      </div>
    );
  }
}

export default withRouter(Navigation);
