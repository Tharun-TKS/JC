import React, { Component } from 'react';
import { GetUserLogin, GetOrderDetails } from '../../../../../services';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import '../../css/index.css';
import './order.css'

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: '',
            user: '',
            orderList: [],
            searchQuery: '' // State variable for search query
        };
    }

    async componentDidMount() {
        let email = sessionStorage.getItem('email');
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value && value.data) {
                this.setState({ customer: value.data, user: value.data }, async () => {
                    let list = await GetOrderDetails.getOrderByUser(this.state.customer.id);
                    this.setState({ orderList: list.order });
                });
            } else {
                NotificationManager.error("Check your credentials", "Login");
            }
        }
    }

    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    // Function to handle file download
    // handleDownload = async (variantPath) => {
    //     try {
    //         const filename = variantPath.substring(variantPath.lastIndexOf('/') + 1);
    //         const response = await GetOrderDetails.getOrderDownload(filename);

    //         // Create a new Blob with the response data, specifying the 'application/zip' MIME type
    //         const blob = new Blob([response], { type: 'application/zip' });

    //         // Create a link element to trigger the download
    //         const link = document.createElement('a');
    //         link.href = window.URL.createObjectURL(blob);
    //         link.download = filename; // The filename of the .zip file

    //         // Append the link to the body, trigger click, then remove the link
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);

    //     } catch (error) {
    //         console.error("Download error:", error);
    //         NotificationManager.error("Failed to download the file", "Download Error");
    //     }
    // }
    handleDownload = async (variantPath) => {
        try {
            const filename = variantPath.substring(variantPath.lastIndexOf('/') + 1);
            const response = await GetOrderDetails.getOrderDownload(filename);
    
            if (response === null) {
                // No file found, do not proceed with download
                NotificationManager.error("File not found", "Download Error");
                return;
            }
    
            // Create a new Blob with the response data, specifying the 'application/zip' MIME type
            const blob = new Blob([response], { type: 'application/zip' });
    
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename; // The filename of the .zip file
    
            // Append the link to the body, trigger click, then remove the link
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
        } catch (error) {
            console.error("Download error:", error);
            NotificationManager.error("Failed to download the file", "Download Error");
        }
    }
    


    render() {
        let { user, orderList, searchQuery } = this.state;

        // Filter orders based on search query
        let filteredOrders = orderList.filter(order => {
            let orderPaths = [];
            try {
                orderPaths = JSON.parse(order.orderPaths);
                if (typeof orderPaths === 'string') {
                    orderPaths = JSON.parse(orderPaths);
                }
            } catch (error) {
                console.error("JSON Parse Error:", error);
            }

            return orderPaths.some(path => path.productName.toLowerCase().includes(searchQuery.toLowerCase()));
        });

        let totalOrders = orderList.length;

        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home </a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Downloads</li>
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
                                            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
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
                                    <a href="/account/view" className="user-item"><i className="uil uil-apps" />Overview</a>
                                    <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                    <a href="/account/order" className="user-item active"><i className="uil uil-box" />Downloads</a>
                                    <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a>
                                    <a href="/account/address" className="user-item"><i className="uil uil-location-point" />My Address</a>
                                    <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Logout</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className="dashboard-right">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-title-tab">
                                        <h4><i className="uil uil-box" />My Downloads - ({totalOrders})</h4> {/* Display total orders here */}
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
                                                        placeholder="Search by product name"
                                                        value={searchQuery}
                                                        onChange={this.handleSearch}
                                                    />
                                                </div>
                                            </div>
                                            <div className="order-body10">
                                                <div className="card card-body account-right">
                                                    <div className="widget">
                                                        <div className="order-list-tabel-main table-responsive">
                                                            <table className="datatabel table table-striped table-bordered order-list-tabel" width="100%" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Order ID</th>
                                                                        <th>Date Purchased</th>
                                                                        <th>Total</th>
                                                                        <th>Product Image</th>
                                                                        <th>Product Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        filteredOrders && filteredOrders.length > 0 ?
                                                                            filteredOrders.map((row, index) => {
                                                                                let orderPaths = [];
                                                                                try {
                                                                                    orderPaths = JSON.parse(row.orderPaths);
                                                                                    if (typeof orderPaths === 'string') {
                                                                                        orderPaths = JSON.parse(orderPaths);
                                                                                    }
                                                                                } catch (error) {
                                                                                    console.error("JSON Parse Error:", error);
                                                                                }

                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>#{row.number}</td>
                                                                                        <td><Moment format='DD - MM - YYYY'>{row.createdAt}</Moment></td>
                                                                                        <td>₹{row.grandtotal}</td>
                                                                                        <td>
                                                                                            {orderPaths.length > 0 ? (
                                                                                                <div>
                                                                                                    <img crossOrigin='anonymous'
                                                                                                        src={orderPaths[0].productPhoto}
                                                                                                        alt={orderPaths[0].productName}
                                                                                                        style={{ width: '150px', height: '100px', objectFit: 'cover' }} />
                                                                                                </div>
                                                                                            ) : (
                                                                                                <span>No product Image</span>
                                                                                            )}
                                                                                        </td>
                                                                                        <td>
                                                                                            {orderPaths.length > 0 ? (
                                                                                                orderPaths.map((path, i) => (
                                                                                                    <div key={i}>
                                                                                                        <strong>Product:</strong> {path.productName}<br />
                                                                                                        <strong>Variant:</strong> {path.variantName}<br />
                                                                                                        <a
                                                                                                            href="#"
                                                                                                            onClick={() => this.handleDownload(path.variantPath)} // Call the download handler
                                                                                                            rel="noopener noreferrer"
                                                                                                        >
                                                                                                            Download
                                                                                                        </a><br />
                                                                                                    </div>
                                                                                                ))
                                                                                            ) : (
                                                                                                <span>No paths available</span>
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                            : <tr><td colSpan="6">No orders found.</td></tr>
                                                                    }
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