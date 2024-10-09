import React, { Component } from "react";
import { Button } from "@material-ui/core";
import MainCategorylist from "../../../../common/category/main-category";
import { GetCategoryDetails } from "../../../../services";
import SubCategorylist from "../../../../common/category/sub-category";
import Loader from "../../../../loader";
import { GetProductDetails } from "../../../../services";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";

export default class Newproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],

      selectedCategory: "",
      blockhide: false,
      isLoaded: false,
      name: "",
      slug: "",
      status: 1,
      image: "",
      sortDesc: null,
      height: "", // New field for height
      stitches: "", // New field for stitches
      variants: [], // Add state to handle variants
      predefinedVariantNames: ["PES-BROTHER-BP3600-14x9.5", "JEF-USHA-550-14x8", "JEF-USHA-450-11x8", "DST-FULL", "DST-BROTHER-V3SE-12x8", "DST-BERNINA-14x8", 'PES-BROTHER-BP3600-14x9.5'], // Example predefined variant names
    };
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  handleContentChange = (contentHtml) => {
    this.setState({ content: contentHtml });
  };

  handleCategory = async (value) => {
    this.setState({ selectedCategory: value,  blockhide: true });

  };


  handleAddVariant = () => {
    this.setState((prevState) => ({
      variants: [...prevState.variants, { variantName: "", variantPrice: 0, variantPath: "", }],
    }));
  };

  handleRemoveVariant = (index) => {
    this.setState((prevState) => ({
      variants: prevState.variants.filter((_, i) => i !== index),
    }));
  };

  handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = [...this.state.variants];
    newVariants[index] = { ...newVariants[index], [name]: value };
    this.setState({ variants: newVariants });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      selectedCategory,
      image,
      name,
      slug,
      status,
      sortDesc,
      variants,
      height,
      stitches,
    } = this.state;

    // Validation
    if (
      !selectedCategory ||
      !name ||
      !slug ||
      !image ||
      !sortDesc ||
      !height ||
      !stitches ||
      variants.length === 0
    ) {
      NotificationManager.error(
        "All fields are required and at least one variant must be added.",
        "Validation Error"
      );
      return;
    }

    // Validate variant data
    const invalidVariants = variants.some(
      (variant) => !variant.variantName || !variant.variantPrice
    );
    if (invalidVariants) {
      NotificationManager.error(
        "All variants must have a name and a price.",
        "Validation Error"
      );
      return;
    }

    this.setState({ isLoaded: true });
    const formData = new FormData();
    formData.append("categoryId", selectedCategory);
    
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("status", status);
    formData.append("sortDesc", sortDesc);
    formData.append("height", height); // Append height field
    formData.append("stitches", stitches); // Append stitches field
    formData.append("photo", image);

    // Append variants data
    variants.forEach((variant, index) => {
      formData.append(`variants[${index}][variantName]`, variant.variantName);
      formData.append(`variants[${index}][variantPrice]`, variant.variantPrice);
      formData.append(`variants[${index}][variantPath]`, variant.variantPath);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add New Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.addProductList(formData, config);
        if (list) {
          this.setState({ isLoaded: false });
          this.props.history.push("/admin/product/list");
        } else {
          NotificationManager.error("Please! Check input field", "Input Field");
        }
      }
    });
  };

  render() {
    const { getList, isLoaded, variants, predefinedVariantNames } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/admin/product/create">Products</a>
          </li>
          <li className="breadcrumb-item active">Add Product</li>
        </ol>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Category*</label>
                    <MainCategorylist onSelectCategory={this.handleCategory} />
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>

        <div
          className="row"
          style={
            this.state.blockhide ? { display: "block" } : { display: "none" }
          }
        >
          {isLoaded && <Loader />}
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add New Product</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="row">
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Product Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Product Name"
                          name="name"
                          value={this.state.name}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Slug*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Slug"
                          name="slug"
                          value={this.state.slug}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Category Image*</label>
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          onChange={this.onFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ paddingTop: "2rem" }}>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Status*</label>
                        <select
                          id="status"
                          name="status"
                          className="form-control"
                          value={this.state.status}
                          onChange={(e) => this.handleChange(e)}
                        >
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Height*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Height (e.g., 10x6, 6x4)"
                          name="height"
                          value={this.state.height}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Stitches*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Stitches (e.g., 17000, 8880)"
                          name="stitches"
                          value={this.state.stitches}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ paddingTop: "2rem" }}>
                    <div className="form-group">
                      <label className="form-label">Sort Description*</label>
                      <textarea
                        rows="4"
                        cols="100"
                        className="form-control"
                        name="sortDesc"
                        value={this.state.sortDesc}
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                  </div>

                  {/* Variants Section */}
                  <div className="variants-section">
                    <h4>Product Variants</h4>
                    {variants.map((variant, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-3 col-md-3">
                          <div className="form-group">
                            <label className="form-label">Variant Name*</label>
                            <select
                              className="form-control"
                              name="variantName"
                              value={variant.variantName}
                              onChange={(e) =>
                                this.handleVariantChange(index, e)
                              }
                            >
                              <option value="">Select Variant</option>
                              {predefinedVariantNames.map((name, i) => (
                                <option key={i} value={name}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                          <div className="form-group">
                            <label className="form-label">Variant Price*</label>
                            <input
                              type="number"
                              className="form-control"
                              name="variantPrice"
                              value={variant.variantPrice}
                              onChange={(e) =>
                                this.handleVariantChange(index, e)
                              }
                              placeholder="Variant Price"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                          <div className="form-group">
                            <label className="form-label">Variant Path*</label>
                            <input
                              type="text"
                              className="form-control"
                              name="variantPath"
                              value={variant.variantPath}
                              onChange={(e) =>
                                this.handleVariantChange(index, e)
                              }
                              placeholder="Variant Path"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => this.handleRemoveVariant(index)}
                            >
                              Remove Variant
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleAddVariant}
                    >
                      Add Variant
                    </Button>
                  </div>

                  <div className="button_price">
                    <div className="form-group" style={{ display: "block" }}>
                      <button
                        className="save-btn hover-btn"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Add New Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
