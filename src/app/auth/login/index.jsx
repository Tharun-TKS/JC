// import React, { Component } from 'react';
// import { GetUserLogin } from '../../components/services';
// import { NotificationManager } from "react-notifications";
// import Register from '../register';
// import ForgotPassword from '../password';

// const emailRegex = RegExp(
//     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//     let valid = true;
//     Object.values(formErrors).forEach(val => {
//         val.length > 0 && (valid = false);
//     });
//     Object.values(rest).forEach(val => {
//         val === null && (valid = false);
//     });
//     return valid;
// };

// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: null,
//             password: null,
//             formErrors: {
//                 email: "",
//                 password: ""
//             },
//             activeTab: "login" // Track the active tab
//         };
//     }

//     handleChange = e => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         let formErrors = { ...this.state.formErrors };

//         switch (name) {
//             case "email":
//                 formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
//                 break;
//             case "password":
//                 formErrors.password = value.length < 6 ? "minimum 6 characters required" : "";
//                 break;
//             default:
//                 break;
//         }

//         this.setState({ formErrors, [name]: value });
//     };

//     handleSubmit = async (event) => {
//         event.preventDefault();
//         let { email, password } = this.state;
//         let data = { email: email, password: password };

//         if (formValid(this.state) && this.state.activeTab === "login") { // Check active tab
//             let user = await GetUserLogin.getUserLogin(data);
//             if (user) {
//                 NotificationManager.success("success", "Login");
//                 await GetUserLogin.authenticate(user.token, email);
//             } else {
//                 NotificationManager.error("Please check your email & password", "Input Error");
//             }
//         } else if (this.state.activeTab === "login") {
//             NotificationManager.error("Please check your Login", "Input Error");
//         }
//     }

//     handleTabChange = (tab) => {
//         this.setState({ activeTab: tab }); // Update active tab
//     }

//     render() {
//         let { email, password, formErrors, activeTab } = this.state;
//         return (
//             <div>
//                 <div className="modal fade login-modal-main" id="bd-example-modal">
//                     <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
//                         <div className="modal-content">
//                             <div className="modal-body">
//                                 <div className="login-modal">
//                                     <div className="row">
//                                         <div className="col-lg-6 pad-right-0">
//                                             <div className="login-modal-left">
//                                                 {/* Your left side content */}
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6 pad-left-0">
//                                             <button type="button" className="close close-top-right" data-dismiss="modal" aria-label="Close">
//                                                 <span aria-hidden="true"><i className="mdi mdi-close" /></span>
//                                                 <span className="sr-only">Close</span>
//                                             </button>
//                                             <form onSubmit={this.handleSubmit} noValidate>
//                                                 <div className="login-modal-right">
//                                                     {/* Tab panes */}
//                                                     <div className="tab-content">
//                                                         <div className={`tab-pane ${activeTab === 'login' ? 'active' : ''}`} id="login" role="tabpanel">
//                                                             <h5 className="heading-design-h5">Login to your account</h5>
//                                                             <fieldset className="form-group">
//                                                                 <label>Enter Email/Mobile number</label>
//                                                                 <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
//                                                                 {activeTab === 'login' && formErrors.email.length > 0 && (
//                                                                     <span className="errorMessage">{formErrors.email}</span>
//                                                                 )}
//                                                             </fieldset>
//                                                             <fieldset className="form-group">
//                                                                 <label>Enter Password</label>
//                                                                 <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
//                                                                 {activeTab === 'login' && formErrors.password.length > 0 && (
//                                                                     <span className="errorMessage">{formErrors.password}</span>
//                                                                 )}
//                                                             </fieldset>
//                                                             <fieldset className="form-group">
//                                                                 <button type="submit" className="btn btn-lg btn-secondary btn-block">Enter to your account</button>
//                                                             </fieldset>
//                                                             <div className="custom-control custom-checkbox">
//                                                                 <input type="checkbox" className="custom-control-input" id="customCheck1" />
//                                                                 <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//                                                                 <a onClick={() => this.handleTabChange("forgotpassword")} className="float-right" style={{ marginLeft: '10px' }}>Forgot Password?</a>
//                                                             </div>
//                                                         </div>
//                                                         <div className={`tab-pane ${activeTab === 'register' ? 'active' : ''}`} id="register" role="tabpanel">
//                                                             <Register />
//                                                         </div>
//                                                         <div className={`tab-pane ${activeTab === 'forgotpassword' ? 'active' : ''}`} id="forgotpassword" role="tabpanel">
//                                                             <ForgotPassword />
//                                                         </div>
//                                                     </div>
//                                                     <div className="clearfix" />
//                                                     <div className="text-center login-footer-tab">
//                                                         <ul className="nav nav-tabs" role="tablist">
//                                                             <li className="nav-item">
//                                                                 <a className={`nav-link ${activeTab === 'login' ? 'active' : ''}`} onClick={() => this.handleTabChange("login")} role="tab"><i className="mdi mdi-lock" /> LOGIN</a>
//                                                             </li>
//                                                             <li className="nav-item">
//                                                                 <a className={`nav-link ${activeTab === 'register' ? 'active' : ''}`} onClick={() => this.handleTabChange("register")} role="tab"><i className="mdi mdi-pencil" /> REGISTER</a>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                     <div className="clearfix" />
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }



import React, { Component } from 'react';
import { GetUserLogin } from '../../components/services';
import { NotificationManager } from "react-notifications";
import Register from '../register';
import ForgotPassword from '../password';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(
    /^[0-9]{10}$/ // Assuming a 10-digit phone number
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailOrPhone: null, // Changed to a single field
            password: null,
            formErrors: {
                emailOrPhone: "",
                password: ""
            },
            activeTab: "login" // Track the active tab
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "emailOrPhone":
                // Validate email or phone
                formErrors.emailOrPhone = emailRegex.test(value) || phoneRegex.test(value) 
                    ? "" 
                    : "Invalid email or phone number";
                break;
            case "password":
                formErrors.password = value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { emailOrPhone, password } = this.state;
        let data = { emailOrPhone: emailOrPhone, password: password }; // Pass emailOrPhone directly

        if (formValid(this.state) && this.state.activeTab === "login") {
            let user = await GetUserLogin.getUserLogin(data);
            if (user) {
                NotificationManager.success("Success", "Login");
                await GetUserLogin.authenticate(user.token, emailOrPhone);
            } else {
                NotificationManager.error("Please check your email or phone & password", "Input Error");
            }
        } else if (this.state.activeTab === "login") {
            NotificationManager.error("Please check your Login", "Input Error");
        }
    }

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab }); // Update active tab
    }

    render() {
        let { emailOrPhone, password, formErrors, activeTab } = this.state;
        return (
            <div>
                <div className="modal fade login-modal-main" id="bd-example-modal">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="login-modal">
                                    <div className="row">
                                        <div className="col-lg-6 pad-right-0">
                                            <div className="login-modal-left">
                                                {/* Your left side content */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6 pad-left-0">
                                            <button type="button" className="close close-top-right" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true"><i className="mdi mdi-close" /></span>
                                                <span className="sr-only">Close</span>
                                            </button>
                                            <form onSubmit={this.handleSubmit} noValidate>
                                                <div className="login-modal-right">
                                                    {/* Tab panes */}
                                                    <div className="tab-content">
                                                        <div className={`tab-pane ${activeTab === 'login' ? 'active' : ''}`} id="login" role="tabpanel">
                                                            <h5 className="heading-design-h5">Login to your account</h5>
                                                            <fieldset className="form-group">
                                                                <label>Enter Email/Phone number</label>
                                                                <input type="text" className="form-control" name="emailOrPhone" value={emailOrPhone} onChange={this.handleChange} />
                                                                {activeTab === 'login' && formErrors.emailOrPhone.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.emailOrPhone}</span>
                                                                )}
                                                            </fieldset>
                                                            <fieldset className="form-group">
                                                                <label>Enter Password</label>
                                                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                                                {activeTab === 'login' && formErrors.password.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.password}</span>
                                                                )}
                                                            </fieldset>
                                                            <fieldset className="form-group">
                                                                <button type="submit" className="btn btn-lg btn-secondary btn-block">Enter to your account</button>
                                                            </fieldset>
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                                <a onClick={() => this.handleTabChange("forgotpassword")} className="float-right" style={{ marginLeft: '10px' }}>Forgot Password?</a>
                                                            </div>
                                                        </div>
                                                        <div className={`tab-pane ${activeTab === 'register' ? 'active' : ''}`} id="register" role="tabpanel">
                                                            <Register />
                                                        </div>
                                                        <div className={`tab-pane ${activeTab === 'forgotpassword' ? 'active' : ''}`} id="forgotpassword" role="tabpanel">
                                                            <ForgotPassword />
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <div className="text-center login-footer-tab">
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <li className="nav-item">
                                                                <a className={`nav-link ${activeTab === 'login' ? 'active' : ''}`} onClick={() => this.handleTabChange("login")} role="tab"><i className="mdi mdi-lock" /> LOGIN</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className={`nav-link ${activeTab === 'register' ? 'active' : ''}`} onClick={() => this.handleTabChange("register")} role="tab"><i className="mdi mdi-pencil" /> REGISTER</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="clearfix" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
