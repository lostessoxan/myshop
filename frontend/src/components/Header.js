import React, { useEffect } from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserDetails, logout } from '../actions/userActions';

import classes from './Header.module.scss';
import SearchBox from './SearchBox';

const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDetailsSlice = useSelector((state) => state.userDetails);
	const { loading, error, userDetails } = userDetailsSlice;

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserDetails('profile'));
		}
	}, [userInfo, dispatch]);

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container className={`navigation ${classes.navigationBar}`}>
					<LinkContainer to="/">
						<Navbar.Brand className={classes.logo}>Криоген</Navbar.Brand>
					</LinkContainer>
					<SearchBox />
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/">
								<Nav.Link>
									<i
										class="fa-solid fa-cube"
										style={{ color: 'lightgreen' }}
									></i>{' '}
									Products
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i
										className="fas fa-shopping-cart"
										style={{ color: 'lightyellow' }}
									></i>{' '}
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									// title={userDetails && userDetails.name}
									title={userInfo.name && userInfo.name}
									id="username"
								>
									<LinkContainer to={'/profile'}>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-user"></i> Sign in
									</Nav.Link>
								</LinkContainer>
							)}
							{/* <NavDropdown
								title={userInfo && userInfo.name}
								id="username"
							>
								<LinkContainer to={'/profile'}>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>
							</NavDropdown> */}
							{/* <LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-user"></i> Sign in
								</Nav.Link>
							</LinkContainer> */}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title={'Admin'} id="adminmenu">
									<LinkContainer to={'/admin/userslist'}>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={'/admin/productslist'}>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={'/admin/orderslist'}>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
