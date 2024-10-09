// import React, { Component } from 'react';
// import {
//     Typography, Button
// } from "@material-ui/core";
// import { GetCustomerDetails } from '../../../../services';
// import { NotificationManager } from 'react-notifications';
// import swal from 'sweetalert';

// export default class View extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             getList: [],
//         };
//     }

//     handleBack() {
//         this.props.history.goBack();
//     }

//     async componentDidMount() {
//         this.getCustomer();
//     }

//     async getCustomer() {
//         let list = await GetCustomerDetails.getAllCustomerList();
//         this.setState({ getList: list.data });
//     }

//     async handleDeleteById(id) {
//         swal({
//             title: "Are you sure?",
//             text: "You want to delete Customer from the List",
//             icon: "warning",
//             buttons: true,
//             dangerMode: true,
//         })
//         .then(async (success) => {
//             if (success) {
//                 let value = await GetCustomerDetails.getCustomerDeleteById(id);
//                 if (value) {
//                     NotificationManager.success(value.msg, 'Status');
//                     setTimeout(async () => {
//                         window.location.reload();
//                     }, 1000);
//                 }
//             }
//         });
//     }

//     render() {
//         const { getList } = this.state;

//         return (
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-lg-5 col-md-9 col-lg-6">
//                         <h2 className="mt-30 page-title">Customer</h2>
//                     </div>
//                     <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
//                         <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
//                     </div>
//                 </div>
//                 <ol className="breadcrumb mb-30">
//                     <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
//                     <li className="breadcrumb-item active">Customer</li>
//                 </ol>
//                 <div className="row justify-content-between">
                    
//                     <div className="col-lg-5 col-md-6">
//                         <div className="bulk-section mt-30">
//                             <div className="search-by-name-input">
//                                 <input type="text" className="form-control" placeholder="Search" />
//                             </div>
//                             <div className="input-group">
//                                 <select id="categeory" name="categeory" className="form-control">
//                                     <option selected>Active</option>
//                                     <option value={1}>Inactive</option>
//                                 </select>
//                                 <div className="input-group-append">
//                                     <button className="status-btn hover-btn" type="submit">Search Customer</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-lg-12 col-md-12">
//                         <div className="card card-static-2 mt-30 mb-30">
//                             <div className="card-title-2">
//                                 <h4>All Customers</h4>
//                             </div>
//                             <div className="card-body-table">
//                                 <div className="table-responsive">
//                                     <table className="table ucp-table table-hover">
//                                         <thead>
//                                             <tr>
//                                                 <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
//                                                 <th style={{ width: 60 }}>ID</th>
//                                                 <th>Full Name</th>
//                                                 <th>Phone</th>
//                                                 <th>Email</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {
//                                                 getList.map((row, index) => (
//                                                     <tr key={row.id}>
//                                                         <td><input type="checkbox" className="check-item" name="ids[]" value={row.id} /></td>
//                                                         <td>{index + 1}</td>
//                                                         <td>{row.fullName}</td>
//                                                         <td>{row.phone}</td>
//                                                         <td>{row.email}</td>
//                                                         <td className="action-btns">
//                                                             {/* <Edit state={row} /> */}
//                                                             <Typography className="delete-btn" onClick={(e) => this.handleDeleteById(row.id)}><i className="fas fa-trash-alt" /></Typography>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             }
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

import React, { Component } from 'react';
import {
    Typography, Button
} from "@material-ui/core";
import { GetCustomerDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], // List of all customers
            filteredList: [], // List of filtered customers based on search
            searchQuery: '', // Search query
        };
    }

    handleBack() {
        this.props.history.goBack();
    }

    async componentDidMount() {
        await this.getCustomer();
    }

    async getCustomer() {
        let list = await GetCustomerDetails.getAllCustomerList();
        this.setState({ 
            getList: list.data,
            filteredList: list.data // Initially set filtered list to all customers
        });
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        this.setState({ searchQuery: query }, () => {
            this.filterCustomers();
        });
    }

    filterCustomers() {
        const { getList, searchQuery } = this.state;
        const filteredList = getList.filter(customer =>
            customer.fullName.toLowerCase().includes(searchQuery) ||
            customer.phone.toLowerCase().includes(searchQuery) ||
            customer.email.toLowerCase().includes(searchQuery)
        );
        this.setState({ filteredList });
    }

    async handleDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Customer from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (success) => {
            if (success) {
                let value = await GetCustomerDetails.getCustomerDeleteById(id);
                if (value) {
                    NotificationManager.success(value.msg, 'Status');
                    setTimeout(async () => {
                        await this.getCustomer(); // Refresh customer list after deletion
                    }, 1000);
                }
            }
        });
    }

    render() {
        const { filteredList, searchQuery } = this.state;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Customer</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={() => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Customer</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => this.handleSearch(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Customers</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Full Name</th>
                                                <th>Phone</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredList.map((row, index) => (
                                                    <tr key={row.id}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" value={row.id} /></td>
                                                        <td>{index + 1}</td>
                                                        <td>{row.fullName}</td>
                                                        <td>{row.phone}</td>
                                                        <td>{row.email}</td>
                                                        <td className="action-btns">
                                                            {/* <Edit state={row} /> */}
                                                            <Typography className="delete-btn" onClick={() => this.handleDeleteById(row.id)}><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

