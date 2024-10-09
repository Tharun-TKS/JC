import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const addWishlistItem = async (data) => {
    try {
        let result = await api.post(Apis.AddWishlistItem, data);
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

const removeWishlistItem = async (data) => {
    try {
        let result = await api.post(Apis.RemoveWishlistItem, data);
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

const getWishlistItems = async (userId) => {
    try {
        let result = await api.get(`${Apis.GetWishlistItems}?custId=${userId}`);
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

const getWishlistItemById = async (id) => {
    try {
        let result = await api.get(Apis.GetWishlistItemById + id);
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

const updateWishlistItem = async (id, data) => {
    try {
        let result = await api.put(Apis.UpdateWishlistItem + id, data);
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
    addWishlistItem,
    removeWishlistItem,
    getWishlistItems,
    getWishlistItemById,
    updateWishlistItem
};
