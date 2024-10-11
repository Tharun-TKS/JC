import React, { Component } from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

export default class Footer extends Component {
  render() {
    return (
      <div>
        {/* Footer */}
        <section className="section-padding bg-white border-top">
          <div className="container"></div>
        </section>

        <section className="section-padding footer bg-white border-top">
          <div className="container" style={{ fontSize: "13px" }}>
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <h4 className="mb-5 mt-0">
                  <a className="logo" href="/">
                    <img src="img/footerlogo.webp" alt="JC Creations" />
                  </a>
                </h4>
                <p className="mb-0">
                  <a className="text-dark" href="#">
                    <i className="mdi mdi-phone" /> +91 8310 726 160
                  </a>
                </p>
              </div>
              <div className="col-lg-2 col-md-2">
                <h6 className="mb-4">Customer Service </h6>
                <ul>
                  <li>
                    <a href="/contact-us">Contact Us</a>
                  </li>
                  <li>
                    <a href="/sitemap">Site Map</a>
                  </li>

                  <ul></ul>
                </ul>
              </div>

              <div className="col-lg-2 col-md-2">
                <h6 className="mb-4">Company Information</h6>
                <ul>
                  {/* <Link to="/about-us" style={{ textDecoration: 'none', color: 'blue' }}>
                                        About Us
                                    </Link> */}
                  <li>
                    <a href="/about-us">About Us</a>
                  </li>
                  <li>
                    <a href="/pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="/returnsandcancellation">
                      Return & Cancalation Policy
                    </a>
                  </li>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-and-conditions">Terms & Conditions</a>
                  </li>

                  <ul></ul>
                </ul>
              </div>
              {/* <div className="col-lg-2 col-md-2">
                                <h6 className="mb-4">My Account</h6>
                                <ul>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Order History</a></li>
                                    <li><a href="#">Wish List</a></li>
                                    <li><a href="#">Newsletter</a></li>
                                    <ul>
                                    </ul></ul></div> */}
              <div className="col-lg-3 col-md-3">
                <h6 className="mb-3 mt-4">GET IN TOUCH</h6>
                <div className="footer-social">
                  <a className="btn-facebook" href="#">
                    <i className="mdi mdi-facebook" />
                  </a>
                  <a className="btn-twitter" href="#">
                    <i className="mdi mdi-twitter" />
                  </a>
                  <a className="btn-instagram" href="#">
                    <i className="mdi mdi-instagram" />
                  </a>
                  <a className="btn-whatsapp" href="#">
                    <i className="mdi mdi-whatsapp" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Footer */}
        {/* Copyright */}
        <section className="pt-4 pb-4 footer-bottom">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-lg-6 col-sm-6">
                <p className="mt-1 mb-0">
                  © Copyright 2024{" "}
                  <strong className="text-dark">JC Creations</strong>. All
                  Rights Reserved
                  <br />
                  {/* <small className="mt-0 mb-0">Made by Beyondwave Technologies Private Limited
                                    </small> */}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End Copyright */}
      </div>
    );
  }
}
