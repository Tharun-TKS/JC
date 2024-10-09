// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationManager } from 'react-notifications';
// import { GetProductDetails, GetUserLogin, GetWishListDetails } from '../../../services'; // example path
// import './styles.css';

// class TagProduct extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             productlist: [],
//             isLoaded: false,
//             wishlist: [], // To store wishlist items
//             custId: null, // Initialize custId state
//             currentPage: 1,
//             itemsPerPage: 18, // Set the number of items per page
//             visiblePages: 10, // Number of page numbers to show at a time
//             pageGroupStart: 1, // Track the starting page number of the visible group
//             isMobile: window.innerWidth <= 768 // Detect mobile screen width
//         };
//     }

//     async componentDidMount() {
//         const { tag } = this.props.match.params; // Get the tag from URL parameters
     

//         const response = await GetProductDetails.getProductByTagSearch(tag);

//         if (response) {
//             this.setState({
//                 productlist: response.products, // Adjust based on your API response structure
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

//         // Add event listener for window resize
//         window.addEventListener('resize', this.updateIsMobile);
//     }

//     componentWillUnmount() {
//         // Remove event listener for window resize when the component unmounts
//         window.removeEventListener('resize', this.updateIsMobile);
//     }

//     updateIsMobile = () => {
//         this.setState({ isMobile: window.innerWidth <= 768 });
//     };

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

//     // Pagination Methods
//     handlePageChange = (pageNumber) => {
//         this.setState({ currentPage: pageNumber });
//     };

//     // Handle next page group
//     handleNextPageGroup = () => {
//         const { pageGroupStart, visiblePages, productlist, itemsPerPage } = this.state;
//         const totalPages = Math.ceil(productlist.length / itemsPerPage);

//         // Calculate the next group's start index
//         if (pageGroupStart + visiblePages <= totalPages) {
//             this.setState({ pageGroupStart: pageGroupStart + visiblePages });
//         }
//     };

//     // Handle previous page group
//     handlePreviousPageGroup = () => {
//         const { pageGroupStart, visiblePages } = this.state;

//         // Calculate the previous group's start index
//         if (pageGroupStart - visiblePages > 0) {
//             this.setState({ pageGroupStart: pageGroupStart - visiblePages });
//         }
//     };

//     render() {
//         const { productlist, isLoaded, wishlist, currentPage, itemsPerPage, visiblePages, pageGroupStart, isMobile } = this.state;

//         // Calculate the number of visible pages based on screen size
//         const maxVisiblePages = isMobile ? 5 : visiblePages;

//         // Calculate the index of the first and last product for the current page
//         const indexOfLastProduct = currentPage * itemsPerPage;
//         const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//         const currentProducts = productlist.slice(indexOfFirstProduct, indexOfLastProduct); // Slice the products based on the current page

//         // Calculate total pages
//         const totalPages = Math.ceil(productlist.length / itemsPerPage);

//         // Determine the page numbers to show
//         const pageNumbers = [];
//         for (let i = pageGroupStart; i < Math.min(pageGroupStart + maxVisiblePages, totalPages + 1); i++) {
//             pageNumbers.push(i);
//         }

//         const { tag } = this.props.match.params;

//         return (
//             <div>
//                 <section className="product-items-slider section-padding">
//                     <div className="container tagheader" id="header-category-bk">
//                         <div className="section-header text-center tag-section">
//                             <h2>Search Results - <span style={{ fontSize: '24px' }}>{tag}</span></h2>
//                             <br />
//                         </div>
//                         <div className="row justify-content-center">
//                             {!isLoaded ? (
//                                 <div className="progress-bar-bk">
//                                     <CircularProgress color="secondary" />
//                                 </div>
//                             ) : (
//                                 currentProducts.map((row, index) => (
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
//                                                     <i className="mdi mdi-cart-outline" /> View Product
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

//                     {/* Pagination Controls */}
//                     <div className="pagination-controls">
//                         <button
//                             className="arrow-button"
//                             onClick={this.handlePreviousPageGroup}
//                             disabled={pageGroupStart === 1}
//                         >
//                             &lt;
//                         </button>
//                         {pageNumbers.map((number) => (
//                             <button
//                                 key={number}
//                                 className={`page-button ${currentPage === number ? 'active' : ''}`}
//                                 onClick={() => this.handlePageChange(number)}
//                             >
//                                 {number}
//                             </button>
//                         ))}
//                         <button
//                             className="arrow-button"
//                             onClick={this.handleNextPageGroup}
//                             disabled={pageGroupStart + maxVisiblePages > totalPages}
//                         >
//                             &gt;
//                         </button>
//                     </div>
//                 </section>
//             </div>
//         );
//     }
// }

// export default withRouter(TagProduct);
// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { NotificationManager } from 'react-notifications';
// import { GetProductDetails, GetUserLogin, GetWishListDetails } from '../../../services'; // example path
// import './styles.css'

// class TagProduct extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             productlist: [],
//             isLoaded: false,
//             wishlist: [], // To store wishlist items
//             custId: null, // Initialize custId state
//             currentPage: 1,
//             itemsPerPage: 18, // Set the number of items per page
//         };
//     }

//     async componentDidMount() {
//         const { tag } = this.props.match.params; // Get the tag from URL parameters
//         console.log('Fetched tag from URL:', tag);

//         const response = await GetProductDetails.getProductByTagSearch(tag);

//         if (response) {
//             // Remove duplicates based on the 'id' field
//             const uniqueProducts = response.products.filter((product, index, self) =>
//                 index === self.findIndex(p => p.id === product.id) // Retain unique products by 'id'
//             );

//             this.setState({
//                 productlist: uniqueProducts, // Use filtered unique products
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

//     // Pagination Methods
//     handlePageChange = (pageNumber) => {
//         this.setState({ currentPage: pageNumber });
//     };

//     render() {
//         const { productlist, isLoaded, wishlist, currentPage, itemsPerPage } = this.state;

//         // Calculate the index of the first and last product for the current page
//         const indexOfLastProduct = currentPage * itemsPerPage;
//         const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//         const currentProducts = productlist.slice(indexOfFirstProduct, indexOfLastProduct); // Slice the products based on the current page

//         // Calculate total pages
//         const totalPages = Math.ceil(productlist.length / itemsPerPage);

//         return (
//             <div>
//                 <section className="product-items-slider section-padding" >
//                     <div className="container" id="header-category-bk" style={{ padding: '0 15px', paddingTop: "125px" }}>
//                         <div className="section-header text-center">
//                             <h2>Search Results</h2>
//                             <br />
//                         </div>
//                         <div className="row justify-content-center">
//                             {!isLoaded ? (
//                                 <div className="progress-bar-bk">
//                                     <CircularProgress color="secondary" />
//                                 </div>
//                             ) : (
//                                 currentProducts.map((row, index) => (
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
//                                                     <i className="mdi mdi-cart-outline" /> View Product
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

//                     {/* Pagination Controls */}
//                     <div className="container">
//                         <div className="pagination-controls">
//                             {Array.from({ length: totalPages }, (_, i) => (
//                                 <button
//                                     key={i + 1}
//                                     className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
//                                     onClick={() => this.handlePageChange(i + 1)}
//                                 >
//                                     {i + 1}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                 </section>
//             </div>
//         );
//     }
// }

// export default withRouter(TagProduct);
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationManager } from 'react-notifications';
import { GetProductDetails, GetUserLogin, GetWishListDetails } from '../../../services'; // example path
import './styles.css';

class TagProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: [],
            isLoaded: false,
            wishlist: [], // To store wishlist items
            custId: null, // Initialize custId state
            currentPage: 1,
            itemsPerPage: 18, // Set the number of items per page
            visiblePages: 10, // Number of page numbers to show at a time
            pageGroupStart: 1, // Track the starting page number of the visible group
            isMobile: window.innerWidth <= 768 // Detect mobile screen width
        };
    }

    async componentDidMount() {
        const { tag } = this.props.match.params; // Get the tag from URL parameters

        const response = await GetProductDetails.getProductByTagSearch(tag);
        
        // Remove duplicates by creating a Set based on product IDs
        const uniqueProducts = response ? response.products : [];
        const uniqueProductIds = new Set();
        const filteredProducts = uniqueProducts.filter(product => {
            if (!uniqueProductIds.has(product.id)) {
                uniqueProductIds.add(product.id);
                return true; // Keep the product
            }
            return false; // Discard duplicate product
        });

        this.setState({
            productlist: filteredProducts,
            isLoaded: true
        });

        let email = sessionStorage.getItem('email');
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ custId: user.data.id }); // Store the custId
            }
        }

        // Add event listener for window resize
        window.addEventListener('resize', this.updateIsMobile);
    }

    componentWillUnmount() {
        // Remove event listener for window resize when the component unmounts
        window.removeEventListener('resize', this.updateIsMobile);
    }

    updateIsMobile = () => {
        this.setState({ isMobile: window.innerWidth <= 768 });
    };

    toggleWishlist = (productId) => {
        const { wishlist } = this.state;
        const isProductInWishlist = wishlist.includes(productId);

        this.setState({ wishlist: isProductInWishlist 
            ? wishlist.filter(id => id !== productId) 
            : [...wishlist, productId] 
        });
    };

    handleAddToWishlistClick = async (productId) => {
        const { custId } = this.state;

        if (!custId) {
            NotificationManager.error('Please log in to add items to your wishlist.');
            return;
        }

        const data = { custId: custId, productId: productId };

        try {
            let result = await GetWishListDetails.addWishlistItem(data); // Call service function
            if (result) {
                NotificationManager.success('Added to wishlist!');
                this.toggleWishlist(productId); // Toggle wishlist after adding
            } else {
                NotificationManager.error('Product is already in your wishlist.');
            }
        } catch (error) {
            console.error('Error:', error);
            NotificationManager.error('An error occurred while adding to the wishlist.');
        }
    };

    // Pagination Methods
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    // Handle next page group
    handleNextPageGroup = () => {
        const { pageGroupStart, visiblePages, productlist, itemsPerPage } = this.state;
        const totalPages = Math.ceil(productlist.length / itemsPerPage);

        // Calculate the next group's start index
        if (pageGroupStart + visiblePages <= totalPages) {
            this.setState({ pageGroupStart: pageGroupStart + visiblePages });
        }
    };

    // Handle previous page group
    handlePreviousPageGroup = () => {
        const { pageGroupStart, visiblePages } = this.state;

        // Calculate the previous group's start index
        if (pageGroupStart - visiblePages > 0) {
            this.setState({ pageGroupStart: pageGroupStart - visiblePages });
        }
    };

    render() {
        const { productlist, isLoaded, wishlist, currentPage, itemsPerPage, visiblePages, pageGroupStart, isMobile } = this.state;

        // Calculate the number of visible pages based on screen size
        const maxVisiblePages = isMobile ? 5 : visiblePages;

        // Calculate the index of the first and last product for the current page
        const indexOfLastProduct = currentPage * itemsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
        const currentProducts = productlist.slice(indexOfFirstProduct, indexOfLastProduct); // Slice the products based on the current page

        // Calculate total pages
        const totalPages = Math.ceil(productlist.length / itemsPerPage);

        // Determine the page numbers to show
        const pageNumbers = [];
        for (let i = pageGroupStart; i < Math.min(pageGroupStart + maxVisiblePages, totalPages + 1); i++) {
            pageNumbers.push(i);
        }

        const { tag } = this.props.match.params;

        return (
            <div>
                <section className="product-items-slider section-padding">
                    <div className="container tagheader" id="header-category-bk">
                        <div className="section-header text-center tag-section">
                            <h2>Search Results for - <span style={{ fontSize: '24px', color:'darkblue', textTransform: 'capitalize' }}>{tag}</span></h2>
                            <br />
                        </div>
                        <div className="row justify-content-center">
                            {!isLoaded ? (
                                <div className="progress-bar-bk">
                                    <CircularProgress color="secondary" />
                                </div>
                            ) : (
                                currentProducts.map((row, index) => (
                                    <div key={index} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                        <div className="product" style={{ backgroundColor: "black" }}>
                                            <Link to={`/p/${row.id}`}>
                                                <div className="product-header">
                                                    <img crossOrigin='anonymous' className="img-fluid" src={row.photo} alt={row.name} />
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
                                                    <i className="mdi mdi-cart-outline" /> View Product
                                                </button>
                                                <i
                                                    className={`mdi ${wishlist.includes(row.id) ? 'mdi-heart' : 'mdi-heart-outline'} wishlist-icon`}
                                                    onClick={() => this.handleAddToWishlistClick(row.id)} 
                                                    style={{ cursor: 'pointer', marginLeft: '10px', color: 'gold' }} // Set color to gold for both
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination-controls">
                        <button
                            className="arrow-button"
                            onClick={this.handlePreviousPageGroup}
                            disabled={pageGroupStart === 1}
                        >
                            &lt;
                        </button>
                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                className={`page-button ${currentPage === number ? 'active' : ''}`}
                                onClick={() => this.handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            className="arrow-button"
                            onClick={this.handleNextPageGroup}
                            disabled={pageGroupStart + maxVisiblePages > totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(TagProduct);
