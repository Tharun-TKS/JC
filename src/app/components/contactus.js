import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            enquiry: '',
            isLoading: false, // State to manage the loading indicator
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });

        // Simulate a network request for form submission
        setTimeout(() => {
            console.log('Form submitted:', this.state);
            this.setState({ isLoading: false, name: '', email: '', enquiry: '' }); // Reset form and hide loader
        }, 2000); // Simulate 2 seconds delay
    };

    render() {
        const { name, email, enquiry, isLoading } = this.state;

        return (
            <div className="contact-us-container" style={{ padding: '20px' }}>
                <h2>Contact Us</h2>
                <div className="contact-details" style={{ marginBottom: '20px' }}>
                    <h4>Our Location</h4>
                    <p>JC Creations</p>
                    <p>36/2, Narayanappa Layout,</p>
                    <p>Ramagondanahalli,</p>
                    <p>Yelahanka, Bengaluru-560064.</p>
                    <p><strong>Telephone:</strong> +91 83107 26160</p>
                </div>

                <div className="contact-form">
                    <h4>Contact Form</h4>
                    {isLoading ? (
                        <div className="loading-indicator" style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <CircularProgress color="secondary" />
                        </div>
                    ) : (
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>E-Mail Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Enquiry</label>
                                <textarea
                                    name="enquiry"
                                    value={enquiry}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        );
    }
}

export default ContactUs;
