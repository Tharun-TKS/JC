import React, { Component } from "react";
import {
  GetProductDetails,
  GetCategoryDetails,
  GetUserLogin,
  GetWishListDetails,
} from "../../../services";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";

class Productview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      categorybyproduct: [],
      subcategories: [],
      isloaded: false,
      toggle: false,
      wishlist: [], // State for wishlist items
      custId: null, // Initialize custId state
      isMobileView: window.innerWidth <= 786,
    };
  }

  async getFilterByProduct() {
    this.setState({ isloaded: false });

    const { id } = this.props.match.params;

    if (id) {
      try {
        const filter = `result/${id}`; // Adjust this line based on your actual API structure
        const p = await GetProductDetails.getProductByFilter(filter);
        if (p) {
          this.setState({ list: p.data, isloaded: true });
        }
      } catch (e) {
        NotificationManager.error("Empty data in category", "Data");
        this.setState({ isloaded: true });
      }
    } else {
      this.fetchDefaultProducts();
    }
  }

  async fetchDefaultProducts() {
    try {
      const p = await GetProductDetails.getAllProducts();
      if (p) {
        this.setState({ list: p.data, isloaded: true });
      }
    } catch (e) {
      this.setState({ isloaded: true });
    }
  }

  async fetchSubCategories() {
    try {
      const subcategories =
        await GetCategoryDetails.getAllCategorySubCategoryList();
      if (subcategories) {
        this.setState({ subcategories: subcategories.data, isloaded: true });
      } else {
        NotificationManager.error("Failed to fetch subcategories.");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      NotificationManager.error("Error fetching subcategories.");
    }
  }

  async fetchProductsByCategory(categoryId) {
    try {
      const p = await GetProductDetails.getProductByCategory(categoryId);

      if (p) {
        this.setState({ list: p.data, isloaded: true });
      } else {
        NotificationManager.error("No products found for this category.");
        this.setState({ isloaded: true });
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
      NotificationManager.error("Error fetching products by category.");
      this.setState({ isloaded: true });
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    const queryParams = new URLSearchParams(this.props.location.search);
    const categoryId = queryParams.get("categoryId");
    this.fetchProductsByCategory(categoryId);
    this.fetchSubCategories();

    let email = sessionStorage.getItem("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ custId: user.data.id }); // Store the custId
      }
    }
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Remove resize listener when component is unmounted
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // Check if the screen width is <= 786px and update the state
    this.setState({ isMobileView: window.innerWidth <= 786 });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getFilterByProduct();
    }
  }

  handleAddToCartClick = (product) => {
    this.props.history.push(`/p/${product.id}`);
  };

  async handleFilterCategory(subcategory) {
    this.setState({ categorybyproduct: [], isloaded: false, toggle: true });

    try {
      const category = await GetProductDetails.getProductByCategory(
        subcategory.id
      );

      if (category) {
        this.setState({
          categorybyproduct: category.data,
          isloaded: true,
        });

        const element = document.getElementById("collapseOne");
        if (element.classList.contains("show")) {
          element.classList.remove("show"); // Collapse the sidebar
        }
      } else {
        NotificationManager.error("Empty data in category", "Undefined");
      }
    } catch (error) {
      NotificationManager.error("Error fetching products by category.");
      this.setState({ isloaded: true }); // Set loaded state to true even if there's an error
    }
  }

  toggleWishlist = (productId) => {
    const { wishlist } = this.state;
    const isProductInWishlist = wishlist.includes(productId);

    if (isProductInWishlist) {
      this.setState({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      this.setState({ wishlist: [...wishlist, productId] });
    }
  };

  handleAddToWishlistClick = async (productId) => {
    const { custId } = this.state;

    if (!custId) {
      NotificationManager.error("Please log in to add items to your wishlist.");
      return;
    }

    const data = { custId: custId, productId: productId };

    try {
      let result = await GetWishListDetails.addWishlistItem(data); // Call service function
      if (result) {
        NotificationManager.success("Added to wishlist!");
        this.toggleWishlist(productId); // Toggle wishlist after adding
      } else {
        NotificationManager.error("Product is already in your wishlist.");
      }
    } catch (error) {
      console.error("Error:", error);
      NotificationManager.error(
        "An error occurred while adding to the wishlist."
      );
    }
  };

  render() {
    const {
      list,
      subcategories,
      categorybyproduct,
      toggle,
      isloaded,
      wishlist,
      isMobileView,
    } = this.state;

    return (
      <div>
        <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a href="#">
                  <strong>
                    <span className="mdi mdi-home" /> <a href="/">Home </a>
                  </strong>
                </a>{" "}
                <span className="mdi mdi-chevron-right" />{" "}
                <a href="#">Categories</a>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-list section-padding">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="shop-filters">
                  <div id="accordion">
                    <div className="card">
                      <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link"
                            data-toggle={isMobileView ? "collapse" : ""}
                            data-target={isMobileView ? "#collapseOne" : ""}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            All Category{" "}
                            <span className="mdi mdi-chevron-down float-right" />
                          </button>
                        </h5>
                      </div>
                      <div
                        id="collapseOne"
                        className={
                          isMobileView ? "collapse show" : "show" // Collapse only in mobile view
                        }
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body card-shop-filters">
                          {isloaded
                            ? subcategories.map((subcategory, index) => (
                                <div className="card-body" key={index}>
                                  <div className="list-group">
                                    <span
                                      className="list-group-item list-group-item-action"
                                      onClick={() =>
                                        this.handleFilterCategory(subcategory)
                                      }
                                    >
                                      {subcategory.name}
                                    </span>
                                  </div>
                                </div>
                              ))
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-9">
                <div className="shop-head">
                  <h5 className="mb-3">Categories</h5>
                </div>
                {!isloaded ? (
                  <div className="progress-bar-bk">
                    <CircularProgress color="secondary" />
                    <div>Loading products...</div> {/* Loading message */}
                  </div>
                ) : toggle ? (
                  <div className="row no-gutters">
                    {categorybyproduct.length ? (
                      categorybyproduct.map((row, index) => (
                        <div key={index} className="col-md-4">
                          <div className="item">
                            <div
                              className="product"
                              style={{ backgroundColor: "black" }}
                            >
                              <Link
                                to={{
                                  pathname: `/p/${row.id}`,
                                  state: row,
                                }}
                              >
                                <div className="product-header">
                                  <img
                                    crossOrigin="anonymous"
                                    className="img-fluid"
                                    src={row.photo}
                                    alt={row.name}
                                  />
                                </div>
                              </Link>
                              <div className="product-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm float-right"
                                  onClick={() => this.handleAddToCartClick(row)}
                                >
                                  <i className="mdi mdi-cart-outline" /> View
                                  Product
                                </button>
                                <i
                                  className={`mdi ${
                                    wishlist.includes(row.id)
                                      ? "mdi-heart"
                                      : "mdi-heart-outline"
                                  } wishlist-icon`}
                                  onClick={() =>
                                    this.handleAddToWishlistClick(row.id)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "gold",
                                  }} // Set color to gold for both
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-danger">
                        No products found in this category.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="row no-gutters">
                    {list.length ? (
                      list.map((row, index) => (
                        <div key={index} className="col-md-4">
                          <div className="item">
                            <div
                              className="product"
                              style={{ backgroundColor: "black" }}
                            >
                              <Link
                                to={{
                                  pathname: `/p/${row.id}`,
                                  state: row,
                                }}
                              >
                                <div className="product-header">
                                  <img
                                    crossOrigin="anonymous"
                                    className="img-fluid"
                                    src={row.photo}
                                    alt={row.name}
                                  />
                                </div>
                              </Link>
                              <div className="product-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm float-right"
                                  onClick={() => this.handleAddToCartClick(row)}
                                >
                                  <i className="mdi mdi-cart-outline" /> View
                                  Product
                                </button>
                                <i
                                  className={`mdi ${
                                    wishlist.includes(row.id)
                                      ? "mdi-heart"
                                      : "mdi-heart-outline"
                                  } wishlist-icon`}
                                  onClick={() =>
                                    this.handleAddToWishlistClick(row.id)
                                  }
                                  style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                    color: "gold",
                                  }} // Set color to gold for both
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-danger">No products found.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(null, mapDispatchToProps)(Productview);
