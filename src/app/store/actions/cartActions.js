import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "./types";




// export const addToCart = (product, selectedVariants) => (dispatch, getState) => {
//   const cartItems = getState().cart.cartItems.slice();
//   let alreadyExists = false;

//   cartItems.forEach((x) => {
//     if (x.id === product.id) {
//       alreadyExists = true;
//       x.selectedVariants = selectedVariants; // Update selected variants
//     }
//   });

//   if (!alreadyExists) {
//     cartItems.push({ ...product, selectedVariants });
//   }

//   dispatch({
//     type: ADD_TO_CART,
//     payload: { cartItems },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };


// export const removeFromCart = (product) => (dispatch, getState) => {
//   const cartItems = getState().cart.cartItems.slice().filter((x) => x.id !== product.id);
//   dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };

// Actions/cartActions.js
export const addToCart = (product, selectedVariants) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;

  cartItems.forEach((x) => {
    if (x.id === product.id) {
      alreadyExists = true;
      x.selectedVariants = selectedVariants.map(variant => ({
        id: variant.id, 
        name: variant.variantName, 
        price: variant.variantPrice 
      }));
    }
  });

  if (!alreadyExists) {
    cartItems.push({ 
      ...product, 
      selectedVariants: selectedVariants.map(variant => ({
        id: variant.id, 
        name: variant.variantName, 
        price: variant.variantPrice 
      })) 
    });
  }

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};



export const removeFromCart = (productId, variantId = null) => (dispatch, getState) => {
  const { cartItems } = getState().cart;

  const updatedCartItems = cartItems.map((item) => {
    if (item.id === productId) {
      if (variantId !== null) {
        // Remove specific variant
        const updatedVariants = item.selectedVariants.filter(variant => variant.id !== variantId);

        // If no variants remain, remove the product completely
        if (updatedVariants.length === 0) {
          return null;
        }

        return { ...item, selectedVariants: updatedVariants };
      }

      // If variantId is null, remove the entire product
      return null;
    }
    return item;
  }).filter(item => item !== null); // Filter out removed items

  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems: updatedCartItems } });
  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
};



export const incrementToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.id)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index]
  value.qty = value.qty + 1;
  value.total = value.qty * value.netPrice;

  dispatch({
    type: INCREASE_QUANTITY,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const decreaseToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  const selectProduct = cartItems.find(item => item.id === product.id)
  const index = cartItems.indexOf(selectProduct)
  const value = cartItems[index]
  if (value.qty > 1) {
    value.qty = value.qty - 1;
    value.total = value.qty * value.netPrice;
  }
  dispatch({ type: DECREASE_QUANTITY, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

