import React, { Component } from 'react';
import { GetUserLogin } from '../../components/services';
import { NotificationManager } from "react-notifications";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const phoneRegex = RegExp(
    /^[0-9\b]+$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            phone: null, // added phone state
            formErrors: {
                fullName: "",
                email: "",
                password: "",
                phone: "" // added phone error
            }
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "fullName":
                formErrors.fullName =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum 6 characters required" : "";
                break;
            case "phone":
                formErrors.phone =
                    phoneRegex.test(value) && value.length === 10
                        ? ""
                        : "Invalid phone number (10 digits required)";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        let { fullName, email, password, phone } = this.state;
        let data = { fullName, email, password, phone };

        if (formValid(this.state)) {
            let list = await GetUserLogin.getUserRegister(data);
            if (list) {
                NotificationManager.success("Successfully Added New User");
                // window.location.href="/";
            }
        } else {
            NotificationManager.error("Please check your Register form", "Input Error");
        }
    }

    render() {
        let { fullName, email, password, phone, formErrors } = this.state;

        return (
            <div>
                <h5 className="heading-design-h5">Register Now!</h5>
                <fieldset className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={fullName}
                        onChange={this.handleChange}
                    />
                    {formErrors.fullName.length > 0 && (
                        <span className="errorMessage">{formErrors.fullName}</span>
                    )}
                </fieldset>

                <fieldset className="form-group">
                    <label>Enter Email/Mobile number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    {formErrors.email.length > 0 && (
                        <span className="errorMessage">{formErrors.email}</span>
                    )}
                </fieldset>

                <fieldset className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={this.handleChange}
                    />
                    {formErrors.phone.length > 0 && (
                        <span className="errorMessage">{formErrors.phone}</span>
                    )}
                </fieldset>

                <fieldset className="form-group">
                    <label>Enter Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    {formErrors.password.length > 0 && (
                        <span className="errorMessage">{formErrors.password}</span>
                    )}
                </fieldset>

                <fieldset className="form-group">
                    <button
                        type="submit"
                        className="btn btn-lg btn-secondary btn-block"
                        onClick={this.handleSubmit}
                    >
                        Create Your Account
                    </button>
                </fieldset>

                {/* <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck2"
                    />
                    <label className="custom-control-label" htmlFor="customCheck2">
                        I Agree with <a href="#">Term and Conditions</a>
                    </label>
                </div> */}
            </div>
        );
    }
}
