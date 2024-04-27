import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { listAllOrders } from '../actions/orderActions';
// import { deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderListAll = useSelector((state) => state.orderListAll);
	const { loading, error, orders } = orderListAll;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listAllOrders());
		} else {
			navigate('/login');
		}
	}, [dispatch, userInfo, navigate, listAllOrders]);

	// const deleteHandler = (id) => {
	// 	if (window.confirm('Are you sure')) {
	// 		dispatch(deleteUser(id));
	// 	}
	// };

	return (
		<>
			<h1>Orders</h1>

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={'danger'}>{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
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
									<td>{order.user.name && order.user.name}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>${order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											<>
												{`${order.deliveredAt} `}
												<i
													className="fas fa-check"
													style={{ color: 'green' }}
												></i>
											</>
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/orders/${order._id}`}>
											<Button variant="info" className="btn-sm">
												See Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
