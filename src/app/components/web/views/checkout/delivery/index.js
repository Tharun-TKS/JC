// import React, { Component } from "react";
// import { GetAddressDetails, GetUserLogin } from "../../../../services";
// import './delivery.css'

// export default class Deliverydetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//       locationList: [],
//       name: "",
//       phone: "",
//       district: "",
//       city: "",
//       area: "",
//       states: "",
//       address: "",
//       showNewAddressForm: false,
//       selectedAddress: "", // Add state for selected address
//     };
//   }

//   async componentDidMount() {
//     let email = sessionStorage.getItem("email");
//     if (email) {
//       let value = await GetUserLogin.getCustomerDetail(email);
//       if (value) {
//         this.setState({ user: value.data });
//         this.fetchAddresses(value.data.id);
//       }
//     }
//   }

//   fetchAddresses = async (customerId) => {
//     let response = await GetAddressDetails.getAddressesByCustomerId(customerId);
//     if (response && response.success) {
//       this.setState({ locationList: response.data });
//       // If no addresses found, show the new address form
//       if (response.data.length === 0) {
//         this.setState({ showNewAddressForm: true });
//       }
//     }
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleAddressSelect = (addressId) => {
//     this.setState({ selectedAddress: addressId, showNewAddressForm: false }); // Close form and set selected address
//     console.log("Selected Address ID:", addressId); // Log the selected ID
//   };

//   toggleNewAddressForm = () => {
//     this.setState((prevState) => ({
//       showNewAddressForm: !prevState.showNewAddressForm,
//       selectedAddress: "", // Reset selected address when toggling to new address form
//       name: "", // Reset name field
//       phone: "", // Reset phone field
//       states: "", // Reset states field
//       district: "", // Reset district field
//       city: "", // Reset city field
//       area: "", // Reset area field
//       address: "", // Reset address field
//     }));
//   };
//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { name, phone, district, city, area, states, address, selectedAddress, showNewAddressForm } = this.state;

//     // Check if an address is selected or the new address form is being used
//     if (!selectedAddress && !showNewAddressForm) {
//       alert("Please select or add a new address.");
//       return;
//     }

//     // Create the delivery object
//     let delivery = {
//       name,
//       phone,
//       district,
//       city,
//       area,
//       states,
//       address,
//     };

//     // If a new address is being added, include the form data in the submission
//     if (showNewAddressForm) {
//       // Clear selectedAddress when sending new address data
//       this.setState({ selectedAddress: null });

//       delivery = {
//         ...delivery,
//         addressId: null, // Use null or appropriate key to indicate new address is being added
//       };
//     } else {
//       // Include selectedAddress ID when not adding a new address
//       delivery.selectedAddress = selectedAddress;
//     }

//     // Pass the delivery object to the parent component
//     this.props.onSelectDeliveryAddress(delivery);
//   };

//   render() {
//     const { name, phone, district, city, area, states, address, locationList, showNewAddressForm, selectedAddress } =
//       this.state;

//     return (
//       <div className="card-body">
//         {locationList.length > 0 ? (
//           <>
//             <div className="address-list">
//               {locationList.map((address, index) => (
//                 <div className="address-item" key={index} onClick={() => this.handleAddressSelect(address.id)}>
//                   <div
//                     className={`delivery-custom-checkbox ${selectedAddress === address.id ? "checked" : ""}`}
//                     onClick={() => this.handleAddressSelect(address.id)}
//                   ></div>
//                   <label>
//                     {address.fullname}<br />
//                     +91 {address.phone}<br />
//                     {address.shipping ? `${address.shipping}, ` : ""}
//                     {address.area ? `${address.area}, ` : ""}
//                     {address.city ? `${address.city}, ` : ""}
//                     {address.district ? `${address.district}, ` : ""}
//                     {address.states ? `${address.states}` : ""}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <button
//               type="button"
//               className="btn btn-secondary mb-2 btn-lg"
//               onClick={this.toggleNewAddressForm}
//             >
//               Add New Address
//             </button>
//           </>
//         ) : (
//           // Show the new address form when no addresses are found
//           showNewAddressForm && (
//             <form>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Full Name <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="name"
//                       value={name}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Phone <span className="required">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control border-form-control"
//                       name="phone"
//                       value={phone}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       State <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="states"
//                       value={states}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       District <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="district"
//                       value={district}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       City <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="city"
//                       value={city}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Area <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="area"
//                       value={area}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-12">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Shipping Address <span className="required">*</span>
//                     </label>
//                     <textarea
//                       className="form-control border-form-control"
//                       name="address"
//                       value={address}
//                       onChange={this.handleChange}
//                     />
//                     <small className="text-danger">
//                       Please provide the number and street.
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           )
//         )}

//         <button
//           type="button"
//           data-toggle="collapse"
//           data-target="#collapseThree"
//           aria-expanded="false"
//           aria-controls="collapseThree"
//           className="btn btn-secondary mb-2 btn-lg"
//           onClick={this.handleSubmit}
//         >
//           NEXT
//         </button>
//       </div>
//     );
//   }
// }


// import React, { Component } from "react";
// import { GetAddressDetails, GetUserLogin } from "../../../../services";
// import { NotificationManager } from 'react-notifications';
// import "./delivery.css";

// export default class Deliverydetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//       locationList: [],
//       name: "",
//       phone: "",
//       district: "",
//       city: "",
//       area: "",
//       states: "",
//       address: "",
//       showNewAddressForm: false,
//       selectedAddress: "", // Add state for selected address
//     };
//   }

//   async componentDidMount() {
//     let email = sessionStorage.getItem("email");
//     if (email) {
//       let value = await GetUserLogin.getCustomerDetail(email);
//       if (value) {
//         this.setState({ user: value.data });
//         this.fetchAddresses(value.data.id);
//       }
//     }
//   }

//   fetchAddresses = async (customerId) => {
//     let response = await GetAddressDetails.getAddressesByCustomerId(customerId);
//     if (response && response.success) {
//       this.setState({ locationList: response.data });
//       // If addresses are found, automatically select the first one
//       if (response.data.length > 0) {
//         this.setState({ selectedAddress: response.data[0].id }); // Automatically select the first address
//         this.props.onSelectDeliveryAddress({
//           selectedAddress: response.data[0].id, // Pass the selected address to the parent
//         });
//       } else {
//         this.setState({ showNewAddressForm: true }); // Show new address form if no addresses found
//       }
//     }
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleAddressSelect = (addressId) => {
//     this.setState({ selectedAddress: addressId, showNewAddressForm: false });
//     this.props.onSelectDeliveryAddress({ selectedAddress: addressId }); // Pass selected address to parent
//   };

//   toggleNewAddressForm = () => {
//     this.setState((prevState) => ({
//       showNewAddressForm: !prevState.showNewAddressForm,
//       selectedAddress: "", // Reset selected address when toggling to new address form
//       name: "", // Reset name field
//       phone: "", // Reset phone field
//       states: "", // Reset states field
//       district: "", // Reset district field
//       city: "", // Reset city field
//       area: "", // Reset area field
//       address: "", // Reset address field
//     }));
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const {
//       name,
//       phone,
//       district,
//       city,
//       area,
//       states,
//       address,
//       selectedAddress,
//       showNewAddressForm,
//     } = this.state;

//     // Check if an address is selected or the new address form is being used
//     if (!selectedAddress && !showNewAddressForm) {
//       alert("Please select or add a new address.");
//       return;
//     }

//     // Create the delivery object
//     let delivery = {
//       name,
//       phone,
//       district,
//       city,
//       area,
//       states,
//       address,
//     };

//     // If a new address is being added, include the form data in the submission
//      // Check if any required fields are empty
//   if (showNewAddressForm) {
//     if (!name || !phone || !district || !city || !area || !states || !address) {
//       NotificationManager.error("All fields are mandatory. Please fill out every field.");
    
//       return;
//     }
//   } else if (!selectedAddress) {
//     alert("Please select or add a new address.");
//     return;
//   }

//     // Pass the delivery object to the parent component
//     this.props.onSelectDeliveryAddress(delivery);
//   };

//   render() {
//     const {
//       name,
//       phone,
//       district,
//       city,
//       area,
//       states,
//       address,
//       locationList,
//       showNewAddressForm,
//       selectedAddress,
//     } = this.state;

//     return (
//       <div className="card-body">
//         {locationList.length > 0 ? (
//           <>
//             <div className="address-list">
//               {locationList.map((addressItem, index) => (
//                 <div
//                   className="address-item"
//                   key={index}
//                   onClick={() => this.handleAddressSelect(addressItem.id)}
//                 >
//                   <div
//                     className={`delivery-custom-checkbox ${
//                       selectedAddress === addressItem.id ? "checked" : ""
//                     }`}
//                     onClick={() => this.handleAddressSelect(addressItem.id)}
//                   ></div>
//                   <label>
//                     {addressItem.fullname}
//                     <br />
//                     +91 {addressItem.phone}
//                     <br />
//                     {addressItem.shipping ? `${addressItem.shipping}, ` : ""}
//                     {addressItem.area ? `${addressItem.area}, ` : ""}
//                     {addressItem.city ? `${addressItem.city}, ` : ""}
//                     {addressItem.district ? `${addressItem.district}, ` : ""}
//                     {addressItem.states ? `${addressItem.states}` : ""}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             {/* Remove the button if addresses are found */}
//           </>
//         ) : (
//           // Show the new address form when no addresses are found
//           showNewAddressForm && (
//             <form>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Full Name <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="name"
//                       value={name}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Phone <span className="required">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control border-form-control"
//                       name="phone"
//                       value={phone}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       State <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="states"
//                       value={states}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       District <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="district"
//                       value={district}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       City <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="city"
//                       value={city}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Area <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="area"
//                       value={area}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-12">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Shipping Address <span className="required">*</span>
//                     </label>
//                     <textarea
//                       className="form-control border-form-control"
//                       name="address"
//                       value={address}
//                       onChange={this.handleChange}
//                     />
//                     {/* <small className="text-danger">
//                       Please provide the number and street.
//                     </small> */}
//                   </div>
//                 </div>
//               </div>
//             </form>
//           )
//         )}
//         {locationList.length === 0 && showNewAddressForm && (
//           <button
//             type="button"
//             className="btn btn-secondary mb-2 btn-lg"
//             onClick={this.handleSubmit}
//           >
//             NEXT
//           </button>
//         )}
//       </div>
//     );
//   }
// }



// import React, { Component } from "react";
// import { GetAddressDetails, GetUserLogin } from "../../../../services";
// import './delivery.css'

// export default class Deliverydetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: "",
//       locationList: [],
//       name: "",
//       phone: "",
//       district: "",
//       city: "",
//       area: "",
//       states: "",
//       address: "",
//       showNewAddressForm: false,
//       selectedAddress: "", // State for selected address
//     };
//   }

//   async componentDidMount() {
//     let email = sessionStorage.getItem("email");
//     if (email) {
//       let value = await GetUserLogin.getCustomerDetail(email);
//       if (value) {
//         this.setState({ user: value.data });
//         this.fetchAddresses(value.data.id);
//       }
//     }
//   }

//   fetchAddresses = async (customerId) => {
//     let response = await GetAddressDetails.getAddressesByCustomerId(customerId);
//     if (response && response.success) {
//       this.setState({ locationList: response.data });
//       // If addresses are found, auto-select the first address
//       if (response.data.length > 0) {
//         const firstAddress = response.data[0];
//         this.setState({
//           selectedAddress: firstAddress.id,
//           name: firstAddress.fullname,
//           phone: firstAddress.phone,
//           district: firstAddress.district,
//           city: firstAddress.city,
//           area: firstAddress.area,
//           states: firstAddress.states,
//           address: firstAddress.shipping || "", // Set shipping address if available
//           showNewAddressForm: false, // Ensure new address form is closed
//         });
//       } else {
//         // If no addresses are found, show the new address form
//         this.setState({ showNewAddressForm: true });
//       }
//     }
//   };

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleAddressSelect = (address) => {
//     this.setState({
//       selectedAddress: address.id,
//       showNewAddressForm: false,
//       name: address.fullname,
//       phone: address.phone,
//       district: address.district,
//       city: address.city,
//       area: address.area,
//       states: address.states,
//       address: address.shipping || "", // Set shipping address if available
//     });
//   };

//   toggleNewAddressForm = () => {
//     this.setState((prevState) => ({
//       showNewAddressForm: !prevState.showNewAddressForm,
//       selectedAddress: "", // Reset selected address when toggling to new address form
//       name: "", // Reset name field
//       phone: "", // Reset phone field
//       states: "", // Reset states field
//       district: "", // Reset district field
//       city: "", // Reset city field
//       area: "", // Reset area field
//       address: "", // Reset address field
//     }));
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const { name, phone, district, city, area, states, address, selectedAddress, showNewAddressForm } = this.state;

//     // Check if an address is selected or the new address form is being used
//     if (!selectedAddress && !showNewAddressForm) {
//       alert("Please select or add a new address.");
//       return;
//     }

//     // Create the delivery object
//     let delivery = {
//       name,
//       phone,
//       district,
//       city,
//       area,
//       states,
//       address,
//     };

//     // If a new address is being added, include the form data in the submission
//     if (showNewAddressForm) {
//       delivery = {
//         ...delivery,
//         addressId: null, // Use null or appropriate key to indicate new address is being added
//       };
//     } else {
//       // Include selectedAddress ID when not adding a new address
//       delivery.selectedAddress = selectedAddress;
//     }

//     // Pass the delivery object to the parent component
//     this.props.onSelectDeliveryAddress(delivery);
//   };

//   render() {
//     const { name, phone, district, city, area, states, address, locationList, showNewAddressForm, selectedAddress } =
//       this.state;

//     return (
//       <div className="card-body">
//         {locationList.length > 0 && !showNewAddressForm ? (
//           <>
//             <div className="address-list">
//               {locationList.map((address, index) => (
//                 <div
//                   className="address-item"
//                   key={index}
//                   onClick={() => this.handleAddressSelect(address)}
//                 >
//                   <div
//                     className={`delivery-custom-checkbox ${selectedAddress === address.id ? "checked" : ""}`}
//                   ></div>
//                   <label>
//                     {address.fullname}<br />
//                     +91 {address.phone}<br />
//                     {address.shipping ? `${address.shipping}, ` : ""}
//                     {address.area ? `${address.area}, ` : ""}
//                     {address.city ? `${address.city}, ` : ""}
//                     {address.district ? `${address.district}, ` : ""}
//                     {address.states ? `${address.states}` : ""}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           // Show the new address form when no addresses are found or it is explicitly opened
//           showNewAddressForm && (
//             <form>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Full Name <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="name"
//                       value={name}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Phone <span className="required">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control border-form-control"
//                       name="phone"
//                       value={phone}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       State <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="states"
//                       value={states}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       District <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="district"
//                       value={district}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       City <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control border-form-control"
//                       name="city"
//                       value={city}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-sm-6">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Area <span className="required">*</span>
//                     </label>
//                     <input
//                       className="form-control border-form-control"
//                       type="text"
//                       name="area"
//                       value={area}
//                       onChange={this.handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-sm-12">
//                   <div className="form-group">
//                     <label className="control-label">
//                       Shipping Address <span className="required">*</span>
//                     </label>
//                     <textarea
//                       className="form-control border-form-control"
//                       name="address"
//                       value={address}
//                       onChange={this.handleChange}
//                     />
//                     <small className="text-danger">
//                       Please provide the number and street.
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           )
//         )}

//         <button
//           type="button"
//           className="btn btn-secondary mb-2 btn-lg"
//           onClick={this.handleSubmit}
//         >
//           NEXT
//         </button>
//       </div>
//     );
//   }
// }
import React, { Component } from "react";
import { GetAddressDetails, GetUserLogin } from "../../../../services";
import './delivery.css'
import { NotificationManager } from "react-notifications";

export default class Deliverydetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      locationList: [],
      name: "",
      phone: "",
      area: "",
      states: "",
      showNewAddressForm: false,
      selectedAddress: "", // State for selected address
    };
  }

  async componentDidMount() {
    let email = sessionStorage.getItem("email");
    if (email) {
      let value = await GetUserLogin.getCustomerDetail(email);
      if (value) {
        this.setState({ user: value.data });
        this.fetchAddresses(value.data.id);
      }
    }
  }

  fetchAddresses = async (customerId) => {
    let response = await GetAddressDetails.getAddressesByCustomerId(customerId);
    if (response && response.success) {
      this.setState({ locationList: response.data });
      // If addresses are found, auto-select the first address
      if (response.data.length > 0) {
        const firstAddress = response.data[0];
        this.setState({
          selectedAddress: firstAddress.id,
          name: firstAddress.fullname,
          phone: firstAddress.phone,
          area: firstAddress.area,
          states: firstAddress.states,
          showNewAddressForm: false, // Ensure new address form is closed
        });
      } else {
        // If no addresses are found, show the new address form
        this.setState({ showNewAddressForm: true });
      }
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddressSelect = (address) => {
    this.setState({
      selectedAddress: address.id,
      showNewAddressForm: false,
      name: address.fullname,
      phone: address.phone,
      area: address.area,
      states: address.states,
    });
  };

  toggleNewAddressForm = () => {
    this.setState((prevState) => ({
      showNewAddressForm: !prevState.showNewAddressForm,
      selectedAddress: "", // Reset selected address when toggling to new address form
      name: "", // Reset name field
      phone: "", // Reset phone field
      states: "", // Reset states field
      area: "", // Reset area field
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, phone, area, states, selectedAddress, showNewAddressForm } = this.state;

    // Check if an address is selected or the new address form is being used
    if (!selectedAddress && !showNewAddressForm) {
      alert("Please select or add a new address.");
      return;
    }

    // Check if all mandatory fields are filled
    if (!name || !phone || !area || !states) {
      alert("Please fill all mandatory fields.");
      return;
    }

    // Create the delivery object
    let delivery = {
      name,
      phone,
      area,
      states,
    };

    // If a new address is being added, include the form data in the submission
    if (showNewAddressForm) {
      delivery = {
        ...delivery,
        addressId: null, // Use null or appropriate key to indicate new address is being added
      };
    } else {
      // Include selectedAddress ID when not adding a new address
      delivery.selectedAddress = selectedAddress;
    }
    NotificationManager.success("Delivery adress updated");
    // Pass the delivery object to the parent component
    this.props.onSelectDeliveryAddress(delivery);
  };

  render() {
    const { name, phone, area, states, locationList, showNewAddressForm, selectedAddress } =
      this.state;

    return (
      <div className="card-body">
        {locationList.length > 0 && !showNewAddressForm ? (
          <div className="address-list">
            {locationList.map((address, index) => (
              <div
                className="address-item"
                key={index}
                onClick={() => this.handleAddressSelect(address)}
              >
                <div
                  className={`delivery-custom-checkbox ${selectedAddress === address.id ? "checked" : ""}`}
                ></div>
                <label>
                  {address.fullname}<br />
                  +91 {address.phone}<br />
                  {address.area ? `${address.area}, ` : ""}
                  {address.states ? `${address.states}` : ""}
                </label>
              </div>
            ))}
          </div>
        ) : (
          // Show the new address form when no addresses are found or it is explicitly opened
          showNewAddressForm && (
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      className="form-control border-form-control"
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      required // Mark as required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label">
                      Phone <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control border-form-control"
                      name="phone"
                      value={phone}
                      onChange={this.handleChange}
                      required // Mark as required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label">
                      State <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border-form-control"
                      name="states"
                      value={states}
                      onChange={this.handleChange}
                      required // Mark as required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label">
                      Area <span className="required">*</span>
                    </label>
                    <input
                      className="form-control border-form-control"
                      type="text"
                      name="area"
                      value={area}
                      onChange={this.handleChange}
                      required // Mark as required
                    />
                  </div>
                </div>
              </div>
            </form>
          )
        )}

        <button
          type="button"
          className="btn btn-secondary mb-2 btn-lg"
          onClick={this.handleSubmit}
        >
          NEXT
        </button>
      </div>
    );
  }
}
