import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//import './termsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-conditions-container">
            <h1 className="terms-conditions-header">Terms & Conditions</h1>
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
    );
};

export default TermsAndConditions;
