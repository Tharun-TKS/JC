import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class PrivacyPolicy extends Component {
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
              <h2>Privacy Policy</h2>
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
                  <p className="privacy-policy-text">
                 This website is owned, hosted, and operated by "JC Creations" (hereinafter referred to as "JC Creations"). Unless explicitly stated otherwise, all content featured or displayed on the website, including but not limited to photographic images, text, graphics, website layout, sound, illustrations, software, trade dress, trademarks, and their arrangement ("JC Creations Content"), is the property of JC Creations, its affiliates, subsidiaries, licensors, contributors, or third-party image partners.
             </p>
             <p className="privacy-policy-text">
                 By using the website, you agree to:
             </p>
             <ul className="privacy-policy-list">
                 <li>
                     Provide accurate, current, and complete information about yourself as prompted by any registration forms on the website ("Registration Data").
                 </li>
                 <li>
                     Maintain and promptly update the Registration Data and any other information you provide to JC Creations to ensure its accuracy, currency, and completeness.
                 </li>
                 <li>
                     Safeguard the security of your password and identification.
                 </li>
                 <li>
                     Notify JC Creations immediately of any unauthorized use of your account or any other security breaches.
                 </li>
                 <li>
                     Assume full responsibility for all activities conducted through your account.
                 </li>
                 <li>
                     Acknowledge and assume all risks associated with unauthorized access to the Registration Data and any other information you provide to JC Creations.
                 </li>
             </ul>
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

export default PrivacyPolicy;
