import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, incrementToCart, decreaseToCart } from "../../../../store/actions/cartActions";

class Cartsidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grandTotal: '',
            toggle: false,
            addedMessage: false, // Track if an item has been added
        };
    }

    componentDidUpdate(prevProps) {
        // Check if a new item has been added to the cart
        if (prevProps.cartItems.length < this.props.cartItems.length) {
            this.setState({ addedMessage: true });
            setTimeout(() => {
                this.setState({ addedMessage: false }); // Hide message after 3 seconds
            }, 3000);
        }
    }

    handleHide = () => {
        this.setState({ toggle: !this.state.toggle });
    };

    handleRemoveVariant = (productId, id) => {
        this.props.removeFromCart(productId, id);
    };

    handleRemoveProduct = (productId) => {
        this.props.removeFromCart(productId, null); // Pass null to indicate removal of the entire product
    };

    calculateSubTotal = () => {
        return this.props.cartItems.reduce((sum, item) => {
            if (Array.isArray(item.selectedVariants)) {
                return sum + item.selectedVariants.reduce((variantSum, variant) => {
                    return variantSum + (typeof variant.price === 'number' ? variant.price : 0);
                }, 0);
            }
            return sum;
        }, 0);
    };

    render() {
        const { cartItems } = this.props;
        const subTotal = this.calculateSubTotal();
        const deliveryCharges = subTotal * 0.00; // No additional charges
        let total = subTotal + deliveryCharges;
        let discount = 0;

        // Apply a 10% discount if the total cart value is more than ₹200
        if (total > 200) {
            discount = total * 0.10;
            total = total - discount;
        }

        return (
            <div>
                <span data-toggle="offcanvas" className="btn btn-link border-none">
                    <i className="mdi mdi-cart" /> <small className="cart-value">({cartItems.length})</small>
                </span>

                {/* Show overlay message if an item has been added */}
                {this.state.addedMessage && (
                    <div className="overlay">
                        <div className="message-box">
                            Item has been added to the cart!
                        </div>
                    </div>
                )}

                <div className="cart-sidebar">
                    <div className="bs-canvas-header side-cart-header p-3 ">
                        <div className="d-inline-block main-cart-title">My Cart <span>({cartItems.length} Items)</span></div>
                        <button type="button" className="bs-canvas-close close" data-toggle="offcanvas"><i className="mdi mdi-close"></i></button>
                    </div>
                    <div className="cart-sidebar-body">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="cart-product-img">
                                        <img crossOrigin="anonymous" className="img-fluid" src={item.photo} alt={item.name} />
                                    </div>
                                    <div className="cart-text">
                                        <h4>
                                            {item.name}
                                            <i
                                                className="mdi mdi-delete text-danger cursor-pointer"
                                                onClick={() => this.handleRemoveProduct(item.id)}
                                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                            />
                                        </h4>
                                        <div className="cart-radio">
                                            {item.selectedVariants && item.selectedVariants.length > 0 ? (
                                                item.selectedVariants.map((variant) => (
                                                    <div key={variant.id} className="d-flex align-items-center justify-content-between">
                                                        <span>{variant.name} (₹{variant.price})</span>
                                                        <i
                                                            className="mdi mdi-close-circle text-danger cursor-pointer"
                                                            onClick={() => this.handleRemoveVariant(item.id, variant.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No variants selected</p>
                                            )}
                                        </div>
                                        {item.selectedVariants && item.selectedVariants.length > 0 && (
                                            <div className="qty-group">
                                                <div className="cart-item-price">&#x20B9;{item.selectedVariants.reduce((acc, variant) => acc + variant.price, 0)}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )}
                    </div>
                    <div className="cart-sidebar-footer">
                        <div className="cart-store-details">
                            <p>Sub Total <strong className="float-right">&#x20B9;{subTotal.toFixed(2)}</strong></p>
                            {discount > 0 && (
                                <p>Discount (10%) <strong className="float-right text-success">-&#x20B9;{discount.toFixed(2)}</strong></p>
                            )}
                            <p>Total <strong className="float-right">&#x20B9;{total.toFixed(2)}</strong></p>
                        </div>
                        <a href="/checkout">
                            <button 
                                className="btn btn-secondary btn-lg btn-block text-left" 
                                type="button"
                                style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '10px',
                                    fontSize: '16px', // Ensure text size is consistent
                                    overflow: 'hidden', // Prevent overflow of text
                                }}
                            >
                                <span className="float-left" style={{ whiteSpace: 'nowrap' }}>
                                    <i className="mdi mdi-cart-outline" /> 
                                    Proceed to Checkout 
                                </span>
                                <span className="float-right" style={{ whiteSpace: 'nowrap' }}>
                                    <strong>&#x20B9;{total.toFixed(2)}</strong> 
                                    <span className="mdi mdi-chevron-right" />
                                </span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
    incrementToCart,
    decreaseToCart,
    removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cartsidebar);
