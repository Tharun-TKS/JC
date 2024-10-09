// // import React, { Component } from "react";
// // import { Paper } from "@material-ui/core";
// // import Slider from "react-slick";
// // import { connect } from "react-redux";
// // import { addToCart } from "../../../../store/actions/cartActions";
// // import { GetProductDetails } from "../../../services";
// // import { Link } from "react-router-dom"; // Import Link
// // import "./index.css";

// // class Singleproduct extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       product: null,
// //       selectedVariants: [],
// //       totalMoney: 0
// //     };
// //   }

// //   async componentDidMount() {
// //     window.scrollTo(0, 0);
// //     let url = window.location.href.split("/");
// //     let lastSegment = url.pop() || url.pop();
// //     const productId = parseInt(lastSegment, 10);

// //     const response = await GetProductDetails.getProductById(productId);
// //     console.log(response);

// //     if (response && response.success) {
// //       this.setState({ product: response.data });
// //     }
// //   }

// //   handleCheckboxChange = (event, variant) => {
// //     const { checked } = event.target;
// //     this.setState((prevState) => {
// //       const selectedVariants = checked
// //         ? [...prevState.selectedVariants, variant]
// //         : prevState.selectedVariants.filter((v) => v.id !== variant.id);

// //       const totalMoney = selectedVariants.reduce((acc, curr) => acc + curr.variantPrice, 0);
// //       return { selectedVariants, totalMoney };
// //     });
// //   };

// //   handleAddToCart = () => {
// //     if (this.state.selectedVariants.length === 0) {
// //       alert("Please select at least one machine variant before adding to cart.");
// //       return;
// //     }
// //     this.props.addToCart(this.state.product, this.state.selectedVariants); // Pass selectedVariants
// //   };

// //   render() {
// //     const { product, totalMoney } = this.state;
// //     const settings = {
// //       customPaging: function (i) {
// //         return (
// //           <div id="sync1" className="owl-carousel">
// //             <div className="item">
// //               <img src={product?.photo} alt="product" />
// //             </div>
// //           </div>
// //         );
// //       },
// //       dots: true,
// //       dotsClass: "slick-dots slick-thumb",
// //       infinite: true,
// //       speed: 500,
// //       slidesToShow: 1,
// //       slidesToScroll: 1,
// //     };

// //     // Split the tags into an array
// //     const tagsArray = product?.tags.split(",").map(tag => tag.trim());

// //     return (
// //       <div>
// //         <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
// //           <div className="container">
// //             <div className="row">
// //               <div className="col-md-12">
// //                 <a href="/">
// //                   <strong>
// //                     <span className="mdi mdi-home" /> Home
// //                   </strong>
// //                 </a>
// //                 <span className="mdi mdi-chevron-right" />{" "}
// //                 <a href="#">Product</a>
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         <section className="shop-single section-padding pt-3 p-5">
// //           <div className="container">
// //             {product ? (
// //               <div className="row">
// //                 <div className="col-md-6">
// //                   <div className="shop-detail-left">
// //                     <Paper className="shop-detail-slider">
// //                       <Slider {...settings}>
// //                         <div>
// //                           <img
// //                             crossOrigin='anonymous'
// //                             src={product.photo}
// //                             className="img-fluid img-center"
// //                             alt={product.name} style={{ borderRadius: "15px" }}
// //                           />
// //                         </div>
// //                       </Slider>
// //                     </Paper>
// //                     <h5>Tags: {tagsArray.map((tag, index) => (
// //                       <Link key={index} to={`/tagsearch/${tag}`} className="tag-link">
// //                         {tag}
// //                       </Link>
// //                     )).reduce((prev, curr) => [prev, ', ', curr])}</h5>
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                 <div className="shop-detail-right">
// //                     <h3>Product Details</h3>
// //                     <table className="table table-bordered">
// //                       <thead>
// //                         <tr>
// //                           <th>Detail</th>
// //                           <th>Information</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         <tr>
// //                           <td>Product Name</td>
// //                           <td>{product.name}</td>
// //                         </tr>
// //                         <tr>
// //                           <td>Dimensions</td>
// //                           <td>{product.height}</td>
// //                         </tr>
// //                         <tr>
// //                           <td>Stitch Details</td>
// //                           <td>{product.stitches}</td>
// //                         </tr>
// //                       </tbody>
// //                     </table>
// //                     <h3>Select a Machine</h3>
// //                     <h3>₹{totalMoney}</h3>
// //                     <div>
// //                       {product.productvariants.map((variant) => (
// //                         <div key={variant.id} className="custom-control custom-checkbox">
// //                           <input
// //                             type="checkbox"
// //                             className="custom-control-input"
// //                             id={`variantCheck${variant.id}`}
// //                             value={variant.variantPrice}
// //                             onChange={(e) => this.handleCheckboxChange(e, variant)}
// //                           />
// //                           <label
// //                             className="custom-control-label"
// //                             htmlFor={`variantCheck${variant.id}`}
// //                           >
// //                             {variant.variantName} (₹{variant.variantPrice})
// //                           </label>
// //                         </div>
// //                       ))}
// //                     </div>
// //                     <button
// //                       type="button"
// //                       className="btn btn-secondary btn-lg"
// //                       onClick={this.handleAddToCart}
// //                       disabled={this.state.selectedVariants.length === 0}
// //                     >
// //                       <i className="mdi mdi-cart-outline" /> Add To Cart
// //                     </button>
// //                     <h6 className="mb-3 mt-4">Product Description</h6>
// //                     <div className="pdct-dts-1 short-desc">
// //                       {product.sortDesc}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (
// //               "Loading..."
// //             )}
// //           </div>
// //         </section>
// //       </div>
// //     );
// //   }
// // }

// // export default connect(null, { addToCart })(Singleproduct);




// import React, { Component } from "react";
// import { Paper } from "@material-ui/core";
// import Slider from "react-slick";
// import { connect } from "react-redux";
// import { addToCart } from "../../../../store/actions/cartActions";
// import { GetProductDetails } from "../../../services";
// import { Link } from "react-router-dom";
// import ReactImageMagnify from 'react-image-magnify'; // Import ReactImageMagnify
// import "./index.css";

// class Singleproduct extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: null,
//       selectedVariants: [],
//       totalMoney: 0,
//     };
//   }

//   async componentDidMount() {
//     window.scrollTo(0, 0);
//     let url = window.location.href.split("/");
//     let lastSegment = url.pop() || url.pop();
//     const productId = parseInt(lastSegment, 10);

//     const response = await GetProductDetails.getProductById(productId);
//     if (response && response.success) {
//       this.setState({ product: response.data });
//     }
//   }

//   handleCheckboxChange = (event, variant) => {
//     const { checked } = event.target;
//     this.setState((prevState) => {
//       const selectedVariants = checked
//         ? [...prevState.selectedVariants, variant]
//         : prevState.selectedVariants.filter((v) => v.id !== variant.id);

//       const totalMoney = selectedVariants.reduce((acc, curr) => acc + curr.variantPrice, 0);
//       return { selectedVariants, totalMoney };
//     });
//   };

//   handleAddToCart = () => {
//     if (this.state.selectedVariants.length === 0) {
//       alert("Please select at least one machine variant before adding to cart.");
//       return;
//     }
//     this.props.addToCart(this.state.product, this.state.selectedVariants);
//   };

//   render() {
//     const { product, totalMoney } = this.state;
//     const settings = {
//       customPaging: function (i) {
//         return (
//           <div id="sync1" className="owl-carousel">
//             <div className="item">
//               <img src={product?.photo} alt="product" />
//             </div>
//           </div>
//         );
//       },
//       dots: true,
//       dotsClass: "slick-dots slick-thumb",
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//     };

//     const tagsArray = product?.tags.split(",").map(tag => tag.trim());

//     return (
//       <div>
//         <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12">
//                 <a href="/">
//                   <strong>
//                     <span className="mdi mdi-home" /> Home
//                   </strong>
//                 </a>
//                 <span className="mdi mdi-chevron-right" />{" "}
//                 <a href="#">Product</a>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="shop-single section-padding pt-3 p-5">
//           <div className="container">
//             {product ? (
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="shop-detail-left">
//                     <Paper className="shop-detail-slider">
//                       <Slider {...settings}>
//                         <div>
//                           <ReactImageMagnify
//                             {...{
//                               smallImage: {
//                                 alt: product.name,
//                                 isFluidWidth: true,
//                                 src: product.photo,
//                               },
//                               largeImage: {
//                                 src: product.photo,
//                                 width: 1200,
//                                 height: 1800,
//                               },
//                               enlargedImagePosition: 'over',
//                               isHintEnabled: true,
//                               lensStyle: { backgroundColor: 'rgba(0,0,0,.3)' },
//                               shouldUsePositiveSpaceLens: true,
//                             }}
//                           />
//                         </div>
//                       </Slider>
//                     </Paper>
//                     <h5>Tags: {tagsArray.map((tag, index) => (
//                       <Link key={index} to={`/tagsearch/${tag}`} className="tag-link">
//                         {tag}
//                       </Link>
//                     )).reduce((prev, curr) => [prev, ', ', curr])}</h5>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="shop-detail-right">
//                     <h3>Product Details</h3>
//                     <table className="table table-bordered">
//                       <thead>
//                         <tr>
//                           <th>Detail</th>
//                           <th>Information</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>Product Name</td>
//                           <td>{product.name}</td>
//                         </tr>
//                         <tr>
//                           <td>Dimensions</td>
//                           <td>{product.height}</td>
//                         </tr>
//                         <tr>
//                           <td>Stitch Details</td>
//                           <td>{product.stitches}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <h3>Select a Machine</h3>
//                     <h3>₹{totalMoney}</h3>
//                     <div>
//                       {product.productvariants.map((variant) => (
//                         <div key={variant.id} className="custom-control custom-checkbox">
//                           <input
//                             type="checkbox"
//                             className="custom-control-input"
//                             id={`variantCheck${variant.id}`}
//                             value={variant.variantPrice}
//                             onChange={(e) => this.handleCheckboxChange(e, variant)}
//                           />
//                           <label
//                             className="custom-control-label"
//                             htmlFor={`variantCheck${variant.id}`}
//                           >
//                             {variant.variantName} (₹{variant.variantPrice})
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                     <button
//                       type="button"
//                       className="btn btn-secondary btn-lg"
//                       onClick={this.handleAddToCart}
//                       disabled={this.state.selectedVariants.length === 0}
//                     >
//                       <i className="mdi mdi-cart-outline" /> Add To Cart
//                     </button>
//                     <h6 className="mb-3 mt-4">Product Description</h6>
//                     <div className="pdct-dts-1 short-desc">
//                       {product.sortDesc}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               "Loading..."
//             )}
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

// export default connect(null, { addToCart })(Singleproduct);


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

      const totalMoney = selectedVariants.reduce((acc, curr) => acc + curr.variantPrice, 0);
      return { selectedVariants, totalMoney };
    });
  };

  handleAddToCart = () => {
    if (this.state.selectedVariants.length === 0) {
      alert("Please select at least one machine variant before adding to cart.");
      return;
    }
    this.props.addToCart(this.state.product, this.state.selectedVariants); // Pass selectedVariants
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
    const tagsArray = product?.tags.split(",").map(tag => tag.trim());

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
                            crossOrigin='anonymous'
                            src={product.photo}
                            className="img-fluid img-center"
                            alt={product.name} style={{ borderRadius: "15px", cursor: "pointer" }}
                            onClick={() => this.openLightbox(0)} // Open lightbox on image click
                          
                          />
                        </div>
                      </Slider>
                    </Paper>
                    <h5>Tags: {tagsArray.map((tag, index) => (
                      <Link key={index} to={`/tagsearch/${tag}`} className="tag-link">
                        {tag}
                      </Link>
                    )).reduce((prev, curr) => [prev, ', ', curr])}</h5>
                  </div>
                  <br/>
                </div>
                <div className="col-md-6">
                <div className="shop-detail-right">
                    <h3>Product Details</h3>
                    <table className="table table-bordered">
                      {/* <thead>
                        <tr>
                          <th>Detail</th>
                          <th>Information</th>
                        </tr>
                      </thead> */}
                      <tbody>
                        <tr>
                          <td style={{fontWeight: "bold"}}>Product Name</td>
                          <td>{product.name}</td>
                        </tr>
                        <tr>
                          <td style={{fontWeight: "bold"}}>Dimensions</td>
                          <td>{product.height}</td>
                        </tr>
                        <tr>
                          <td style={{fontWeight: "bold"}}>Stitch Details</td>
                          <td>{product.stitches}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h3>Select a Machine</h3>
                    <h3>₹{totalMoney}</h3>
                    <div>
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


