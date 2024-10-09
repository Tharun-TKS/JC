import React, { Component } from 'react';
import './index.css'; // Ensure this imports the CSS file with the styles provided below
import { withRouter } from 'react-router-dom';
import { GetProductDetails } from '../../../../services';

class Bestofferbanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: '',
            productSuggestions: [], // To hold product suggestions
            allProducts: [], // Store all product data
            error: null,
        };

        this.suggestionsBoxRef = React.createRef(); // Create a ref for the suggestions box
    }

    // Fetch all products when the component mounts
    async componentDidMount() {
        try {
            const response = await GetProductDetails.getAllProductSearchList(); // Fetch product data from the service
            const products = response.products; // Access products array from response

            // Filter out duplicate products based on their id
            const uniqueProducts = this.removeDuplicateProducts(products);

            // Update the state with all unique products
            this.setState({ allProducts: uniqueProducts });
        } catch (err) {
            console.error(err); // Log error for debugging
            this.setState({ error: "Failed to fetch product details" });
        }

        // Event listener to hide suggestions on outside click
        document.addEventListener('click', this.handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    // Remove duplicates based on product id
    removeDuplicateProducts(products) {
        const productMap = {};
        products.forEach((product) => {
            // Ensure tags is a string and split it into an array
            product.tags = product.tags ? product.tags.split(',').map(tag => tag.trim()) : []; // Split and trim tags
            productMap[product.id] = product; // Overwrite duplicates based on id
        });
        return Object.values(productMap); // Return an array of unique products
    }

    // Handle input change for search box
    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ productId: value });

        if (value.length > 2) {
            // Filter products based on the search query
            const suggestions = this.getFilteredSuggestions(value);
            this.setState({ productSuggestions: suggestions });
        } else {
            this.setState({ productSuggestions: [] });
        }
    };

    // Filter product suggestions based on the search query
    getFilteredSuggestions(query) {
        const { allProducts } = this.state;
        return allProducts.filter((product) => {
            // Check if the product name includes the query
            const matchesName = product.name.toLowerCase().includes(query.toLowerCase());

            // Check if any of the tags include the query
            const matchesTags = Array.isArray(product.tags) && product.tags.some(tag =>
                tag.toLowerCase().includes(query.toLowerCase())
            );

            // Return true if either the name or tags match
            return matchesName || matchesTags;
        });
    }

    // Handle form submission and navigate to the product page or tag search
    handleSearch = (event) => {
        event.preventDefault();
        const { productId } = this.state;

        // Check if the productId is not empty and navigate accordingly
        if (productId) {
            // Redirect to /tagsearch/{typedText} page
            this.props.history.push(`/tagsearch/${productId}`);
        }
    };

    // Handle clicks outside the search and suggestions box
    handleClickOutside = (event) => {
        if (
            this.suggestionsBoxRef.current &&
            !this.suggestionsBoxRef.current.contains(event.target)
        ) {
            this.setState({ productSuggestions: [] }); // Hide suggestions box
        }
    };

    render() {
        const { productId, productSuggestions, error } = this.state;

        return (
            <div>
                <div className="section145">
                    <div className="text-center">
                        <img src="/img/banner.jpg" className="backbanner" alt="banner" />

                        {/* Search Box */}
                        <div className="search-container" style={{ position: 'relative' }}>
                            <form onSubmit={this.handleSearch} className="search-form">
                                <input
                                    type="text"
                                    placeholder="Search with Category, Tag & Product Name"
                                    className="search-box"
                                    value={productId}
                                    onChange={this.handleInputChange}
                                />
                                <button type="submit" className="search-btn">Search</button>
                            </form>

                            {/* Display suggestions */}
                            {productSuggestions.length > 0 && (
                                <div className="suggestions-box" ref={this.suggestionsBoxRef}>
                                    {productSuggestions.map((product) => (
                                        <div
                                            key={product.id}
                                            className="suggestion-item"
                                            onClick={() => this.props.history.push(`/p/${product.id}`)} // Navigate on click
                                        >
                                            <img
                                                src={product.photo} // Ensure the product has an image field
                                                alt={product.name}
                                                className="suggestion-img"
                                            />
                                            <div className="suggestion-content">
                                                <h4>{product.name}</h4>
                                                <p>{product.sortDesc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Display Error */}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Bestofferbanner);
