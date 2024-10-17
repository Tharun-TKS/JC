// import React, { Component } from 'react';
// import { GetUserLogin, GetOrderDetails } from '../../../../../services';
// import { NotificationManager } from 'react-notifications';
// import Moment from 'react-moment';
// import '../../css/index.css';
// import './order.css'

// export default class List extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             customer: '',
//             user: '',
//             orderList: [],
//             searchQuery: '' // State variable for search query
//         };
//     }

//     async componentDidMount() {
//         let email = sessionStorage.getItem('email');
//         if (email) {
//             let value = await GetUserLogin.getCustomerDetail(email);
//             if (value && value.data) {
//                 this.setState({ customer: value.data, user: value.data }, async () => {
//                     let list = await GetOrderDetails.getOrderByUser(this.state.customer.id);
//                     this.setState({ orderList: list.order });
//                 });
//             } else {
//                 NotificationManager.error("Check your credentials", "Login");
//             }
//         }
//     }

//     handleLogout = async (event) => {
//         event.preventDefault();
//         await GetUserLogin.logout();
//     }

//     handleSearch = (event) => {
//         this.setState({ searchQuery: event.target.value });
//     }

//     // Function to handle file download
//     // handleDownload = async (variantPath) => {
//     //     try {
//     //         const filename = variantPath.substring(variantPath.lastIndexOf('/') + 1);
//     //         const response = await GetOrderDetails.getOrderDownload(filename);

//     //         // Create a new Blob with the response data, specifying the 'application/zip' MIME type
//     //         const blob = new Blob([response], { type: 'application/zip' });

//     //         // Create a link element to trigger the download
//     //         const link = document.createElement('a');
//     //         link.href = window.URL.createObjectURL(blob);
//     //         link.download = filename; // The filename of the .zip file

//     //         // Append the link to the body, trigger click, then remove the link
//     //         document.body.appendChild(link);
//     //         link.click();
//     //         document.body.removeChild(link);

//     //     } catch (error) {
//     //         console.error("Download error:", error);
//     //         NotificationManager.error("Failed to download the file", "Download Error");
//     //     }
//     // }
//     handleDownload = async (variantPath) => {
//         try {
//             const filename = variantPath.substring(variantPath.lastIndexOf('/') + 1);
//             const response = await GetOrderDetails.getOrderDownload(filename);

//             if (response === null) {
//                 // No file found, do not proceed with download
//                 NotificationManager.error("File not found", "Download Error");
//                 return;
//             }

//             // Create a new Blob with the response data, specifying the 'application/zip' MIME type
//             const blob = new Blob([response], { type: 'application/zip' });

//             // Create a link element to trigger the download
//             const link = document.createElement('a');
//             link.href = window.URL.createObjectURL(blob);
//             link.download = filename; // The filename of the .zip file

//             // Append the link to the body, trigger click, then remove the link
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//         } catch (error) {
//             console.error("Download error:", error);
//             NotificationManager.error("Failed to download the file", "Download Error");
//         }
//     }

//     render() {
//         let { user, orderList, searchQuery } = this.state;

//         // Filter orders based on search query
//         let filteredOrders = orderList.filter(order => {
//             let orderPaths = [];
//             try {
//                 orderPaths = JSON.parse(order.orderPaths);
//                 if (typeof orderPaths === 'string') {
//                     orderPaths = JSON.parse(orderPaths);
//                 }
//             } catch (error) {
//                 console.error("JSON Parse Error:", error);
//             }

//             return orderPaths.some(path => path.productName.toLowerCase().includes(searchQuery.toLowerCase()));
//         });

//         let totalOrders = orderList.length;

//         return (
//             <div className="wrapper">
//                 <div className="gambo-Breadcrumb">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <nav aria-label="breadcrumb">
//                                     <ol className="breadcrumb">
//                                         <li className="breadcrumb-item"><a href="/">Home </a></li>
//                                         <li className="breadcrumb-item active" aria-current="page">Downloads</li>
//                                     </ol>
//                                 </nav>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="dashboard-group">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="user-dt">
//                                     <div className="user-img">
//                                         <img src="/img/avatar/img-5.jpg" alt="" />
//                                         <div className="img-add">
//                                             <input type="file" id="file" />
//                                             <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
//                                         </div>
//                                     </div>
//                                     <h4>{user.fullName}</h4>
//                                     <p>+91 {user.phone}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-3 col-md-4">
//                             <div className="left-side-tabs">
//                                 <div className="dashboard-left-links">
//                                     <a href="/account/view" className="user-item"><i className="uil uil-apps" />Overview</a>
//                                     <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
//                                     <a href="/account/order" className="user-item active"><i className="uil uil-box" />Downloads</a>
//                                     <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a>
//                                     <a href="/account/address" className="user-item"><i className="uil uil-location-point" />My Address</a>
//                                     <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Logout</a>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-9 col-md-8">
//                             <div className="dashboard-right">
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <div className="main-title-tab">
//                                         <h4><i className="uil uil-box" />My Downloads - ({totalOrders})</h4> {/* Display total orders here */}
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-12 col-md-12">
//                                         <div className="pdpt-bg">
//                                             <div className="pdpt-title">
//                                                 <h6>Order List</h6>
//                                                 <div className="col-md-10 text-center">
//                                                     <input
//                                                         type="text"
//                                                         className="form-control"
//                                                         placeholder="Search by product name"
//                                                         value={searchQuery}
//                                                         onChange={this.handleSearch}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <div className="order-body10">
//                                                 <div className="card card-body account-right">
//                                                     <div className="widget">
//                                                         <div className="order-list-tabel-main table-responsive">
//                                                             <table className="datatabel table table-striped table-bordered order-list-tabel" width="100%" cellspacing="0">
//                                                                 <thead>
//                                                                     <tr>
//                                                                         <th>Order ID</th>
//                                                                         <th>Date Purchased</th>
//                                                                         <th>Total</th>
//                                                                         <th>Product Image</th>
//                                                                         <th>Product Details</th>
//                                                                     </tr>
//                                                                 </thead>
//                                                                 <tbody>
//                                                                     {
//                                                                         filteredOrders && filteredOrders.length > 0 ?
//                                                                             filteredOrders.map((row, index) => {
//                                                                                 let orderPaths = [];
//                                                                                 try {
//                                                                                     orderPaths = JSON.parse(row.orderPaths);
//                                                                                     if (typeof orderPaths === 'string') {
//                                                                                         orderPaths = JSON.parse(orderPaths);
//                                                                                     }
//                                                                                 } catch (error) {
//                                                                                     console.error("JSON Parse Error:", error);
//                                                                                 }

//                                                                                 return (
//                                                                                     <tr key={index}>
//                                                                                         <td>#{row.number}</td>
//                                                                                         <td><Moment format='DD - MM - YYYY'>{row.createdAt}</Moment></td>
//                                                                                         <td>₹{row.grandtotal}</td>
//                                                                                         <td>
//                                                                                             {orderPaths.length > 0 ? (
//                                                                                                 <div>
//                                                                                                     <img crossOrigin='anonymous'
//                                                                                                         src={orderPaths[0].productPhoto}
//                                                                                                         alt={orderPaths[0].productName}
//                                                                                                         style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
//                                                                                                 </div>
//                                                                                             ) : (
//                                                                                                 <span>No product Image</span>
//                                                                                             )}
//                                                                                         </td>
//                                                                                         <td>
//                                                                                             {orderPaths.length > 0 ? (
//                                                                                                 orderPaths.map((path, i) => (
//                                                                                                     <div key={i}>
//                                                                                                         <strong>Product:</strong> {path.productName}<br />
//                                                                                                         <strong>Variant:</strong> {path.variantName}<br />
//                                                                                                         <a
//                                                                                                             href="#"
//                                                                                                             onClick={() => this.handleDownload(path.variantPath)} // Call the download handler
//                                                                                                             rel="noopener noreferrer"
//                                                                                                         >
//                                                                                                             Download
//                                                                                                         </a><br />
//                                                                                                     </div>
//                                                                                                 ))
//                                                                                             ) : (
//                                                                                                 <span>No paths available</span>
//                                                                                             )}
//                                                                                         </td>
//                                                                                     </tr>
//                                                                                 );
//                                                                             })
//                                                                             : <tr><td colSpan="6">No orders found.</td></tr>
//                                                                     }
//                                                                 </tbody>
//                                                             </table>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }



// import React, { Component } from "react";
// import { GetUserLogin, GetOrderDetails } from "../../../../../services";
// import { NotificationManager } from "react-notifications";
// import Moment from "react-moment";
// import "../../css/index.css";
// import "./order.css";

// export default class List extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       customer: "",
//       user: "",
//       orderList: [],
//       searchQuery: "", // State variable for search query
//     };
//   }

//   async componentDidMount() {
//     let email = sessionStorage.getItem("email");
//     if (email) {
//       let value = await GetUserLogin.getCustomerDetail(email);
//       if (value && value.data) {
//         this.setState({ customer: value.data, user: value.data }, async () => {
//           let list = await GetOrderDetails.getOrderByUser(
//             this.state.customer.id
//           );
//           this.setState({ orderList: list.orders });
//         });
//       } else {
//         NotificationManager.error("Check your credentials", "Login");
//       }
//     }
//   }

//   handleLogout = async (event) => {
//     event.preventDefault();
//     await GetUserLogin.logout();
//   };

//   handleSearch = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   handleDownload = async (variantPath) => {
//     try {
//       const filename = variantPath.substring(variantPath.lastIndexOf("/") + 1);
//       const response = await GetOrderDetails.getOrderDownload(filename);

//       if (response === null) {
//         NotificationManager.error("File not found", "Download Error");
//         return;
//       }

//       const blob = new Blob([response], { type: "application/zip" });

//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = filename;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Download error:", error);
//       NotificationManager.error(
//         "Failed to download the file",
//         "Download Error"
//       );
//     }
//   };

//   render() {
//     let { user, orderList, searchQuery } = this.state;

//     let filteredOrders = orderList.filter((order) => {
//       return order.orderPaths.some((path) =>
//         path.productName.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });

//     let totalOrders = orderList.length;

//     return (
//       <div className="wrapper">
//         <div className="gambo-Breadcrumb">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <nav aria-label="breadcrumb">
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item">
//                       <a href="/">Home </a>
//                     </li>
//                     <li className="breadcrumb-item active" aria-current="page">
//                       Downloads
//                     </li>
//                   </ol>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="dashboard-group">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="user-dt">
//                   <div className="user-img">
//                     <img src="/img/avatar/img-5.jpg" alt="" />
//                     <div className="img-add">
//                       <input type="file" id="file" />
//                       <label htmlFor="file">
//                         <i className="uil uil-camera-plus" />
//                       </label>
//                     </div>
//                   </div>
//                   <h4>{user.fullName}</h4>
//                   <p>+91 {user.phone}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-3 col-md-4">
//               <div className="left-side-tabs">
//                 <div className="dashboard-left-links">
//                   <a href="/account/view" className="user-item">
//                     <i className="uil uil-apps" />
//                     Overview
//                   </a>
//                   <a href="/account/profile" className="user-item">
//                     <i className="mdi mdi-account-outline" />
//                     My profile
//                   </a>
//                   <a href="/account/order" className="user-item active">
//                     <i className="uil uil-box" />
//                     Downloads
//                   </a>
//                   <a href="/account/wishlist" className="user-item">
//                     <i className="uil uil-heart" />
//                     Shopping Wishlist
//                   </a>
//                   <a href="/account/address" className="user-item">
//                     <i className="uil uil-location-point" />
//                     My Address
//                   </a>
//                   <a className="user-item" onClick={this.handleLogout}>
//                     <i className="uil uil-exit" />
//                     Logout
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-9 col-md-8">
//               <div className="dashboard-right">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="main-title-tab">
//                       <h4>
//                         <i className="uil uil-box" />
//                         My Downloads - ({totalOrders})
//                       </h4>
//                     </div>
//                   </div>
//                   <div className="col-lg-12 col-md-12">
//                     <div className="pdpt-bg">
//                       <div className="pdpt-title">
//                         <h6>Order List</h6>
//                         <div className="col-md-10 text-center">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search by product name"
//                             value={searchQuery}
//                             onChange={this.handleSearch}
//                           />
//                         </div>
//                       </div>
//                       <div className="order-body10">
//                         <div className="card card-body account-right">
//                           <div className="widget">
//                             <div className="order-list-tabel-main table-responsive">
//                               <table
//                                 className="datatabel table table-striped table-bordered order-list-tabel"
//                                 width="100%"
//                                 cellspacing="0"
//                               >
//                                 <thead>
//                                   <tr>
//                                     <th>Order ID</th>
//                                     <th>Date Purchased</th>
//                                     <th>Total</th>
//                                     <th>Product Image</th>
//                                     <th>Product Details</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {filteredOrders &&
//                                   filteredOrders.length > 0 ? (
//                                     filteredOrders.map((row, index) =>
//                                       row.orderPaths.length > 0 ? (
//                                         row.orderPaths.map((path, i) => (
//                                           <React.Fragment key={`${index}-${i}`}>
//                                             <tr>
//                                               <td
//                                                 rowSpan={path.variants.length}
//                                               >
//                                                 #{row.number}
//                                               </td>
//                                               <td
//                                                 rowSpan={path.variants.length}
//                                               >
//                                                 <Moment format="DD - MM - YYYY">
//                                                   {row.createdAt}
//                                                 </Moment>
//                                               </td>
//                                               <td
//                                                 rowSpan={path.variants.length}
//                                               >
//                                                 ₹{row.grandtotal}
//                                               </td>
//                                               <td
//                                                 rowSpan={path.variants.length}
//                                               >
//                                                 {path.productPhoto ? (
//                                                   <img
//                                                     crossOrigin="anonymous"
//                                                     src={path.productPhoto}
//                                                     alt={path.productName}
//                                                     style={{
//                                                       width: "150px",
//                                                       height: "100px",
//                                                       objectFit: "cover",
//                                                     }}
//                                                   />
//                                                 ) : (
//                                                   <span>No product Image</span>
//                                                 )}
//                                               </td>
//                                               <td>
//                                                 <strong>Product:</strong>{" "}
//                                                 {path.productName}
//                                                 <br />
//                                                 <strong>Variant:</strong>{" "}
//                                                 {path.variants[0].variantName}
//                                                 <br />
//                                                 <a
//                                                   href="#"
//                                                   onClick={() =>
//                                                     this.handleDownload(
//                                                       path.variants[0]
//                                                         .variantPath
//                                                     )
//                                                   }
//                                                   rel="noopener noreferrer"
//                                                 >
//                                                   Download
//                                                 </a>
//                                                 <br />
//                                               </td>
//                                             </tr>
//                                             {path.variants
//                                               .slice(1)
//                                               .map((variant, vIndex) => (
//                                                 <tr
//                                                   key={`${index}-${i}-${vIndex}`}
//                                                 >
//                                                   <td>
//                                                     <strong>Variant:</strong>{" "}
//                                                     {variant.variantName}
//                                                     <br />
//                                                     <a
//                                                       href="#"
//                                                       onClick={() =>
//                                                         this.handleDownload(
//                                                           variant.variantPath
//                                                         )
//                                                       }
//                                                       rel="noopener noreferrer"
//                                                     >
//                                                       Download
//                                                     </a>
//                                                     <br />
//                                                   </td>
//                                                 </tr>
//                                               ))}
//                                           </React.Fragment>
//                                         ))
//                                       ) : (
//                                         <tr key={index}>
//                                           <td>#{row.number}</td>
//                                           <td>
//                                             <Moment format="DD - MM - YYYY">
//                                               {row.createdAt}
//                                             </Moment>
//                                           </td>
//                                           <td>₹{row.grandtotal}</td>
//                                           <td colSpan="2">
//                                             No products found.
//                                           </td>
//                                         </tr>
//                                       )
//                                     )
//                                   ) : (
//                                     <tr>
//                                       <td colSpan="6">No orders found.</td>
//                                     </tr>
//                                   )}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }




import React, { Component } from "react";
import { GetUserLogin, GetOrderDetails } from "../../../../../services";
import { NotificationManager } from "react-notifications";
import Moment from "react-moment";
import "../../css/index.css";
import "./order.css";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      user: "",
      orderList: [],
      searchQuery: "", // State variable for search query
    };
  }

  async componentDidMount() {
    let email = sessionStorage.getItem("email");
    if (email) {
      let value = await GetUserLogin.getCustomerDetail(email);
      if (value && value.data) {
        this.setState({ customer: value.data, user: value.data }, async () => {
          let list = await GetOrderDetails.getOrderByUser(this.state.customer.phone);
          this.setState({ orderList: list.orders });
        });
      } else {
        NotificationManager.error("Check your credentials", "Login");
      }
    }
  }

  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };



// handleDownload = async (variantPath) => {
//   try {
//     let originalFilename = variantPath.substring(variantPath.lastIndexOf("/") + 1);
//     let filename = originalFilename;

//     const checkFileExists = async (file) => {
//       return await GetOrderDetails.getOrderDownload(file);
//     };

//     const generateVariations = (currentFilename) => {
//       const baseName = currentFilename.replace('.zip', '');
//       return [
//         currentFilename,
//         baseName + '.zip',
//         baseName.replace(/DSTBROTHERV3SE/, "DSTBROTHERV3V3SE") + '.zip',
//         baseName.replace(/DSTBROTHERV3V3SE/, "DSTBROTHERV3SE") + '.zip',
//         baseName.replace(/12x8$/, "").trim() + '.zip',
//         baseName.replace(/DSTBROTHERV3SE/, "DSTBROTHERV3V3SE").replace(/12x8$/, "").trim() + '.zip',
//         baseName.replace(/DSTBROTHERV3V3SE/, "DSTBROTHERV3SE").replace(/12x8$/, "").trim() + '.zip',
//       ];
//     };


//     let response = await checkFileExists(filename);



    
//     if (response === null) {
//       const variations = generateVariations(filename);
//       for (let variation of variations) {
//         response = await checkFileExists(variation);
//         if (response) {
//           filename = variation; // Update filename to the found variation
//           break;
//         }
//       }
//     }
    
//     if (response === null) {
//       let basename = filename.slice(0, -8);
//       let trimmedFilename = basename + '.zip';
//       response = await checkFileExists(trimmedFilename);
//     }

//     if (response === null) {
    
//       const wordsToRemove = [
//         "DSTBERNINA14x8",
//         "DSTFULL",
//         "JEFUSHA45011x8",
//         "JEFUSHA55014x8",
//         "PESBROTHERBP360014x9.5",
//         "DSTBROTHERV3V3SE12x8"
//       ];

     
//       wordsToRemove.forEach(word => {
//         filename = filename.replace(new RegExp(word, 'g'), '');
//       });

//       response = await checkFileExists(filename);


//       if (response === null) {
//         NotificationManager.error("File not found", "Download Error", 3000);
//         return;
//       }
//     }

//     // Create a Blob and trigger the download
//     const blob = new Blob([response], { type: "application/zip" });
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(blob);
//     link.download = filename.endsWith('.zip') ? filename : filename + '.zip';

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // Show success notification
//     NotificationManager.success("File downloaded successfully", "Download Complete", 3000);
//   } catch (error) {
//     console.error("Download error:", error);
//     NotificationManager.error("Failed to download the file", "Download Error", 3000);
//   }
// };


handleDownload = async (variantPath) => {
  try {
    let originalFilename = variantPath.substring(variantPath.lastIndexOf("/") + 1);
    let filename = originalFilename;

    // Show loading notification
    NotificationManager.info("Download in progress...", "Download", 1000);

    // Define the keywords to remove
    const keywordsToRemove = [
      "DSTBERNINA14x8",
      "DSTFULL",
      "JEFUSHA45011x8",
      "JEFUSHA55014x8",
      "PESBROTHERBP360014x9.5",
    ];

    // Function to check if the file exists
    const checkFileExists = async (file) => {
      return await GetOrderDetails.getOrderDownload(file);
    };

    // Function to generate filename variations
    const generateVariations = (currentFilename) => {
      const baseName = currentFilename.replace('.zip', '');
      return [
        currentFilename,
        baseName + '.zip',
        baseName.replace(/DSTBROTHERV3SE/, "DSTBROTHERV3V3SE") + '.zip',
        baseName.replace(/DSTBROTHERV3V3SE/, "DSTBROTHERV3SE") + '.zip',
        baseName.replace(/12x8$/, "").trim() + '.zip',
        baseName.replace(/DSTBROTHERV3SE/, "DSTBROTHERV3V3SE").replace(/12x8$/, "").trim() + '.zip',
        baseName.replace(/DSTBROTHERV3V3SE/, "DSTBROTHERV3SE").replace(/12x8$/, "").trim() + '.zip',
      ];
    };

    // Check the original filename first
    let response = await checkFileExists(filename);

    // If not found, generate variations and check each one
    if (response === null) {
      const variations = generateVariations(filename);
      for (let variation of variations) {
        response = await checkFileExists(variation);
        if (response) {
          filename = variation; // Update filename to the found variation
          break;
        }
      }
    }

    // If still no response, check for trimmed filename if it ends with .zip
    if (response === null && filename.endsWith(".zip")) {
      const baseName = filename.slice(0, -8); // Remove the ".zip" extension
      const trimmedFilename = baseName + ".zip"; // Re-add ".zip" after trimming
      response = await checkFileExists(trimmedFilename);
      if (response) {
        filename = trimmedFilename; // Update filename if found
      }
    }

    // If still no response, remove keywords and check again
    if (response === null) {
      let modifiedFilename = originalFilename;
      keywordsToRemove.forEach(keyword => {
        const regex = new RegExp(keyword, 'g');
        modifiedFilename = modifiedFilename.replace(regex, '').trim();
      });

      // Check again with the modified filename
      response = await checkFileExists(modifiedFilename);
      if (response) {
        filename = modifiedFilename; // Update filename if found
      }
    }

    // If still no response, show an error
    if (response === null) {
      NotificationManager.error("File not found", "Download Error", 3000);
      return;
    }

    // Create a Blob and trigger the download
    const blob = new Blob([response], { type: "application/zip" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename.endsWith('.zip') ? filename : filename + '.zip';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success notification
    NotificationManager.success("File downloaded successfully", "Download Complete", 3000);
  } catch (error) {
    console.error("Download error:", error);
    NotificationManager.error("Failed to download the file", "Download Error", 3000);
  }
};

  render() {
    const { user, orderList, searchQuery } = this.state;

    // Filter orders based on the search query across multiple fields
    const filteredOrders = orderList.filter((order) => {
      const orderIDMatch = order.number.toLowerCase().includes(searchQuery.toLowerCase());
      const dateMatch = (
        <Moment format="DD - MM - YYYY">{order.createdAt}</Moment>
      ).toString().toLowerCase().includes(searchQuery.toLowerCase());

      const productMatch = order.orderPaths.some((path) =>
        path.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return orderIDMatch || dateMatch || productMatch;
    });

    const totalOrders = filteredOrders.length;

    return (
      <div className="wrapper">
        <div className="gambo-Breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/">Home </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Downloads
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-group">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="user-dt">
                  <div className="user-img">
                    <img src="/img/avatar/img-5.jpg" alt="" />
                    <div className="img-add">
                      <input type="file" id="file" />
                      <label htmlFor="file">
                        <i className="uil uil-camera-plus" />
                      </label>
                    </div>
                  </div>
                  <h4>{user.fullName}</h4>
                  <p>+91 {user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <div className="left-side-tabs">
                <div className="dashboard-left-links">
                  <a href="/account/view" className="user-item">
                    <i className="uil uil-apps" />
                    Overview
                  </a>
                  <a href="/account/profile" className="user-item">
                    <i className="mdi mdi-account-outline" />
                    My profile
                  </a>
                  <a href="/account/order" className="user-item active">
                    <i className="uil uil-box" />
                    Downloads
                  </a>
                  <a href="/account/wishlist" className="user-item">
                    <i className="uil uil-heart" />
                    Shopping Wishlist
                  </a>
                  <a href="/account/address" className="user-item">
                    <i className="uil uil-location-point" />
                    My Address
                  </a>
                  <a className="user-item" onClick={this.handleLogout}>
                    <i className="uil uil-exit" />
                    Logout
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="dashboard-right">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-title-tab">
                      <h4>
                        <i className="uil uil-box" />
                        My Downloads - ({totalOrders})
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="pdpt-bg">
                      <div className="pdpt-title">
                        <h6>Order List</h6>
                        <div className="col-md-10 text-center">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by order ID, date, or product name"
                            value={searchQuery}
                            onChange={this.handleSearch}
                          />
                        </div>
                      </div>
                      <div className="order-body10">
                        <div className="card card-body account-right">
                          <div className="widget">
                            <div className="order-list-tabel-main table-responsive">
                              <table
                                className="datatabel table table-striped table-bordered order-list-tabel"
                                width="100%"
                                cellSpacing="0"
                              >
                                <thead>
                                  <tr>
                                    <th>S.No</th>
                                    <th>Order ID</th>
                                    <th>Date Purchased</th>
                                    <th>Total</th>
                                    <th>Product Image</th>
                                    <th>Product Details</th>
                                  </tr>
                                </thead>
                                <tbody>
  {filteredOrders.length > 0 ? (
    filteredOrders.map((row, index) =>
      row.orderPaths.length > 0 ? (
        row.orderPaths.map((path, i) => (
          <React.Fragment key={`${index}-${i}`}>
            <tr>
            <td rowSpan={path.variants && path.variants.length > 0 ? path.variants.length : 1}>
                                                {index + 1}
                                              </td>
              <td rowSpan={path.variants && path.variants.length > 0 ? path.variants.length : 1}>
                #{row.number}
              </td>
              <td rowSpan={path.variants && path.variants.length > 0 ? path.variants.length : 1}>
                <Moment format="DD - MM - YYYY">{row.createdAt}</Moment>
              </td>
              <td rowSpan={path.variants && path.variants.length > 0 ? path.variants.length : 1}>
                ₹{row.grandtotal}
              </td>
              <td rowSpan={path.variants && path.variants.length > 0 ? path.variants.length : 1}>
                {path.productPhoto ? (
                  <img
                    crossOrigin="anonymous"
                    src={path.productPhoto}
                    alt={path.productName}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>No product Image</span>
                )}
              </td>
              <td>
                <strong>Product:</strong> {path.productName}
                <br />
                {path.variants && path.variants.length > 0 ? (
                  <>
                    <strong>Variant:</strong> {path.variants[0].variantName}
                    <br />
                    <a
                      href="#"
                      onClick={() => this.handleDownload(path.variants[0].variantPath)}
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                    <br />
                  </>
                ) : (
                  <span>No variant available</span>
                )}
              </td>
            </tr>
            {path.variants &&
              path.variants.slice(1).map((variant, vIndex) => (
                <tr key={`${index}-${i}-${vIndex}`}>
                  <td>
                    <strong>Variant:</strong> {variant.variantName}
                    <br />
                    <a
                      href="#"
                      onClick={() => this.handleDownload(variant.variantPath)}
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                    <br />
                  </td>
                </tr>
              ))}
          </React.Fragment>
        ))
      ) : null
    )
  ) : (
    <tr>
      <td colSpan="5" className="text-center">
        No orders found.
      </td>
    </tr>
  )}
</tbody>

                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
