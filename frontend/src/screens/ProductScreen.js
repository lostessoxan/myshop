import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	createProductReview,
	listProductDetails
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import classes from './ProductScreen.module.css';

const ProductScreen = () => {
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();
	const productId = useParams().id;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productCreateReview = useSelector(
		(state) => state.productCreateReview
	);

	const {
		loading: loadingReview,
		error: errorReview,
		success: successReview
	} = productCreateReview;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		if (successReview) {
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(productId));
	}, [dispatch, productId, successReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${productId}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createProductReview(productId, {
				rating,
				comment
			})
		);
	};

	return (
		<>
			<Link className="btn btn-dark my-3" to={'/'}>
				Go Back
			</Link>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={'danger'}>{error}</Message>
			) : (
				<>
					{/* <Meta title={product.name} /> */}
					<Row>
						<Col md={6}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
								thumbnail
							/>
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: ${product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0
													? 'In Stock'
													: 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={(e) =>
															setQty(e.target.value)
														}
													>
														{[
															...Array(
																product.countInStock
															).keys()
														].map((x) => {
															return (
																<option
																	key={x + 1}
																	value={x + 1}
																>
																	{x + 1}
																</option>
															);
														})}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className="btn-block"
											type="button"
											disabled={product.countInStock === 0 && 'true'}
										>
											Add to Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6} className={classes.reviews}>
							<h2>Reviews</h2>

							{loadingReview && <Loader />}
							{errorReview && (
								<Message variant={'danger'}>{errorReview}</Message>
							)}

							{product && product?.reviews?.length === 0 && (
								<div style={{ margin: '1rem 0' }}>
									<Message>No Reviews</Message>
								</div>
							)}

							<ListGroup className={classes.customersReviews}>
								{product?.reviews?.map((review) => (
									<ListGroup.Item key={review._id}>
										<b>{review.name}</b>
										<Rating value={review.rating} />
										<div className={classes.createdAt}>
											<b>Date: </b>
											<p>{review.createdAt.substring(0, 10)}</p>
										</div>
										<Alert variant={'secondary'}>
											<p className={classes.description}>
												{review.comment}
											</p>
										</Alert>
									</ListGroup.Item>
								))}
							</ListGroup>

							<Card className={classes.createReviewBlock}>
								<Card.Header as={'h3'}>
									Write a Customer Review
								</Card.Header>
								<Card.Body>
									{/* <Card.Title>Special title treatment</Card.Title>
									<Card.Text>
										With supporting text below as a natural lead-in to
										additional content.
									</Card.Text>
									<Button variant="primary">Go somewhere</Button> */}

									{/* {errorProductReview && (
										<Message variant={'danger'}>
											{errorProductReview}
										</Message>
									)} */}
									{userInfo ? (
										<Form
											onSubmit={submitHandler}
											className={classes.reviewForm}
										>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as={'select'}
													value={rating}
													onChange={(e) =>
														setRating(+e.target.value)
													}
												>
													<option value="">Select...</option>
													<option value={1}>1 - Poor</option>
													<option value={2}>2 - Fair</option>
													<option value={3}>3 - Good</option>
													<option value={4}>4 - Very Good</option>
													<option value={5}>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as={'textarea'}
													row={3}
													value={comment}
													onChange={(e) =>
														setComment(e.target.value)
													}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to={'/login'}>sign in</Link> to
											write a review
										</Message>
									)}
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
