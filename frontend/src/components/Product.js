import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card data-bs-theme="light" className="my-3 p-3 rounded">
			<Link to={`/products/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body data-bs-theme="light">
				<Link
					to={`/products/${product._id}`}
					style={{ textDecoration: 'none' }}
				>
					<Card.Title as="h6">
						<b>{product.name}</b>
					</Card.Title>
				</Link>

				<Card.Text as={'div'} className="mb-3">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>

				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
