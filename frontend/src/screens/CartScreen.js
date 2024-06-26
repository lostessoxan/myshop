import React, { useEffect } from 'react';
import {
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

const CartScreen = () => {
	const { search } = useLocation();
	const navigate = useNavigate();

	const productId = useParams().id;
	const qty = search ? +search.split('=')[1] : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkoutHandler = () => {
		if (!userInfo) return navigate('/login');

		navigate('/shipping');
	};

	return (
		<>
			<h2>Shopping cart</h2>

			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty <Link to="/">Go Back</Link>
						</Message>
					) : (
						// <>
						// 	{cartItems.map((item) => (
						// 		<Row key={item.productId} className="cart-item">
						// 			<Col md={2}>
						// 				<Image
						// 					src={item.image}
						// 					alt={item.name}
						// 					fluid
						// 					rounded
						// 				/>
						// 			</Col>
						// 			<Col md={3}>
						// 				<Link to={`/product/${item.productId}`}>
						// 					{item.name}
						// 				</Link>
						// 			</Col>
						// 			<Col md={2}>${item.price}</Col>
						// 			<Col md={2}>
						// 				<Form.Control
						// 					as="select"
						// 					value={item.qty}
						// 					onChange={(e) =>
						// 						dispatch(
						// 							addToCart(item.productId, +e.target.value)
						// 						)
						// 					}
						// 				>
						// 					{[...Array(item.countInStock).keys()].map(
						// 						(x) => {
						// 							return (
						// 								<option key={x + 1} value={x + 1}>
						// 									{x + 1}
						// 								</option>
						// 							);
						// 						}
						// 					)}
						// 				</Form.Control>
						// 			</Col>
						// 			<Col md={2} className="trash-icon">
						// 				<Button
						// 					type="button"
						// 					variant={'danger'}
						// 					onClick={() =>
						// 						removeFromCartHandler(item.product)
						// 					}
						// 				>
						// 					<i className="fas fa-trash"></i>
						// 				</Button>
						// 			</Col>
						// 		</Row>
						// 	))}
						// </>

						<ListGroup variant="flush">
							{cartItems.map((item) => (
								<ListGroup.Item key={item.productId}>
									<Row>
										<Col md={2}>
											<Image
												src={item.image}
												alt={item.name}
												fluid
												rounded
											/>
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.productId}`}>
												{item.name}
											</Link>
										</Col>
										<Col md={2}>${item.price}</Col>
										<Col md={2}>
											<Form.Control
												as="select"
												value={item.qty}
												onChange={(e) =>
													dispatch(
														addToCart(
															item.productId,
															+e.target.value
														)
													)
												}
											>
												{[...Array(item.countInStock).keys()].map(
													(x) => {
														return (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														);
													}
												)}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type="button"
												variant={'danger'}
												onClick={() =>
													removeFromCartHandler(item.productId)
												}
											>
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>
									Subtotal (
									{cartItems.reduce((acc, item) => acc + item.qty, 0)})
									items
								</h3>
								$
								{cartItems
									.reduce(
										(acc, item) => acc + item.price * item.qty,
										0
									)
									.toFixed(2)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems.length === 0}
									onClick={checkoutHandler}
								>
									Proceed to Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CartScreen;
