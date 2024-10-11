import React, { Component } from 'react';
//import './aboutus.css'; // Optional: Include your custom CSS for styles
import CircularProgress from '@material-ui/core/CircularProgress';

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,  // Assuming the content is static and will not require loading
        };
    }

    render() {
        const { isLoaded } = this.state;

        return (
            <div>
                <section className="about-us section-padding">
                    <div className="container" style={{ padding: '0 5px' }}>
                        <div className="section-header text-center">
                            <h2>About Us</h2>
                            <br />
                        </div>
                        <div className="row justify-content-center">
                            {!isLoaded ? (
                                <div className="progress-bar-bk">
                                    <CircularProgress color="secondary" />
                                </div>
                            ) : (
                                <div className="col-12">
                                    <div className="about-content">
                                        <h5>About Us</h5>
                                        <p>
                                            At JC Creations, we are dedicated to delivering an exceptional online shopping experience for our valued customers. Our expansive collection of designers and designs is continually expanding, offering a diverse selection of creative embroidery designs at competitive prices. We take pride in the global recognition our designs have garnered, a testament to the passionate craftsmanship of our exemplary design team.

                                            For those seeking a more personalized touch, JC Creations also provides custom-made embroidery designs. Thank you for exploring our website, and we trust that you will discover a design that resonates with you. Your feedback is important to us; please feel free to reach out via email or contact us with any questions or inquiries.
                                        </p>
                                        <h5>Our Mission</h5>
                                        <p>
                                            Our mission is to create innovative, sustainable, and user-friendly products that enhance the lives of our customers.
                                        </p>
                                        <h5>Our Vision</h5>
                                        <p>
                                            We strive to be a leader in our industry by continuously improving our offerings and delivering unparalleled value to our customers, partners, and communities.
                                        </p>
                                        <h5>Contact us</h5>
                                        <p>
                                            <h2> Phone:   918310726160
                                                Email:   jc.creations99@gmail.com</h2>
                                            Address:   JC Creations, Yelahanka, Bangalore-560064, India
                                            **   We would love to hear your suggestions or comments about our website.
                                            If you have any problem regarding the download of an order, please contact us with your order details, so we can assist you as soon as possible..
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AboutUs;
