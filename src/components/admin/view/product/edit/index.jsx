import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { GetProductDetails } from "../../../../services";
import Loader from "../../../../loader";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    let self = this.props.location.state.row;
    let value = self.status === "active" ? 1 : 0;
    this.state = {
      getList: [],
      getsublist: [],
      loading: false,
      blockHide: false,
      productId: self.id,
      name: self.name,
      slug: self.slug,
      brand: self.brand,
      status: value,
      image: "",
      sortDesc: self.sortDesc,
      height: self.height,
      stitches: self.stitches,
      variants: self.productvariants || [],
      predefinedVariantNames: ["PES-BROTHER-BP3600-14x9.5", "JEF-USHA-550-14x8", "JEF-USHA-450-11x8", "DST-FULL", "DST-BROTHER-V3SE-12x8", "DST-BERNINA-14x8"],
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
    this.setState({
      content: contentHtml,
    });
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

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const {
      productId,
      image,
      name,
      slug,
      status,
      sortDesc,
      variants,
      height,
      stitches,
    } = this.state;
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("status", status);
    formData.append("photo", image);
    formData.append("status", status);
    formData.append("sortDesc", sortDesc);
    formData.append("height", height);
    formData.append("stitches", stitches);

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
      text: "You want to Update Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.getUpdateProduct(formData, config);
        if (list) {
          this.setState({ loading: false });
          this.props.history.push("/admin/product/list");
        } else {
          this.setState({ loading: false });
          NotificationManager.error("Please! Check input field", "Input Field");
        }
      }
    });
  };

  render() {
    const { loading, variants, predefinedVariantNames } = this.state;
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
          <li className="breadcrumb-item active">Update Product</li>
        </ol>

        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Update Product</h4>
              </div>
              <div className="card-body-table">
                {loading ? <Loader /> : ""}
                <div className="news-content-right pd-20">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
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
                          placeholder="Enter Slug"
                          name="slug"
                          value={this.state.slug}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <label className="form-label">Product Image*</label>
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
                              onChange={(e) => this.handleVariantChange(index, e)}
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
                              onChange={(e) => this.handleVariantChange(index, e)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                          <div className="form-group">
                            <label className="form-label">Variant Path*</label>
                            <input
                              type="text"
                              className="form-control"
                              name="variantPath"
                              value={variant.variantPath}
                              onChange={(e) => this.handleVariantChange(index, e)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-2">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.handleRemoveVariant(index)}
                          >
                            Remove
                          </Button>
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

                  <button
                    className="save-btn hover-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
