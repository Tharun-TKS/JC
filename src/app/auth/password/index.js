import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import { GetUserLogin } from '../../components/services';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verificationCode: '',
            password: '',
            step: 1, // Track the current step
        };
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, verificationCode, password, step } = this.state;

        if (step === 1) {
            // Step 1: Send OTP
            try {
                const response = await GetUserLogin.sendResetPasswordEmail(email);
                if (response) {
                    NotificationManager.success("OTP sent to your email", "Success");
                    this.setState({ step: 2 });
                } else {
                    NotificationManager.error("Error sending OTP", "Error");
                }
            } catch (error) {
                NotificationManager.error("Error sending OTP", "Error");
            }
        } else if (step === 2) {
            // Step 2: Verify OTP
            try {
                const response = await GetUserLogin.verifyOtp(email, verificationCode);
                if (response) {
                    NotificationManager.success("OTP verified", "Success");
                    this.setState({ step: 3 });
                } else {
                    NotificationManager.error("Invalid OTP", "Error");
                }
            } catch (error) {
                NotificationManager.error("Error verifying OTP", "Error");
            }
        } else if (step === 3) {
            // Step 3: Reset password
            try {
                const response = await GetUserLogin.resetPassword(email, verificationCode, password);
                if (response) {
                    NotificationManager.success("Password reset successfully", "Success");
                } else {
                    NotificationManager.error("Error resetting password", "Error");
                }
            } catch (error) {
                NotificationManager.error("Error resetting password", "Error");
            }
        }
    }

    render() {
        const { email, verificationCode, password, step } = this.state;
        return (
            <div className="forgot-password-container">
                <h2>Forgot Password</h2>
                <form onSubmit={this.handleSubmit} noValidate>
                    {step === 1 && (
                        <fieldset className="form-group">
                            <label>Enter Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                required
                            />
                            <button type="submit" className="btn btn-lg btn-secondary btn-block">Send OTP</button>
                        </fieldset>
                    )}
                    {step === 2 && (
                        <fieldset className="form-group">
                            <label>Enter OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                name="verificationCode"
                                value={verificationCode}
                                onChange={this.handleChange}
                                required
                            />
                            <button type="submit" className="btn btn-lg btn-secondary btn-block">Verify OTP</button>
                        </fieldset>
                    )}
                    {step === 3 && (
                        <fieldset className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                required
                            />
                            <button type="submit" className="btn btn-lg btn-secondary btn-block">Reset Password</button>
                        </fieldset>
                    )}
                </form>
            </div>
        );
    }
}

export default ForgotPassword;
