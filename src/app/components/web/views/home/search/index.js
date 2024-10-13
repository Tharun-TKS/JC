import React, { Component } from 'react';
import './index.css'; // Ensure this imports the CSS file with the styles provided below
import { withRouter } from 'react-router-dom';
import { GetProductDetails } from '../../../../services';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: '',
            productSuggestions: [],
            allProducts: [],
            error: null,
        };

        this.suggestionsBoxRef = React.createRef();
    }

    async componentDidMount() {
        try {
            const response = await GetProductDetails.getAllProductSearchList();
            const products = response.products;
            const uniqueProducts = this.removeDuplicateProducts(products);
            this.setState({ allProducts: uniqueProducts });
        } catch (err) {
            console.error(err);
            this.setState({ error: "Failed to fetch product details" });
        }
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    removeDuplicateProducts(products) {
        const productMap = {};
        products.forEach((product) => {
            product.tags = product.tags ? product.tags.split(',').map(tag => tag.trim()) : [];
            productMap[product.id] = product;
        });
        return Object.values(productMap);
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ productId: value });

        if (value.length > 2) {
            const suggestions = this.getFilteredSuggestions(value);
            this.setState({ productSuggestions: suggestions });
        } else {
            this.setState({ productSuggestions: [] });
        }
    };

    getFilteredSuggestions(query) {
        const { allProducts } = this.state;
        return allProducts.filter((product) => {
            const matchesName = product.name.toLowerCase().includes(query.toLowerCase());
            const matchesTags = Array.isArray(product.tags) && product.tags.some(tag =>
                tag.toLowerCase().includes(query.toLowerCase())
            );
            return matchesName || matchesTags;
        });
    }

    handleSearch = (event) => {
        event.preventDefault();
        const { productId } = this.state;
        if (productId) {
            this.props.history.push(`/tagsearch/${productId}`);
        }
    };

    handleClickOutside = (event) => {
        if (
            this.suggestionsBoxRef.current &&
            !this.suggestionsBoxRef.current.contains(event.target)
        ) {
            this.setState({ productSuggestions: [] });
        }
    };

    render() {
        const { productId, productSuggestions, error } = this.state;

        return (
            <div>
                <div className="search-section145 searchbottom">
                    <div className="search-text-center">

                        <div className="search-search-container" style={{ position: 'relative' }}>
                            <form onSubmit={this.handleSearch} className="search-search-form">
                                <input
                                    type="text"
                                    placeholder="Search with Category, Tag & Product Name"
                                    className="search-search-box"
                                    value={productId}
                                    onChange={this.handleInputChange}
                                />
                                <button type="submit" className="search-search-btn">Search</button>
                            </form>

                            {productSuggestions.length > 0 && (
                                <div className="search-suggestions-box" ref={this.suggestionsBoxRef}>
                                    {productSuggestions.map((product) => (
                                        <div
                                            key={product.id}
                                            className="search-suggestion-item"
                                            onClick={() => this.props.history.push(`/p/${product.id}`)}
                                        >
                                            <img
                                                src={product.photo}
                                                alt={product.name}
                                                className="search-suggestion-img"
                                            />
                                            <div className="search-suggestion-content">
                                                <h4>{product.name}</h4>
                                                <p>{product.sortDesc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {error && <p className="search-error-message">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
