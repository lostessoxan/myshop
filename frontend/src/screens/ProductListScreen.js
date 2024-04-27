import React, { useEffect, useReducer, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	createProduct,
	deleteProduct,
	listProducts
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_DELETE_RESET
} from '../constants/productConstants';
// import Paginate from '../components/Paginate';
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
	const pageNumber = useParams().pageNumber || 1;

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
		message: messageDelete
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_DELETE_RESET });
		dispatch({ type: PRODUCT_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate('/login');
		}

		if (successCreate) {
			navigate(`/admin/products/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		userInfo,
		navigate,
		dispatch,
		successCreate,
		createdProduct,
		successDelete,
		pageNumber
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button
						style={{ marginLeft: 'auto', display: 'block' }}
						className="my-3"
						onClick={createProductHandler}
					>
						<i className="fas fa-plus"></i> Create Product
					</Button>
				</Col>
			</Row>

			{loadingDelete && <Loader />}
			{errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
			{messageDelete && <Message variant="success">{messageDelete}</Message>}

			{/* {loadingCreate && <Loader />}
			{errorCreate && <Message variant={'danger'}>{errorCreate}</Message>} */}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={'danger'}>{error}</Message>
			) : (
				<>
					<Table
						striped
						bordered
						hover
						responsive
						className="table-sm products-list-table"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products &&
								products.map((product) => (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td className="product-controls-btns">
											<LinkContainer
												to={`/admin/products/${product._id}/edit`}
											>
												<Button variant="light" className="btn-sm">
													<i className="fas fa-edit"></i>
												</Button>
											</LinkContainer>
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() => deleteHandler(product._id)}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
					{/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
					<Paginate pages={pages} page={page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
