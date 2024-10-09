import React, { Component } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
export default class Category extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        };
        return (
            <div style={{ background: '#fff' }}>
                <div className="container" id="header-category-bk">
                    <Slider {...settings}>
                        <div className="item">
                            <div className="category-item">
                                <Link to={{
                                    pathname: `/shop/grocery-staples`,
                                }}>
                                    <img className="img-fluid" src="img/category/belt.jpg" alt="grocery-stamples" />
                                    <h6>BELT</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                                <Link to={{
                                    pathname: `/shop/personal-care`,
                                }}>
                                    <img className="img-fluid" src="img/category/blouse.jpg" alt="personalcare" />
                                    <h6>BLOUSE</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                                <Link to={{
                                    pathname: `/shop/household-items`,
                                }}>
                                    <img className="img-fluid" src="img/category/buti.jpg" alt="household-imtes" />
                                    <h6>BUTI</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                                <Link to={{
                                    pathname: `/shop/home-kitchen`,
                                }}>
                                    <img className="img-fluid" src="img/category/dress.jpg" alt="kitchen" />
                                    <h6>DRESS</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                                <Link to={{
                                    pathname: `/shop/beverages`,
                                }}>
                                    <img className="img-fluid" src="img/category/jents.jpg" alt="beverages" />
                                    <h6>GENTS</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                            <Link to={{
                                    pathname: `/shop/breakfast-dairy`,
                                }}>
                                    <img className="img-fluid" src="img/category/kids&neck.jpg" alt="breakfastdairy" />
                                    <h6>KIDS &amp; NECK</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                            <Link to={{
                                    pathname: `/shop/biscuits-snacks-chocolates`,
                                }}>
                                    <img className="img-fluid" src="img/category/kurtis.jpg" alt="biscuits-snacks-chocklates" />
                                    <h6>KURTIS</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                            <Link to={{
                                    pathname: `/shop/noodles-sauces-instant-food`,
                                }}>
                                     <img className="img-fluid" src="img/category/pullajada.jpg" alt="noodles" />
                                    <h6>POOLA &amp; JADA</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                            <Link to={{
                                    pathname: `/shop/pet-care`,
                                }}>
                                     <img className="img-fluid" src="img/category/sareepallu&border.jpg" alt="pet-care" />
                                     <h6>SAREE PALLU &amp; BORDERS</h6>
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="category-item">
                            <Link to={{
                                    pathname: `/shop/baby-care`,
                                }}>
                                     <img className="img-fluid" src="img/category/offersdesign.jpg" alt="baby-care" />
                                     <h6>OFFER &amp; DESIGNS</h6>
                                </Link>
                            </div>
                        </div>
                    </Slider >
                </div>
            </div >
        )
    }
}
