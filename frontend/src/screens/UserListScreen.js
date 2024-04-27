import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
const UserListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const usersList = useSelector((state) => state.usersList);
	const { loading, error, users } = usersList;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete, message } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			navigate('/login');
		}
	}, [dispatch, userInfo, navigate, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<>
			<h1>Users</h1>

			{message && <Message variant={'success'}>{message}</Message>}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant={'danger'}>{error}</Message>
			) : (
				<Table
					striped
					bordered
					hover
					responsive
					className="table-sm users-list-table"
				>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: 'green' }}
											></i>
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td className="user-controls-btns">
										<LinkContainer
											to={`/admin/users/${user._id}/edit`}
										>
											<Button variant="light" className="btn-sm">
												<i className="fas fa-edit"></i>
											</Button>
										</LinkContainer>
										<Button
											variant="danger"
											className="btn-sm"
											onClick={() => deleteHandler(user._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
