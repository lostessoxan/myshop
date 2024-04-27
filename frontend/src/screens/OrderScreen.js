import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { deliverOrder, getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
	ORDER_DELIVER_RESET,
	ORDER_PAY_RESET
} from '../constants/orderConstants';

const OrderScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();
	const [update, setUpdate] = useState(search ? search.split('=')[1] : false);

	const orderId = useParams().id;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { loading, error, order } = orderDetails;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const {
		loading: loadingDeliver,
		error: errorDeliver,
		success: successDeliver
	} = orderDeliver;

	// const orderPay = useSelector((state) => state.orderPay);
	// const { loading: loadingPay, success: successPay } = orderPay;

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	if (!loading && order) {
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	const payHandler = () => {
		//...
	};

	const deliverHandler = () => {
		dispatch(deliverOrder(orderId));
	};

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}

		if (!order || successDeliver || update === 'yes') {
			// dispatch({ type: ORDER_PAY_RESET });
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
			setUpdate(false);
		}

		// if (!order || successPay || successDeliver) {
		// 	// dispatch({ type: ORDER_PAY_RESET });
		// 	// dispatch({ type: ORDER_DELIVER_RESET });
		// 	dispatch(getOrderDetails(orderId));
		// } else if (!order.isPaid) {
		// }
	}, [
		dispatch,
		orderId,
		order,
		navigate,
		userInfo,
		getOrderDetails,
		successDeliver
		// update
	]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message>{error}</Message>
	) : (
		<>
			{order && (
				<>
					<h1>Order {order.id}</h1>
					<Row>
						<Col md={8}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<b>Name: </b> {order.user.name}
									</p>
									<p>
										<b>Email: </b>
										<a href={`mailto:${order.user.email}`}>
											{order.user.email}
										</a>
									</p>
									<p>
										<strong>Address:</strong>
										{order.shippingAddress.address},{' '}
										{order.shippingAddress.city},{' '}
										{order.shippingAddress.postalCode},{' '}
										{order.shippingAddress.country}
									</p>
									{order.isDelivered ? (
										<Message variant={'success'}>
											Delivered on{' '}
											{order.deliveredAt.substring(0, 10)}
										</Message>
									) : (
										<Message variant={'danger'}>
											Not Delivered
										</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Payment Method</h2>
									<p>
										<b>Method: </b>
										{order.paymentMethod}
									</p>
									{order.isPaid ? (
										<Message variant={'success'}>
											Paid on {order.paidAt}
										</Message>
									) : (
										<Message variant={'danger'}>Not Paid</Message>
									)}
								</ListGroup.Item>

								<ListGroup.Item>
									<h2>Order Items</h2>
									{order.orderItems.length === 0 ? (
										<Message>Your cart is empty</Message>
									) : (
										<ListGroup variant="flush">
											{order.orderItems.map((item, index) => (
												<ListGroup.Item key={index}>
													<Row>
														<Col md={1}>
															<Image
																src={item.image}
																alt={item.name}
																fluid
																rounded
															/>
														</Col>
														<Col>
															<Link
																to={`/product/${item.product}`}
															>
																{item.name}
															</Link>
														</Col>
														<Col md={4}>
															{item.qty} x ${item.price} = $
															{item.qty * item.price}
														</Col>
													</Row>
												</ListGroup.Item>
											))}
										</ListGroup>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Items</Col>
											<Col>${order.itemsPrice}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Shipping</Col>
											<Col>${addDecimals(order.shippingPrice)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Tax</Col>
											<Col>${addDecimals(order.taxPrice)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total</Col>
											<Col>${order.totalPrice}</Col>
										</Row>
									</ListGroup.Item>
									{!order.isPaid && (
										<ListGroup.Item>
											{/* {loadingPay && <Loader />} */}
											<Button type="button" onClick={payHandler}>
												Pay the order
											</Button>
										</ListGroup.Item>
									)}
									{loadingDeliver && <Loader />}
									{userInfo &&
										userInfo.isAdmin &&
										!order.isDelivered && (
											<ListGroup.Item>
												<Button
													variant="success"
													type="button"
													className="btn btn-block"
													onClick={deliverHandler}
												>
													Mark As Delivered
												</Button>
											</ListGroup.Item>
										)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
