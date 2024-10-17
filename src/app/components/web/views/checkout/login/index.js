import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from "react-notifications";

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
        if (formValid(this.state)) {
            let user = await GetUserLogin.getUserLogin(data);
            if (user) {
                NotificationManager.success("Success", "Login");
                await GetUserLogin.authenticate(user.token, emailOrPhone);
                this.props.history.push('/checkout');
            } else {
                NotificationManager.error("Please check your email or phone & password", "Input Error");
            }
        } else {
            NotificationManager.error("Please check your Login", "Input Error");
        }

    }
    render() {
        let { emailOrPhone, password, formErrors, } = this.state;
        return (
            <div className="card checkout-step-one">
                <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <span className="number">1</span> Login or SignUp
                        </button>
                    </h5>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="login-modal login-page-bk">
                                    <div className="row">
                                        <div className="col-lg-6 pad-right-0">
                                            <div className="login-modal-left">
                                            </div>
                                        </div>
                                        <div className="col-lg-6 pad-left-0">
                                            <form onSubmit={this.handleSubmit} noValidate>
                                                <div className="login-modal-right">
                                                    {/* Tab panes */}
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="login" role="tabpanel">
                                                            <h5 className="heading-design-h5">Login to your account</h5>
                                                            <label style={{color:"red", fontWeight:"bold"}}>Please be noted that your phone number is your password</label>
                                                            <fieldset className="form-group">
                                                                <label>Enter Email/Mobile number</label>
                                                                <input type="text" className="form-control" name="emailOrPhone" value={emailOrPhone} onChange={this.handleChange} />
                                                                {formErrors.emailOrPhone.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.emailOrPhone}</span>
                                                                )}
                                                            </fieldset>
                                                            <fieldset className="form-group">
                                                                <label>Enter Password</label>
                                                                <input className="form-control" name="password" type="password" value={password} onChange={this.handleChange} />
                                                                {formErrors.password.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.password}</span>
                                                                )}
                                                            </fieldset>
                                                            <fieldset className="form-group">
                                                                <button type="submit" className="btn btn-lg btn-secondary btn-block" onClick={this.handleSubmit}>Login</button>
                                                            </fieldset>
                                                            {/* <div className="login-with-sites text-center">
                                                                <p>or Login with your social profile:</p>
                                                                <button className="btn-facebook login-icons btn-lg"><i className="mdi mdi-facebook" /> Facebook</button>
                                                                <button className="btn-google login-icons btn-lg"><i className="mdi mdi-google" /> Google</button>
                                                            </div> */}
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <div className="text-center login-footer-tab">
                                                        <ul className="nav nav-tabs" role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active" data-toggle="tab" href="#login" role="tab"><i className="mdi mdi-lock" /> LOGIN</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" href="/register"><i className="mdi mdi-pencil" /> REGISTER</a>
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
