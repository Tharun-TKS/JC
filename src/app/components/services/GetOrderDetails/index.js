import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getOrderCreateByUser = async (data) => {
    try {
        let result = await api.post(Apis.GetOrderCreateByUser,data);
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

const createPreorder = async (data) => {
    try {
        let result = await api.post(Apis.GetPreOrderCreate,data);
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

const getOrderByUser = async (id) => {
    try {
        let result = await api.get(`${Apis.GetOrderByUser}?id=${id}`);
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

const getPaymentValue = async (data) => {
    try {
        let result = await api.post(Apis.GetPaymentValue,data);
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

const getPaymentVerification = async () => {
    try {
        let result = await api.post(Apis.GetPaymentVerification);
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

const getPaymentOrderList = async (data) => {
    try {
        let result = await api.post(Apis.GetPaymentOrderList,data);
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


const getOrderDownload = async (filename) => {
    try {
        let result = await api.get(`${Apis.GetOrderDownload}?filename=${filename}`, {
            responseType: 'blob' // Ensure the response is a binary blob
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

export default {
    getOrderCreateByUser,
    getOrderByUser,
    getPaymentVerification,
    getPaymentValue,
    getPaymentOrderList,
    getOrderDownload,
    createPreorder,
};