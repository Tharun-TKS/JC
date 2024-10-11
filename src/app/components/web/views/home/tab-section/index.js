// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationManager } from 'react-notifications';
// import { GetProductDetails, GetUserLogin, GetWishListDetails } from '../../../../services'; // example path
// //import './slider.css'; // Optional: Include your custom CSS for styles

// class Topcategory extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             productlist: [],
//             isLoaded: false,
//             wishlist: [], // To store wishlist items
//             custId: null // Initialize custId state
//         };
//     }

//     async componentDidMount() {
//         const limit = '20'; // Replace with actual category ID
//         const response = await GetProductDetails.getNewArrivals(limit);
//         console.log(response)

//         if (response) {
//             this.setState({
//                 productlist: response.products,
//                 isLoaded: true
//             });
//         } else {
//             this.setState({
//                 isLoaded: true
//             });
//         }

//         let email = sessionStorage.getItem('email');
//         if (email) {
//             let user = await GetUserLogin.getCustomerDetail(email);
//             if (user) {
//                 this.setState({ custId: user.data.id }); // Store the custId
//             }
//         }
//     }

//     toggleWishlist = (productId) => {
//         const { wishlist } = this.state;
//         const isProductInWishlist = wishlist.includes(productId);

//         if (isProductInWishlist) {
//             this.setState({ wishlist: wishlist.filter(id => id !== productId) });
//         } else {
//             this.setState({ wishlist: [...wishlist, productId] });
//         }
//     };

//     handleAddToWishlistClick = async (productId) => {
//         const { custId } = this.state;

//         if (!custId) {
//             NotificationManager.error('Please log in to add items to your wishlist.');
//             return;
//         }

//         const data = { custId: custId, productId: productId };

//         try {
//             let result = await GetWishListDetails.addWishlistItem(data); // Call service function
//             if (result) {
//                 NotificationManager.success('Added to wishlist!');
//                 this.toggleWishlist(productId); // Toggle wishlist after adding
//             } else {
//                 NotificationManager.error('Product is already in your wishlist.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             NotificationManager.error('An error occurred while adding to the wishlist.');
//         }
//     };

//     render() {
//         const { productlist, isLoaded, wishlist } = this.state;
       

//         return (
//             <div>
//                 <section className="product-items-slider section-padding">
//                     <div className="container" id="header-category-bk" style={{ padding: '0 15px' }}>
//                         <div className="section-header text-center">
//                             <h2>New Arrivals</h2>
//                             <br />
//                         </div>
//                         <div className="row justify-content-center">
//                             {!isLoaded ? (
//                                 <div className="progress-bar-bk">
//                                     <CircularProgress color="secondary" />
//                                 </div>
//                             ) : (
//                                 productlist.map((row, index) => (
//                                     <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
//                                         <div className="product" style={{ backgroundColor: "black" }}>
//                                             <Link to={`/p/${row.id}`}>
//                                                 <div className="product-header">
//                                                     <img crossOrigin='anonymous' className="img-fluid" src={row.photo} alt={row.name} />
//                                                 </div>
//                                                 <div className="product-body">
//                                                     <h6 style={{ display: "none" }}>
//                                                         <strong>
//                                                             <span className="mdi mdi-approval" /> Code
//                                                         </strong> - {row.slug}
//                                                     </h6>
//                                                 </div>
//                                             </Link>
//                                             <div className="product-footer">
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-secondary btn-sm float-right"
//                                                     onClick={() => this.handleAddToCartClick(row)}
//                                                 >
//                                                      View Product
//                                                 </button>
//                                                 <i
//                                                     className={`mdi ${wishlist.includes(row.id) ? 'mdi-heart' : 'mdi-heart-outline'} wishlist-icon`}
//                                                     onClick={() => this.handleAddToWishlistClick(row.id)} 
//                                                     style={{ cursor: 'pointer', marginLeft: '10px', color: 'gold' }} // Set color to gold for both
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         );
//     }
// }

// export default withRouter(Topcategory);



import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationManager } from 'react-notifications';
import { GetProductDetails, GetUserLogin, GetWishListDetails } from '../../../../services'; // example path

class Topcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: [],
            isLoaded: false,
            wishlist: [],
            custId: null
        };
    }

    async componentDidMount() {
        const limit = '25'; // Fetching 20 new arrivals
        const response = await GetProductDetails.getNewArrivals(limit);

        if (response) {
            // Remove duplicate products based on 'id'
            const uniqueProducts = response.products.filter((product, index, self) =>
                index === self.findIndex((p) => p.id === product.id)
            );

            // Limit the products to 8 items
            const limitedProducts = uniqueProducts.slice(0, 8);

            this.setState({
                productlist: limitedProducts,
                isLoaded: true
            });
        } else {
            this.setState({
                isLoaded: true
            });
        }

        let email = sessionStorage.getItem('email');
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ custId: user.data.id });
            }
        }
    }

    toggleWishlist = (productId) => {
        const { wishlist } = this.state;
        const isProductInWishlist = wishlist.includes(productId);

        if (isProductInWishlist) {
            this.setState({ wishlist: wishlist.filter(id => id !== productId) });
        } else {
            this.setState({ wishlist: [...wishlist, productId] });
        }
    };

    handleAddToWishlistClick = async (productId) => {
        const { custId } = this.state;

        if (!custId) {
            NotificationManager.error('Please log in to add items to your wishlist.');
            return;
        }

        const data = { custId: custId, productId: productId };

        try {
            let result = await GetWishListDetails.addWishlistItem(data); 
            if (result) {
                NotificationManager.success('Added to wishlist!');
                this.toggleWishlist(productId);
            } else {
                NotificationManager.error('Product is already in your wishlist.');
            }
        } catch (error) {
            console.error('Error:', error);
            NotificationManager.error('An error occurred while adding to the wishlist.');
        }
    };

    render() {
        const { productlist, isLoaded, wishlist } = this.state;

        return (
            <div>
                <section className="product-items-slider section-padding">
                    <div className="container" id="header-category-bk" style={{ padding: '0 15px' }}>
                        <div className="section-header text-center">
                            <h2>New Arrivals</h2>
                            <br />
                        </div>
                        <div className="row justify-content-center">
                            {!isLoaded ? (
                                <div className="progress-bar-bk">
                                    <CircularProgress color="secondary" />
                                </div>
                            ) : (
                                productlist.map((row, index) => (
                                    <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                        <div className="product" style={{ backgroundColor: "black" }}>
                                            <Link to={`/p/${row.id}`}>
                                                <div className="product-header">
                                                    <img crossOrigin='anonymous' className="img-fluid" src={row.photo} alt={row.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/>
                                                </div>
                                                <div className="product-body">
                                                    <h6 style={{ display: "none" }}>
                                                        <strong>
                                                            <span className="mdi mdi-approval" /> Code
                                                        </strong> - {row.slug}
                                                    </h6>
                                                </div>
                                            </Link>
                                            <div className="product-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-sm float-right"
                                                    onClick={() => this.handleAddToCartClick(row)}
                                                >
                                                     View Product
                                                </button>
                                                <i
                                                    className={`mdi ${wishlist.includes(row.id) ? 'mdi-heart' : 'mdi-heart-outline'} wishlist-icon`}
                                                    onClick={() => this.handleAddToWishlistClick(row.id)} 
                                                    style={{ cursor: 'pointer', marginLeft: '10px', color: 'gold' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(Topcategory);
