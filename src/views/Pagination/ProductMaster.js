import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button, Spinner } from "reactstrap";
import ProductTable from "./ProductTable";
import Pagination from "./Pagination";
import { getProductList } from "../../actions/productMasterActions";
import { getPdfList } from "../../actions/pdfActions";
import Axios from "../../functions/Axios";
import { API_URI } from "../../Constant";
import { toast } from "react-toastify";

class ProductMaster extends Component {
	state = {
		searchInput: "",
		currentProducts: [],
		currentPage: null,
		uploading: false,
		pageLimit: 10,
		totalPages: null,
		filteredProductList: this.props.products.productList
	};

	handleChange = e => {
		const { currentPage, pageLimit } = this.state;
		const { productList } = this.props.products;
		const { name, value } = e.target;

		const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		let filteredProductList;
		if (escapedValue === "") {
			filteredProductList = productList;
		} else {
			const regex = new RegExp("^" + escapedValue, "i");
			filteredProductList = productList.filter(
				product => regex.test(product.sku_code) || regex.test(product.product_name)
			);
		}
		const offset = (currentPage - 1) * pageLimit;
		const currentProducts = filteredProductList.slice(offset, offset + pageLimit);
		this.setState({
			[name]: value,
			filteredProductList,
			currentProducts
		});
	};

	handleCSVUpload = e => {
		const { files } = e.target;
		if (files[0]) {
			this.setState({
				uploading: true
			});
			const formData = new FormData();
			formData.append("file", files[0]);
			const config = {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			};
			Axios.post(`${API_URI}/clients/`, formData, config)
				.then(res => {
					if (res.status === 200) {
						this.props.getProductList();
						this.setState({
							uploading: false
						});
					} else {
						throw new Error();
					}
				})
				.catch(e => {
					toast.error("Some Error Occurred");
					this.setState({
						uploading: false
					});
				});
		}
	};

	onPageChanged = data => {
		const { filteredProductList } = this.state;
		const { currentPage, totalPages, pageLimit } = data;
		const offset = (currentPage - 1) * pageLimit;
		const currentProducts = filteredProductList.slice(offset, offset + pageLimit);
		this.setState({ currentPage, currentProducts, totalPages });
	};

	render() {
		const { products } = this.props;
		const {
			searchInput,
			currentProducts,
			pageLimit,
			currentPage,
			filteredProductList,
			uploading
		} = this.state;
		const { error } = products;

		const totalProducts = filteredProductList.length;
		const totalPages = Math.ceil(totalProducts / pageLimit);
		if (error) {
			return <h1>Error component</h1>;
		} else {
			return (
				<div className="container">
					<div className="float-right my-4">
						<InputGroup>
							<Input
								style={{ width: "300px" }}
								value={searchInput}
								name="searchInput"
								onChange={this.handleChange}
								placeholder="SKU Code or Product Name"
							/>
							<InputGroupAddon addonType="append">
								<InputGroupText><span className="searchIcon"/></InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</div>
					<ProductTable list={currentProducts} offset={(currentPage - 1) * pageLimit} />
					<div className="d-flex justify-content-center">
						<Pagination
							totalRecords={totalProducts}
							pageLimit={pageLimit}
							pageNeighbours={1}
							onPageChanged={this.onPageChanged}
							totalPages={totalPages}
						/>
					</div>
					<div className="d-flex justify-content-center" />
					<div className="d-flex justify-content-center my-3">
						<Button className="mx-2 btn-light-blue">
							Download CSV Format
						</Button>
						<Button className="fileUpload btn-dark-purple mx-2">
							<span>
								{uploading && <Spinner color="light" className="mx-1" size="sm" />}
								CSV Import
							</span>
							<input
								type="file"
								onChange={this.handleCSVUpload}
								accept=".csv"
								className="upload"
								name="csv"
								id="csv"
							/>
						</Button>
						<Link to="/product-master/add-product">
							<Button className="btn-dark-purple">Add New Product</Button>
						</Link>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = ({ products, pdf }, props) => ({
	products,
	pdf
});

export default connect(
	mapStateToProps,
	{ getProductList, getPdfList }
)(ProductMaster);
