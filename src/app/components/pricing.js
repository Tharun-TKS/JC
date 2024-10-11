
import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true, // Assuming the content is static and will not require loading
    };
  }

  render() {
    const { isLoaded } = this.state;

    return (
      <div>
        <section className="about-us section-padding">
          <div className="container" style={{ padding: "0 5px" }}>
            <div className="section-header text-center">
              <h2>Pricing</h2>
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
                    <p>
                      The price for each product or design is clearly indicated
                      alongside its respective listing. Please note that the
                      site management retains the authority to modify the
                      pricing of any product or design on the site at its
                      discretion, and such adjustments may occur at any time. It
                      is important to emphasize that any alterations in pricing
                      do not impact previously purchased items.
                    </p>

                    <p>
                      Payments can be conveniently made using credit cards or
                      UPI (Unified Payments Interface).
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

export default Pricing;
