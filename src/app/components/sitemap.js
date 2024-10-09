import React, { Component } from 'react';
//import './sitemap.css';

export default class Sitemap extends Component {
    render() {
        return (
            <div className="sitemap-container">
                <h1 className="sitemap-header">Site Map</h1>
                <div className="sitemap-section">
                    <h2 className="sitemap-title">Categories</h2>
                    <ul className="category-list">
                        <li>BELT</li>
                        <li>BLOUSE</li>
                        <li>3D EMBOSSED</li>
                        <li>ALLOVER</li>
                        {/* Add other categories similarly */}
                    </ul>
                    <h2 className="sitemap-title">Subcategories</h2>
                    <ul className="subcategory-list">
                        <li>3D FLOWER</li>
                        <li>ANIMALS</li>
                        <li>BIRD</li>
                        <li>BUNCH</li>
                        {/* Add other subcategories similarly */}
                    </ul>
                </div>
                <div className="sitemap-section">
                    <h2 className="sitemap-title">Special Offers</h2>
                    <ul>
                        <li>Offer Designs</li>
                    </ul>
                </div>
                <div className="sitemap-section">
                    <h2 className="sitemap-title">My Account</h2>
                    <ul>
                        <li>Account Information</li>
                        <li>Password</li>
                        <li>Address Book</li>
                        <li>Order History</li>
                        <li>Downloads</li>
                        <li>Shopping Cart</li>
                        <li>Checkout</li>
                    </ul>
                </div>
                <div className="sitemap-section">
                    <h2 className="sitemap-title">Information</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Delivery Information</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Returns & Cancellation</li>
                        <li>Pricing</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
        );
    }
}
