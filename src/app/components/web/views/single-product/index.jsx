import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Slider from "react-slick";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { GetProductDetails } from "../../../services";
import { Link } from "react-router-dom"; // Import Link
import "react-image-lightbox/style.css"; // Import Lightbox styles
import Lightbox from "react-image-lightbox";
import "./index.css";

class Singleproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedVariants: [],
      totalMoney: 0,
      isOpen: false, // State for lightbox
      photoIndex: 0, // Current image index
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let url = window.location.href.split("/");
    let lastSegment = url.pop() || url.pop();
    const productId = parseInt(lastSegment, 10);

    const response = await GetProductDetails.getProductById(productId);
    console.log(response);

    if (response && response.success) {
      this.setState({ product: response.data });
    }
  }

  handleCheckboxChange = (event, variant) => {
    const { checked } = event.target;
    this.setState((prevState) => {
      const selectedVariants = checked
        ? [...prevState.selectedVariants, variant]
        : prevState.selectedVariants.filter((v) => v.id !== variant.id);

      const totalMoney = selectedVariants.reduce(
        (acc, curr) => acc + curr.variantPrice,
        0
      );
      return { selectedVariants, totalMoney };
    });
  };

  handleAddToCart = () => {
    if (this.state.selectedVariants.length === 0) {
      alert(
        "Please select at least one machine variant before adding to cart."
      );
      return;
    }
    this.props.addToCart(this.state.product, this.state.selectedVariants); // Pass selectedVariants
  };

  handleShare = () => {
    const { product } = this.state;
    const shareData = {
      title: product?.name,
      text: `Check out this amazing product: ${product?.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback: Copy the URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("URL copied to clipboard!");
    }
  };

  // Handle lightbox open
  openLightbox = (index) => {
    this.setState({ isOpen: true, photoIndex: index });
  };

  render() {
    const { product, totalMoney, isOpen, photoIndex } = this.state;
    const images = [product?.photo]; // Array of images to display in the lightbox

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    // Split the tags into an array
    const tagsArray = product?.tags.split(",").map((tag) => tag.trim());

    return (
      <div>
        <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <a href="/">
                  <strong>
                    <span className="mdi mdi-home" /> Home
                  </strong>
                </a>
                <span className="mdi mdi-chevron-right" />{" "}
                <a href="#">Product</a>
              </div>
            </div>
          </div>
        </section>

        <section className="shop-single section-padding pt-3 p-5">
          <div className="container">
            {product ? (
              <div className="row">
                <div className="col-md-6">
                  <div className="shop-detail-left">
                    <Paper className="shop-detail-slider">
                      <Slider {...settings}>
                        <div>
                          <img
                            crossOrigin="anonymous"
                            src={product.photo}
                            className="img-fluid img-center"
                            alt={product.name}
                            style={{ borderRadius: "15px", cursor: "pointer" }}
                            onClick={() => this.openLightbox(0)} // Open lightbox on image click
                          />
                        </div>
                      </Slider>
                    </Paper>
                    <h5>
                      Tags:{" "}
                      {tagsArray
                        .map((tag, index) => (
                          <Link
                            key={index}
                            to={`/tagsearch/${tag}`}
                            className="tag-link"
                          >
                            {tag}
                          </Link>
                        ))
                        .reduce((prev, curr) => [prev, ", ", curr])}
                    </h5>
                  </div>
                  <br />
                </div>
                <div className="col-md-6">
                  <div className="shop-detail-right">
                    <h3 onClick={this.handleShare} style={{cursor: "pointer"}}>Product Details</h3>
                    {/* <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Product Name</td>
                          <td>{product.name}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Dimensions</td>
                          <td>{product.height}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Stitch Details</td>
                          <td>{product.stitches}</td>
                        </tr>
                      </tbody>
                    </table> */}
                     <table className="table table-bordered">
    <tbody>
      <tr>
        <td style={{ fontWeight: "bold" }}>Product Name</td>
        <td>{product.name}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: "bold" }}>Dimensions</td>
        <td>
          {product.height ? (
            product.height.includes(",") ? (
              <>
                <div>
                  <strong>Height:</strong> {product.height.split(",")[0].split(" ")[1]} inc
                </div>
                <div>
                  <strong>Width:</strong> {product.height.split(",")[1].split(" ")[2]} inc
                </div>
              </>
            ) : (
              <div>{product.height}</div>
            )
          ) : (
            "N/A"
          )}
        </td>
      </tr>

      
      <tr>
        <td style={{ fontWeight: "bold" }}>Stitch Details</td>
        {/* <td>{product.stitches}</td> */}
        <td>
          {product.stitches ? (
            product.stitches.includes(",") ? (
              <>
                <div>
                  <strong>Back:</strong> {product.stitches.split(",")[0].split(" ")[1]}
                </div>
                <div>
                  <strong>Hand:</strong> {product.stitches.split(",")[1].split(" ")[2]}
                </div>
              </>
            ) : (
              <div>{product.stitches}</div>
            )
          ) : (
            "N/A"
          )}
        </td>
      </tr>
    </tbody>
  </table>
                    <h3>Select a Machine</h3>
                    <h3>₹{totalMoney}</h3>
                    {/* <div>
                      {product.productvariants.map((variant) => (
                        <div key={variant.id} className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={`variantCheck${variant.id}`}
                            value={variant.variantPrice}
                            onChange={(e) => this.handleCheckboxChange(e, variant)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={`variantCheck${variant.id}`}
                          >
                            {variant.variantName} (₹{variant.variantPrice})
                          </label>
                        </div>
                      ))}
                    </div> */}

                    <div>
                      {product &&
                        product.productvariants &&
                        product.productvariants
                          .slice() // Create a shallow copy of the array
                          .sort((a, b) =>
                            a.variantName.localeCompare(b.variantName)
                          ) // Sort by variant name in ascending order
                          .map((variant) => (
                            <div
                              key={variant.id}
                              className="custom-control custom-checkbox"
                            >
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`variantCheck${variant.id}`}
                                value={variant.variantPrice}
                                onChange={(e) =>
                                  this.handleCheckboxChange(e, variant)
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`variantCheck${variant.id}`}
                              >
                                {variant.variantName} (₹{variant.variantPrice})
                              </label>
                            </div>
                          ))}
                    </div>

                    <button
                      type="button"
                      className="btn btn-secondary btn-lg"
                      onClick={this.handleAddToCart}
                      disabled={this.state.selectedVariants.length === 0}
                    >
                      <i className="mdi mdi-cart-outline" /> Add To Cart
                    </button>
                    <h6 className="mb-3 mt-4">Product Description</h6>
                    <div className="pdct-dts-1 short-desc">
                      {product.sortDesc}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Loading..."
            )}
          </div>
        </section>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}

export default connect(null, { addToCart })(Singleproduct);
