import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

// Create a new address
const createAddress = async (data) => {
    try {
        let result = await api.post(Apis.CreateAddress, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(error);
        NotificationManager.error('An error occurred while creating the address.');
        return null;
    }
};

// Get all addresses for a customer by customer ID
const getAddressesByCustomerId = async (custId) => {
    try {
        let result = await api.get(`${Apis.GetAddressesByCustomerId}?custId=${custId}`);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(error);
        NotificationManager.error('An error occurred while fetching addresses.');
        return null;
    }
};

// Update an address by address ID
const updateAddress = async (addressId, data) => {
    try {
        let result = await api.put(`${Apis.UpdateAddress}/${addressId}`, data);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(error);
        NotificationManager.error('An error occurred while updating the address.');
        return null;
    }
};

// Delete an address by address ID
const deleteAddress = async (addressId) => {
    try {
        let result = await api.delete(`${Apis.DeleteAddress}/${addressId}`);
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        return result.data;
    } catch (error) {
        console.error(error);
        NotificationManager.error('An error occurred while deleting the address.');
        return null;
    }
};

export default {
    createAddress,
    getAddressesByCustomerId,
    updateAddress,
    deleteAddress
};
