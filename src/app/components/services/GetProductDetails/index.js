import api from '../../../../app/ApiConfig';
import { Apis } from '../../../../config';
import { NotificationManager } from 'react-notifications';

const getProductById = async (id) => {
    try {
        let result = await api.get(Apis.GetProductById+id);
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

const getAllProductList = async (slug) => {
    try {
        let result = await api.get(Apis.GetAllProductList+slug);
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

const getProductByFilter = async (txt) => {
    try {
        let result = await api.get(Apis.GetProductByFilter+txt);
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

const getCategoryListByFilter = async (data) => {
    try {
        let result = await api.post(Apis.GetCategoryListByFilter,data);
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

const getProductByCategory = async (categoryId) => {
    try {
      // Make sure to include categoryId in the URL as a query parameter
      let result = await api.get(`${Apis.GetProductByCategory}?categoryId=${categoryId}`);
  
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
  
  
  
  
const getProductBySubcategory = async (data) => {
    try {
        let result = await api.post(Apis.GetProductBySubcategory,data);
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



const getProductByTagSearch= async (tag) => {
    try {
      // Make sure to include tag in the URL as a query parameter
      let result = await api.get(`${Apis.GetProductByTagSearch}?tag=${tag}`);
  
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

  const getAllProductSearchList = async () => {
    try {
        let result = await api.get(Apis.GetProductSearchList);
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


const getNewArrivals= async (limit) => {
    try {
      // Make sure to include limit in the URL as a query parameter
      let result = await api.get(`${Apis.GetNewProductArrivals}?limit=${limit}`);
  
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
    getProductById,
    getAllProductList,
    getProductByFilter,
    getCategoryListByFilter,
    getProductByCategory,
    getProductBySubcategory,
    getProductByTagSearch,
    getAllProductSearchList,
    getNewArrivals
};