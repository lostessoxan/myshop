import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { changeSort, listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import classes from './HomeScreen.module.scss';

const sortsArray = [
	{ name: 'убрать сортировку', sort: '' },
	{ name: 'популярности', sort: 'rating' },
	{ name: 'цене', sort: 'price' },
	{ name: 'бренду', sort: 'brand' }
];

const HomeScreen = () => {
	const keyword = useParams().keyword || '';
	const pageNumber = useParams().pageNumber || 1;
	const [sort, setSort] = useState(0);
	const [sortOrder, setSortOrder] = useState(1);

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const productChangeSort = useSelector((state) => state.productChangeSort);
	const {
		loading: loadingSort,
		error: errorSort,
		sortedProducts
	} = productChangeSort;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	useEffect(() => {
		if (sort === 0) {
			dispatch(listProducts(keyword, pageNumber));
		} else {
			dispatch(changeSort({ sort: sortsArray[sort].sort, sortOrder }));
		}
	}, [sort, sortOrder]);

	const resultProducts = sort === 0 ? products : sortedProducts;

	return (
		<>
			<Container>
				<h4>Top Rated Products</h4>
				{!keyword ? (
					<ProductCarousel />
				) : (
					<Link to={`/`} className="btn btn-light">
						Go Back
					</Link>
				)}

				<h2 style={{ margin: '1rem 0 0 0' }}>Latest Products</h2>
				<div className={classes.sort}>
					<h5>Сортировать по: </h5>
					<DropdownButton
						id="dropdown-basic-button"
						title={sortsArray[sort].name}
						variant="info"
					>
						{sortsArray &&
							sortsArray.map(({ name, sort }, index) => (
								<Dropdown.Item
									onClick={() => setSort(index)}
									key={`${name}_${index}`}
								>
									{name}
								</Dropdown.Item>
							))}
					</DropdownButton>

					{sort !== 0 && (
						<i
							class={`fa-solid fa-arrow-${
								sortOrder === 1 ? 'up' : 'down'
							}-wide-short ${classes.changeSortOrder}`}
							onClick={() =>
								setSortOrder((prev) => (prev == 1 ? -1 : 1))
							}
						></i>
					)}
				</div>

				{loadingSort && <Loader />}
				{errorSort && <Message variant={'danger'}>{errorSort}</Message>}

				{loading ? (
					<Loader />
				) : error ? (
					<Message className={classes.message} variant={'danger'}>
						{error}
					</Message>
				) : (
					<>
						<Row>
							{resultProducts &&
								resultProducts.map((product) => (
									<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
										<Product product={product} />
									</Col>
								))}
						</Row>
						<Paginate pages={pages} page={page} keyword={keyword} />
					</>
				)}
			</Container>
		</>
	);
};

export default HomeScreen;
