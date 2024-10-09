import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import Cookies from 'js-cookie';
import { NotificationManager } from 'react-notifications';

const getUserLogin = async (data) => {
    try {
        let result = await api.post(Apis.GetUserLogin, data, {
         
            headers: {
               'Content-Type': 'application/json'
            }
        });
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserRegister = async (data) => {
    try {
        let result = await api.post(Apis.GetUserRegsiter, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticate = async (data, email) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('_sid', data)
        sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.reload();
            },
            1000
        );
    }
};

const getCustomerDetail = async (email) => {
    try {
        let result = await api.get(Apis.GetCustomerDetails + email);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCustomerUpdate = async (data) => {
    try {
        let result = await api.post(Apis.GetCustomerUpdateDetails,{data});
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const authenticateByCart = async (token, email) => {
    if (typeof window !== "undefined") {
       sessionStorage.setItem('_sid', token)
       sessionStorage.setItem('email', email)
        setTimeout(
            function () {
                window.location.href = "/checkout";
            },
            1000
        );
    } else {
        NotificationManager.error("Please check your login", "Input Error");
    }
};

const logout = (next) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('_sid');
        sessionStorage.removeItem('email');
        window.location.href = "/";
        // next();
    }
};

const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    return sessionStorage.getItem('_sid');
};

const sendResetPasswordEmail = async (email) => {
    try {
        let result = await api.post(Apis.Resetrequestsend, { email });
        if (result.data.errors) {
            NotificationManager.error(result.data.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Verify OTP for password reset
const verifyOtp = async (email, otp) => {
    try {
        let result = await api.post(Apis.Otpverify, { email, otp });
        if (result.data.errors) {
            NotificationManager.error(result.data.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const resetPassword = async (email, verificationCode, newPassword) => {
    try {
        let result = await api.post(Apis.Resetpassword, { email, verificationCode, password: newPassword });
        if (result.data.errors) {
            NotificationManager.error(result.data.errors);
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default {
    getUserLogin,
    authenticate,
    isAuthenticate,
    authenticateByCart,
    getUserRegister,
    getCustomerDetail,
    getCustomerUpdate,
    logout,
    sendResetPasswordEmail,
    verifyOtp,
    resetPassword,
};