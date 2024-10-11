import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // Import withRouter
import { GetUserLogin, GetWishListDetails } from '../../../../services';
import '../css/index.css';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userId: '',
            wishlist: [],
            isLoaded: false,  // Track loading state
        };
    }

    async componentDidMount() {
        let email = sessionStorage.getItem('email');
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data, userId: value.data.id }, async () => {
                    // Fetch wishlist items after setting userId
                    const response = await GetWishListDetails.getWishlistItems(this.state.userId);
                    console.log(response);
                    if (response) {
                        this.setState({
                            wishlist: this.getUniqueProducts(response.data), // Get unique products
                            isLoaded: true,
                        });
                    } else {
                        this.setState({
                            isLoaded: true,
                        });
                    }
                });
            }
        }
    }

    // Method to filter unique products based on product ID
    getUniqueProducts(products) {
        const uniqueProducts = {};
        products.forEach(product => {
            uniqueProducts[product.id] = product; // Use product ID as key to ensure uniqueness
        });
        return Object.values(uniqueProducts); // Return unique products as an array
    }

    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    };

    handleRemoveItem = async (productId) => {
        const { userId } = this.state;
        const data = { custId: userId, productId: productId };
        // Call the service to remove the item from the wishlist
        const response = await GetWishListDetails.removeWishlistItem(data);
        if (response) {
            // Update the wishlist state to remove the item
            this.setState(prevState => ({
                wishlist: prevState.wishlist.filter(item => item.productId !== productId),
            }));
        }
    };

    handleNavigateToProduct = (productId) => {
        this.props.history.push(`/p/${productId}`); // Navigate to product detail page
    };

    render() {
        let { user, wishlist, isLoaded } = this.state;

        // Extract unique products based on productId
        const uniqueProducts = [];
        const productIds = new Set();

        wishlist.forEach(item => {
            if (!productIds.has(item.productId)) {
                productIds.add(item.productId);
                uniqueProducts.push(item);
            }
        });

        return (
            <div className="wrapper" style={{ marginBottom: "100px" }}>
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
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
                                        <img src="/img/avatar/img-5.jpg" alt />
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
                <div className>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="left-side-tabs">
                                    <div className="dashboard-left-links">
                                        <a href="/account/view" className="user-item "><i className="uil uil-apps" />Overview</a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />Downloads</a>
                                        <a href="/account/wishlist" className="user-item active"><i className="uil uil-heart" />Shopping Wishlist</a>
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
                                                <h4><i className="uil uil-heart" />Shopping Wishlist</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="wishlist-body-dtt">
                                                    {uniqueProducts.length > 0 ? (
                                                        uniqueProducts.map(item => (
                                                            <div className="cart-item" key={item.id} onClick={() => this.handleNavigateToProduct(item.productId)}> {/* Navigate on click */}
                                                                <div className="cart-product-img">
                                                                <h4>{item.product.name}</h4>
                                                                    <img crossOrigin='anonymous' src={item.product.photo} alt={item.product.name} />
                                                                </div>
                                                                <div className="cart-text">
                                                                    
                                                                    {/* <div className="cart-item-price">{item.product.height}</div> */}
                                                                    <button type="button" className="cart-close-btn" onClick={(e) => { e.stopPropagation(); this.handleRemoveItem(item.productId); }}>
                                                                        <i className="uil uil-trash-alt" style={{color: "red"}} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div>No items in your wishlist.</div>
                                                    )}
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
        )
    }
}

// Wrap the component with withRouter to gain access to the history prop
export default withRouter(Wishlist);
