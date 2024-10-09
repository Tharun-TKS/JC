import React, { Component } from 'react';
import Bannerslider from '../banner-carousel';
import Topsavers from './top-section';
import Bestofferbanner from './best-offers-banner';
import Topstample from './top-stample';
import Topcategory from './tab-section';
import './style.css';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="fixed-banner">
                    <Bestofferbanner />
                </div>

                <Topcategory />
                <Topsavers />
                <Topstample />
            </div>
        );
    }
}
