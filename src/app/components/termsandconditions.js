import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true, 
    };
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <div>
        <section className="about-us section-padding">
          <div className="container" style={{ padding: "0 5px" }}>
            <div className="section-header text-center">
              <h2>Terms & Conditions</h2>
              <br />
            </div>
            <div className="row justify-content-center">
              {!isLoaded ? (
                <div className="progress-bar-bk">
                  <CircularProgress color="secondary" />
                </div>
              ) : (
                <div className="col-12">
                  <div className="about-content">
                               <p className="terms-conditions-text">
                 The Terms and Conditions outlined here are applicable to all services provided by JC Creations. By registering as a Buyer, you agree to adhere to these Terms and Conditions, which can only be modified through private discussion and arrangement. We encourage you to familiarize yourself with our website and how our system operates.
             </p>
             <p className="terms-conditions-text">
                 Upon selecting your purchase, you will receive the purchased item or folder within a timeframe ranging from 1 minute to 24 hours. Rest assured, we will not debit your account until the purchase has been accepted and verified.
             </p>
             <p className="terms-conditions-text">
                 Our website offers various internet-based services, including Digital Product purchases and a Consulting Service. As a User, you will register on the site, log in, and place your order. Once payment is received and confirmed by our payment service provider, you will either receive a link to download your purchased product or the download will commence automatically. Should you encounter any issues, please promptly contact JC Creations support for assistance.
             </p>
             <p className="terms-conditions-text">
                 Each product or design purchased through your registered account can be downloaded an unlimited number of times.
             </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default TermsAndConditions;
