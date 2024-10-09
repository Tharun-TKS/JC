import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Footer from '../footer';
import Home from '../web/views/home';
import Productview from '../web/views/product';
import Singleproduct from './views/single-product';
import PrivateRoute from '../PrivateRoute';
import Checkout from './views/checkout';
import Shopdetails from './views/shop-details';
import Login from './views/checkout/login';
import Register from './views/checkout/register';
import NotFound from '../../NotFound';
import Complete from './views/checkout/complete';
import Account from './views/account';
import Failed from './views/checkout/failed';
import AboutUs from '../../components/aboutus';
import ContactUs from '../../components/contactus';  // Adjust the path based on your project structure
import Sitemap from '../../components/sitemap'; // Import Sitemap component
import PrivacyPolicy from '../../components/privacypolicy'; // Ensure the path is correct
import TermsAndConditions from '../../components/termsandconditions'; // Ensure the path is correct
import Wishlist from './views/account/wishlist';
import Pricing from '../../components/pricing'; // Import the Pricing component
import ReturnsAndCancellation from '../returnsandcancelations';
import tagproduct from './views/tagproduct';




export default class rootRoutes extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/p/:id' component={Singleproduct} />
                    <Route exact path='/tagsearch/:tag' component={tagproduct} />
                    <Route exact path='/shop/:slug' component={Shopdetails} />
                    <PrivateRoute path='/checkout' component={Checkout} />
                    <Route path='/product/catalogsearch/result' component={Productview} />
                    <PrivateRoute path='/order/success' component={Complete} />
                    <PrivateRoute path='/order/failed' component={Failed} />
                    <Route exact path='/wishlist' component={Wishlist} />
                    <PrivateRoute path='/account' component={Account} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/about-us' component={AboutUs} />
                    <Route exact path='/contact-us' component={ContactUs} />
                    <Route exact path='/sitemap' component={Sitemap} /> {/* Add this line */}
                    <Route exact path='/privacy-policy' component={PrivacyPolicy} />
                    <Route path="/pricing" component={Pricing} />
                    <Route path="/returnsandcancellation" component={ReturnsAndCancellation} />

                    <Route exact path='/terms-and-conditions' component={TermsAndConditions} />
                    <Route component={NotFound} />

                    {/* Dynamic Route for Category or Subcategory */}
                    <Route
                        path="/products"
                        render={(props) => {
                            const queryParams = new URLSearchParams(props.location.search);
                            const categoryId = queryParams.get('categoryId');
                            const subcategoryId = queryParams.get('subcategoryId');
                            return (
                                <Productview
                                    categoryId={categoryId}
                                    subcategoryId={subcategoryId}
                                    {...props}
                                />
                            );
                        }}
                    />

                    {/* Catch-all Route for 404 */}
                    <Route path="*" component={() => <div>404 Not Found</div>} />

                </Switch>
                <Footer />

            </div>
        )
    }
}
