import { Table as AntTable, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const location = useLocation();
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userDetailsSlice = useSelector((state) => state.userDetails);
	const {
		loading: loadingDetails,
		error: errorDetails,
		userDetails
	} = userDetailsSlice;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { loading, error, success } = userUpdateProfile;

	const listMyOrdersSlice = useSelector((state) => state.listMyOrders);
	const {
		loading: loadingOrders,
		error: errorOrders,
		orders
	} = listMyOrdersSlice;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			if (!userDetails || !userDetails.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(userDetails.name);
				setEmail(userDetails.email);
			}
			dispatch(listMyOrders());
		}
	}, [dispatch, navigate, userInfo, userDetails]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match / Password is empty');
		} else {
			dispatch(updateUserProfile({ name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant={'danger'}>{message}</Message>}
				{error && <Message variant={'danger'}>{error}</Message>}
				{success && <Message variant={'success'}>Profile Updated</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler} className="login-form">
					<Form.Group controlId="name">
						<Form.Label>Name Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password Address</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>

				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant={'danger'}>{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders &&
								orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substring(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substring(0, 10)
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											{order.isDelivered ? (
												<Tag color="green">
													{order.deliveredAt.substring(0, 10)}
												</Tag>
											) : (
												<i
													className="fas fa-times"
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<LinkContainer
												to={{
													pathname: `/orders/${order._id}`,
													search: '?update=yes'
												}}
											>
												<Button variant="info" className="btn-sm">
													Details
												</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
