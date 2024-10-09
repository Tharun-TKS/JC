import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import { GetCategoryDetails } from '../../../../services';
import swal from 'sweetalert';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            getdata: [], 
            searchQuery: '', // New state for search query
            loading: true,   // New state for loading status
            error: ''        // New state for error messages
        };
    }

    handleBack() {
        this.props.history.goBack();
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    async getChildCategory() {
        try {
            const response = await GetCategoryDetails.getCategoryList();
            if (response && response.data) {
                this.setState({ getdata: response.data, loading: false, error: '' });
            } else {
                this.setState({ getdata: [], loading: false, error: 'No categories found.' });
            }
        } catch (error) {
            this.setState({ loading: false, error: 'Failed to fetch categories.' });
        }
    }

    async componentDidMount() {
        this.getChildCategory();
    }

    async handleDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (success) => {
            if (success) {
                let value = await GetCategoryDetails.getChildDeleteById(id);
                if (value) {
                    this.getChildCategory();
                }
            }
        });
    }

    handleSearchChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    filterCategories(categories, query) {
        const lowerQuery = query.toLowerCase();
        return categories.filter(category => 
            category.name.toLowerCase().includes(lowerQuery)
        );
    }

    render() {
        const { getdata, searchQuery, loading, error } = this.state;
        const filteredData = this.filterCategories(getdata, searchQuery);

        if (loading) {
            return <Typography variant="h6">Loading...</Typography>;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={() => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Categories</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="/admin/category/create" className="add-btn hover-btn">Add New</a>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search" 
                                    value={searchQuery}
                                    onChange={(e) => this.handleSearchChange(e)} // Bind search input
                                />
                            </div>
                            <div className="input-group">
                                <select id="category" name="category" className="form-control">
                                    <option selected>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Search Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Categories</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Slug</th>
                                                <th scope="col">Created Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {error && <tr><td colSpan="3">{error}</td></tr>}
                                            {filteredData.length > 0 ? filteredData.map((category, index) => (
                                                <tr key={index}>
                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={category.id} /></td>
                                                    <td>{category.name}</td>
                                                    <td>{category.slug}</td>
                                                    <td>
                                                        <span className="delivery-time">{this.formatDate(category.createdAt)}</span>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3">No categories found.</td>
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
        );
    }
}
