import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listTopProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';

import classes from './ProductCarousel.module.scss';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopList = useSelector((state) => state.productTopList);
	const { products, loading, error } = productTopList;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant={'danger'}>{error}</Message>
	) : (
		<Carousel onPause={'hover'} className={`bg-dark ${classes.carousel}`}>
			{products &&
				products.map((product) => (
					<Carousel.Item key={product._id}>
						<Link to={`/product/${product._id}`}>
							{/* <Image
						src={product.image}
						alt={product.name}
						fluid
					></Image> */}
							<img
								className="d-block "
								src={product.image}
								alt="First slide"
							/>
							<Carousel.Caption className="carousel-caption">
								<h2 className={`${classes.carouselCaption}`}>
									{product.name} $({product.price})
								</h2>
							</Carousel.Caption>
						</Link>
					</Carousel.Item>
				))}
		</Carousel>
	);
};

export default ProductCarousel;
