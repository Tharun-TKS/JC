const API_URL =
  document.domain === "localhost"
    ? "https://jc-creations.co.in/backend"
    : "https://jc-creations.co.in/backend";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/customer/login`,
  GetUserRegsiter: `${API_URL}/api/customer/register`,
  GetCustomerDetails: `${API_URL}/api/customer/getUserByEmailId?email=`,

  //product api
  GetProductById: `${API_URL}/api/product/getWebProductById?id=`,
  GetAllGroceryStaple: `${API_URL}/api/product/getAllGroceryStaple`,
  GetAllProductList: `${API_URL}/api/product/list/`,
  GetProductByCategory: `${API_URL}/api/product/getProductByCategory`,
  GetProductByTagSearch: `${API_URL}/api/product/products`,
  GetProductSearchList: `${API_URL}/api/product/searchproducts`,
  GetNewProductArrivals: `${API_URL}/api/product/getNewArrivals`,
  //product api
  GetOrderCreateByUser: `${API_URL}/api/order/create`,
  GetOrderByUser: `${API_URL}/api/order/list`,
  GetOrderDownload: `${API_URL}/api/order/download`,
  //Filter by category
  GetAllCategoryList: `${API_URL}/api/category/cn/list?slug=`,
  GetFilterByCategory: `${API_URL}/api/category/c`,
  GetAllCategorySubCategoryList: `${API_URL}/api/category/getAllCategory`,

  //profile
  GetCustomerUpdateDetails: `${API_URL}/api/customer/update`,

  //Get location
  GetLocationListDetails: `${API_URL}/api/location/list`,
  GetAreaListDetails: `${API_URL}/api/location/area/list/getbyid?id=`,

  //Get filter by product
  GetProductByFilter: `${API_URL}/api/product/gcatalogsearch/result?search=`,
  GetCategoryListByFilter: `${API_URL}/api/category/catlogsearch/child-category`,
  GetProductBySubcategory: `${API_URL}/api/category/catlogsearch/product`,
 
  //Razarpayment
  GetPaymentValue: `${API_URL}/api/payment/orders`,
  GetPaymentVerification: `${API_URL}/api/payment/verification`,
  GetPaymentOrderList: `${API_URL}/api/payment/orderlist`,

  // Wishlist API
  AddWishlistItem: `${API_URL}/api/wishlist/add`, // Add a new item to the wishlist
  RemoveWishlistItem: `${API_URL}/api/wishlist/remove`, // Remove an item from the wishlist
  GetWishlistItems: `${API_URL}/api/wishlist/find`, // Get all wishlist items for a user
  GetWishlistItemById: `${API_URL}/api/wishlist/item/`, // Get a specific wishlist item by its ID
  UpdateWishlistItem: `${API_URL}/api/wishlist/update`, // Update details of a specific wishlist item

  // Address API
  CreateAddress: `${API_URL}/api/address/create`, // Create a new address
  GetAddressesByCustomerId: `${API_URL}/api/address/list`, // Get addresses for a specific customer
  UpdateAddress: `${API_URL}/api/address/update`, // Update an address
  DeleteAddress: `${API_URL}/api/address/delete`, // Delete an address

  // password reset api

  Resetrequestsend: `${API_URL}/api/customer/sendReset`,
  Otpverify: `${API_URL}/api/customer/verifyOtp`,
  Resetpassword: `${API_URL}/api/customer/resetPassword`,
};
export { API_URL, Apis };
