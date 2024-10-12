// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { NotificationManager } from 'react-notifications';
// import { GetUserLogin, GetOrderDetails, CartHelper } from '../../../services';
// import { removeFromCart, incrementToCart, decreaseToCart } from "../../../../store/actions/cartActions";
// import Deliverydetails from './delivery';
// import Loader from '../../../../loader';

// class Checkout extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoaded: false,
//             subTotal: 0,
//             discount: 0,
//             deliveryCharge: 0,
//             grandTotal: 0,
//             email: '',
//             customer: '',
//             deliveryAddress: ''
//         };
//     }

//     handleRadioChange = e => {
//         this.setState({ [e.target.name]: e.target.value });
//     };

//     handleDeliveryAddress = (value) => {
//         this.setState({ deliveryAddress: value });
//     };

//     async componentDidMount() {
//         let email = sessionStorage.getItem('email');
//         if (email) {
//             let user = await GetUserLogin.getCustomerDetail(email);
//             if (user) {
//                 this.setState({ customer: user.data, email: email });
//             }
//         }

//         let cart = this.props.cartItems;
//         console.log("Cart Items:", cart);
//         let subTotal = this.calculateSubTotal(); // Use the same method to calculate subTotal
//         let discount = cart.reduce((sum, i) => (sum += i.discount), 0);
//         let deliveryCharge = subTotal * 0.05; // Calculate delivery charge as 5% of subTotal
//         let grandTotal = subTotal + discount + deliveryCharge;

//         this.setState({ subTotal, discount, deliveryCharge, grandTotal });
//     }

//   handlePaymentSystem = async (e) => {
//     e.preventDefault();
//     const { customer, deliveryAddress } = this.state;
//     const { cartItems } = this.props;
//     const orderId = Math.floor(Math.random() * Date.now());
//     this.setState({ isLoaded: true });

//     if (deliveryAddress) {
//         const subTotal = this.calculateSubTotal();
//         const deliveryCharge = subTotal * 0.00; // Calculate delivery charge
//         const grandTotal = subTotal + deliveryCharge; // Ensure grandTotal calculation matches the UI

//         // Log cartItems to ensure structure
//         console.log("Cart Items:", cartItems);

//         // Extract product IDs and variant IDs from cartItems
//         const productIds = cartItems.map(item => item.id);

//         // Extract variant IDs from cartItems
//         const variantIds = cartItems.reduce((ids, item) => {
//             if (item.selectedVariants) {
//                 item.selectedVariants.forEach(variant => {
//                     if (variant.id) {
//                         ids.push(variant.id);
//                     }
//                 });
//             }
//             return ids;
//         }, []);

//         // Remove duplicate variant IDs if any
//         const uniqueVariantIds = [...new Set(variantIds)];

//         // Log variantIds to ensure correct extraction
//         console.log("Variant IDs:", uniqueVariantIds);

//         const addressId = deliveryAddress.selectedAddress || null; // Use addressId if it exists

//         // Initialize Razorpay payment options
//         const options = {
//             key: 'rzp_live_MSxLfoA6zXX2W7', // Replace with your Razorpay key
//             amount: grandTotal * 100, // Amount in paise
//             currency: 'INR',
//             name: 'JC Creations',
//             description: 'Test Transaction',
//             image: 'img/footerlogo.webp',
//             handler: async (response) => {
//                 const data = {
//                     customerId: customer.id,
//                     orderId: orderId,
//                     addressId: addressId,
//                     productId: productIds,
//                     deliveryAddress: deliveryAddress,
//                     grandTotal: grandTotal,
//                     variantIds: uniqueVariantIds, // Send unique variant IDs
//                     razorpayPaymentId: response.razorpay_payment_id,
//                 };

//                 // Log data to console
//                 console.log("Data being sent to backend:", data);

//                 // Send order data to the backend API
//                 try {
//                     let order = await GetOrderDetails.getOrderCreateByUser(data);
//                     if (order) {
//                         NotificationManager.success("Successfully Ordered", "Order");
//                         setTimeout(() => {
//                             CartHelper.emptyCart();
//                         }, 1000);
//                     } else {
//                         window.location.href = "/order/failed";
//                     }
//                 } catch (err) {
//                     console.error("Error creating order:", err);
//                     NotificationManager.error("Order creation failed", "Error");
//                     this.setState({ isLoaded: false });
//                 }
//             },
//             prefill: {
//                 name: customer.firstName || "",
//                 email: this.state.email || '',
//                 phone_number: customer.phone || ''
//             },
//             notes: {
//                 address: "JC Creations"
//             },
//             theme: {
//                 color: "#CFB53B"
//             }
//         };

//         // Trigger Razorpay payment
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     } else {
//         NotificationManager.error("Please check address details", "Input Field");
//     }
// };

//     handleRemoveProduct = (productId) => {
//       this.props.removeFromCart(productId, null); // Pass null for variantIndex to indicate removal of the entire product
//   };

//     calculateSubTotal = () => {
//       return this.props.cartItems.reduce((sum, item) => {
//           if (Array.isArray(item.selectedVariants)) {
//               return sum + item.selectedVariants.reduce((variantSum, variant) => {
//                   return variantSum + (typeof variant.price === 'number' ? variant.price : 0);
//               }, 0);
//           }
//           return sum;
//       }, 0);
//   };
//     render() {
//         const { cartItems } = this.props;
//         const { discount, deliveryCharge, grandTotal, email, customer, isLoaded } = this.state;

//         const subTotal = this.calculateSubTotal();
//         const deliveryCharges = subTotal * 0.00;
//         const total = subTotal + deliveryCharges;

//         return (

//             <div>
//             <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <a href="/"><strong><span className="mdi mdi-home"></span> Home</strong></a> <span className="mdi mdi-chevron-right"></span> <a>Checkout</a>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section className="checkout-page section-padding">
//               <div className="container">
//                 {/* {isLoaded ? <Loader /> : ''} */}
//                 <div className="row">
//                   <div className="col-md-8">
//                     <div className="checkout-step">
//                       <div className="accordion" id="accordionExample">
//                         <div className="card checkout-step-one">
//                           <div className="card-header" id="headingOne">
//                             <h5 className="mb-0">
//                               <button className="btn btn-link checkout-login-bk" disabled>
//                                 <span className="number">1</span> Login <span className="mdi mdi-checkbox-marked-circle-outline"></span>
//                               </button>
//                               <div className="_2jDL7w">
//                                 <div><span className="dNZmcB">{customer.firstName}</span><span className="_3MeY5j">{email}</span></div>
//                               </div>
//                             </h5>
//                           </div>
//                         </div>
//                         <div className="card checkout-step-two">
//                           <div className="card-header" id="headingTwo">
//                             <h5 className="mb-0">
//                               <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//                                 <span className="number">2</span> Billing Address
//                               </button>
//                             </h5>
//                           </div>
//                           <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
//                             <Deliverydetails onSelectDeliveryAddress={this.handleDeliveryAddress} />
//                           </div>
//                         </div>
//                         <div className="card">
//                           <div className="card-header" id="headingThree">
//                             <h5 className="mb-0">
//                               <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                                 <span className="number">3</span> Payment
//                               </button>
//                             </h5>
//                           </div>
//                           <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
//                             <div className="checkout-step-body">
//                               <div className="payment_method-checkout">
//                                 <div className="row">
//                                   <div className="col-md-12">
//                                     {/* <div className="rpt100">
//                                       <ul className="radio--group-inline-container_1">
//                                         <li>
//                                           <div className="radio-item_1" onClick={this.handlePaymentSystem}>
//                                             <label htmlFor="card1" className="radio-label_1">Pay With Card</label>
//                                           </div>
//                                         </li>
//                                       </ul>
//                                     </div> */}
//                                     {/* {paymentmethod === "card" && */}
//                                       <button className="next-btn16 hover-btn" onClick={this.handlePaymentSystem}>Confirm Order</button>
//                                     {/* } */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <div className="card">
//                       <h5 className="card-header">My Cart <span className="text-secondary float-right">({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span></h5>
//                       {cartItems.map((row, index) => (
//                         <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
//                           <div className="cart-list-product">
//                             <img crossOrigin="anonymous" className="img-fluid" src={row.photo} alt="cart" />
//                             <h5>{row.name}</h5>
//                             <div className="cart-radio">
//                               {row.selectedVariants && row.selectedVariants.map((machine) => (
//                                 <div key={machine.id} className="d-flex align-items-center justify-content-between">
//                                   <span>{machine.name} (₹{machine.price})</span>

//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <div className="total-checkout-group">
//                         <div className="cart-total-dil">
//                           <h4>Sub Total</h4>
//                           <span>&#x20B9;{subTotal.toFixed(2)}</span>
//                         </div>
//                         <div className="cart-total-dil pt-3">
//                           <h4>CGST Charges</h4>
//                           <span>&#x20B9;{deliveryCharges.toFixed(2)}</span>
//                         </div>
//                       </div>
//                       <div className="main-total-cart">
//                         <h2>Total</h2>
//                         <span>&#x20B9;{total.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>

//         )
//     }
// }

// export default connect(
//     (state) => ({
//         cartItems: state.cart.cartItems,
//     }),
//     { incrementToCart, decreaseToCart, removeFromCart }
// )(Checkout);

import React, { Component } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { GetUserLogin, GetOrderDetails, CartHelper } from "../../../services";
import {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
} from "../../../../store/actions/cartActions";
import Deliverydetails from "./delivery";
import Loader from "../../../../loader";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      subTotal: 0,
      discount: 0,
      deliveryCharge: 0,
      grandTotal: 0,
      email: "",
      customer: "",
      deliveryAddress: "",
      // Track the current step (1: Login, 2: Delivery, 3: Payment)
      currentStep: 1,
    };
  }

  handleRadioChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDeliveryAddress = (value) => {
    this.setState({ deliveryAddress: value, currentStep: 3 }); // Move to payment step after selecting delivery address
  };

  async componentDidMount() {
    let email = sessionStorage.getItem("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ customer: user.data, email: email, currentStep: 2 }); // Open delivery section after login
      }
    }

    let cart = this.props.cartItems;
    console.log("Cart Items:", cart);
    let subTotal = this.calculateSubTotal();
    let discount = cart.reduce((sum, i) => (sum += i.discount), 0);
    let deliveryCharge = subTotal * 0.05;
    let grandTotal = subTotal + discount + deliveryCharge;

    this.setState({ subTotal, discount, deliveryCharge, grandTotal });
  }

  // handlePaymentSystem = async (e) => {
  //   e.preventDefault();
  //   const { customer, deliveryAddress } = this.state;
  //   const { cartItems } = this.props;
  //   const orderId = Math.floor(Math.random() * Date.now());
  //   this.setState({ isLoaded: true });

  //   if (deliveryAddress) {
  //     const subTotal = this.calculateSubTotal();
  //     const deliveryCharge = subTotal * 0.0; // Calculate delivery charge
  //     const grandTotal = subTotal + deliveryCharge; // Ensure grandTotal calculation matches the UI

  //     // Log cartItems to ensure structure
  //     console.log("Cart Items:", cartItems);

  //     const productIds = cartItems.map((item) => item.id);
  //     const variantIds = cartItems.reduce((ids, item) => {
  //       if (item.selectedVariants) {
  //         item.selectedVariants.forEach((variant) => {
  //           if (variant.id) {
  //             ids.push(variant.id);
  //           }
  //         });
  //       }
  //       return ids;
  //     }, []);

  //     const uniqueVariantIds = [...new Set(variantIds)];
  //     const addressId = deliveryAddress.selectedAddress || null;

  //     // Initialize Razorpay payment options
  //     const options = {
  //       key: "rzp_test_gU8SJmvgqlFgMg",
  //       amount: grandTotal * 100,
  //       currency: "INR",
  //       name: "JC Creations",
  //       description: "Test Transaction",
  //       image: "img/footerlogo.webp",
  //       handler: async (response) => {
  //         const data = {
  //           customerId: customer.id,
  //           orderId: orderId,
  //           addressId: addressId,
  //           productId: productIds,
  //           deliveryAddress: deliveryAddress,
  //           grandTotal: grandTotal,
  //           variantIds: uniqueVariantIds,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //         };

  //         console.log("Data being sent to backend:", data);

  //         try {
  //           let order = await GetOrderDetails.getOrderCreateByUser(data);
  //           if (order) {
  //             NotificationManager.success("Successfully Ordered", "Order");
  //             setTimeout(() => {
  //               CartHelper.emptyCart();
  //             }, 1000);
  //           } else {
  //             window.location.href = "/order/failed";
  //           }
  //         } catch (err) {
  //           console.error("Error creating order:", err);
  //           NotificationManager.error("Order creation failed", "Error");
  //           this.setState({ isLoaded: false });
  //         }
  //       },
  //       prefill: {
  //         name: customer.firstName || "",
  //         email: this.state.email || "",
  //         phone_number: customer.phone || "",
  //       },
  //       notes: {
  //         address: "JC Creations",
  //       },
  //       theme: {
  //         color: "#CFB53B",
  //       },
  //     };

  //     // Trigger Razorpay payment
  //     const paymentObject = new window.Razorpay(options);
  //     paymentObject.open();
  //   } else {
  //     NotificationManager.error("Please check address details", "Input Field");
  //   }
  // };

  handlePaymentSystem = async (e) => {
    e.preventDefault();
    const { customer, deliveryAddress } = this.state;
    const { cartItems } = this.props;
    const orderId = Math.floor(Math.random() * Date.now());
    this.setState({ isLoaded: true });
  
    if (deliveryAddress) {
      const subTotal = this.calculateSubTotal();
      const deliveryCharge = subTotal * 0.0; // Calculate delivery charge
      const grandTotal = subTotal + deliveryCharge; // Ensure grandTotal calculation matches the UI
  
      // Log cartItems to ensure structure
      console.log("Cart Items:", cartItems);
  
      // Create the products field
      const products = cartItems.map((item) => {
        const variantIds = item.selectedVariants.map(variant => variant.id); // Extract variant IDs for each product
        return {
          productId: item.id,       // Store the product ID
          variantIds: variantIds,   // Store the associated variant IDs
        };
      });
  
      const addressId = deliveryAddress.selectedAddress || null;
  
      // Initialize Razorpay payment options
      const options = {
        key: "rzp_test_gU8SJmvgqlFgMg",
        amount: grandTotal * 100,
        currency: "INR",
        name: "JC Creations",
        description: "Test Transaction",
        image: "img/footerlogo.webp",
        handler: async (response) => {
          const data = {
            customerId: customer.id,
            orderId: orderId,
            addressId: addressId,
            deliveryAddress: deliveryAddress, // Send the delivery address if addressId is null
            grandTotal: grandTotal,
            razorpayPaymentId: response.razorpay_payment_id,
            products: products, // Send products array with productId and variantIds
          };
  
          console.log("Data being sent to backend:", data);
  
          try {
            let order = await GetOrderDetails.getOrderCreateByUser(data);
            if (order) {
              NotificationManager.success("Successfully Ordered", "Order");
              setTimeout(() => {
                CartHelper.emptyCart();
              }, 1000);
            } else {
              window.location.href = "/order/failed";
            }
          } catch (err) {
            console.error("Error creating order:", err);
            NotificationManager.error("Order creation failed", "Error");
            this.setState({ isLoaded: false });
          }
        },
        prefill: {
          name: customer.firstName || "",
          email: this.state.email || "",
          phone_number: customer.phone || "",
        },
        notes: {
          address: "JC Creations",
        },
        theme: {
          color: "#CFB53B",
        },
      };
  
      // Trigger Razorpay payment
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      NotificationManager.error("Please check address details", "Input Field");
    }
  };
  

  handleRemoveProduct = (productId) => {
    this.props.removeFromCart(productId, null); // Pass null for variantIndex to indicate removal of the entire product
  };

  calculateSubTotal = () => {
    return this.props.cartItems.reduce((sum, item) => {
      if (Array.isArray(item.selectedVariants)) {
        return (
          sum +
          item.selectedVariants.reduce((variantSum, variant) => {
            return (
              variantSum +
              (typeof variant.price === "number" ? variant.price : 0)
            );
          }, 0)
        );
      }
      return sum;
    }, 0);
  };

  render() {
    const { cartItems } = this.props;
    const {
      discount,
      deliveryCharge,
      grandTotal,
      email,
      customer,
      isLoaded,
      currentStep,
    } = this.state;

    const subTotal = this.calculateSubTotal();
    const deliveryCharges = subTotal * 0.0;
    const total = subTotal + deliveryCharges;

    return (
      <div>
        <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a href="/">
                  <strong>
                    <span className="mdi mdi-home"></span> Home
                  </strong>
                </a>{" "}
                <span className="mdi mdi-chevron-right"></span> <a>Checkout</a>
              </div>
            </div>
          </div>
        </section>

        <section className="checkout-page section-padding">
          <div className="container">
            {/* {isLoaded ? <Loader /> : ''} */}
            <div className="row">
              <div className="col-md-8">
                <div className="checkout-step">
                  <div className="accordion" id="accordionExample">
                    {/* Step 1: Login */}
                    <div className="card checkout-step-one">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link checkout-login-bk"
                            disabled
                          >
                            <span className="number">1</span> Login{" "}
                            <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                          </button>
                          <div className="_2jDL7w">
                            <div>
                              <span className="dNZmcB">
                                {customer.firstName}
                              </span>
                              <span className="_3MeY5j">{email}</span>
                            </div>
                          </div>
                        </h5>
                      </div>
                    </div>

                    {/* Step 2: Delivery Address */}
                    {currentStep >= 2 && (
                      <div className="card checkout-step-two">
                        <div className="card-header" id="headingTwo">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <span className="number">2</span> Billing Address
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse show"
                          aria-labelledby="headingTwo"
                          data-parent="#accordionExample"
                        >
                          <Deliverydetails
                            onSelectDeliveryAddress={this.handleDeliveryAddress}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep >= 3 && (
                      <div className="card">
                        <div className="card-header" id="headingThree">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link collapsed"
                              type="button"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              <span className="number">3</span> Payment
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse show"
                          aria-labelledby="headingThree"
                          data-parent="#accordionExample"
                        >
                          {/* <div className="checkout-step-body">
                            <div className="payment_method-checkout">
                              <div className="row">
                                <div className="col-md-12">
                                  <h6 className="card-title">Total Amount:</h6>
                                  <h5 className="mb-3">
                                    <strong>₹{grandTotal}</strong>
                                  </h5>
                                </div>
                              </div>
                              <button
                                onClick={this.handlePaymentSystem}
                                className="btn btn-danger btn-block"
                              >
                                Pay Now
                              </button>
                            </div>
                          </div> */}

                          <div className="checkout-step-body">
                         
                            <div className="payment_method-checkout">
                              
                              <div className="row">
                              
                                <div className="col-md-12">
                           
                                  <button
                                    className="next-btn16 hover-btn"
                                    onClick={this.handlePaymentSystem}
                                  >
                                    Confirm Order
                                  </button>
                                 
                                </div>
                              
                              </div>
                              
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="checkout-summary">
                  <h3>Cart Summary</h3>
                  {cartItems.map((row, index) => (
                    <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                      <div className="cart-list-product">
                        <img
                          crossOrigin="anonymous"
                          className="img-fluid"
                          src={row.photo}
                          alt="cart"
                        />
                        <h5>{row.name}</h5>
                        <div className="cart-radio">
                          {row.selectedVariants &&
                            row.selectedVariants.map((machine) => (
                              <div
                                key={machine.id}
                                className="d-flex align-items-center justify-content-between"
                              >
                                <span>
                                  {machine.name} (₹{machine.price})
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="total-checkout-group">
                    <div className="cart-total-dil">
                      <h4>Sub Total</h4>
                      <span>&#x20B9;{subTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="main-total-cart">
                    <h2>Total</h2>
                    <span>&#x20B9;{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, {
  removeFromCart,
  incrementToCart,
  decreaseToCart,
})(Checkout);
