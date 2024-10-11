// import React from "react";

// const ReturnsAndCancellation = () => {
//     return (
//         <section className="returns-cancellation-section" >
//             <div className="container">
//                 <h2>Returns & Cancellation</h2>
//                 <p>
//                     JC Creations does not provide refunds or re-credits for downloaded files.
//                     Requests for file returns will only be entertained in instances of technical issues with the file,
//                     subject to the sole discretion of JC Creations. The site management retains the right to initially address
//                     and resolve any technical concerns, which may involve offline correction of the final artwork for the customer.
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default ReturnsAndCancellation;

import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class ReturnsAndCancellation extends Component {
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
              <h2>Returns & Cancellation</h2>
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
                      JC Creations does not provide refunds or re-credits for
                      downloaded files. Requests for file returns will only be
                      entertained in instances of technical issues with the
                      file, subject to the sole discretion of JC Creations. The
                      site management retains the right to initially address and
                      resolve any technical concerns, which may involve offline
                      correction of the final artwork for the customer.
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

export default ReturnsAndCancellation;
