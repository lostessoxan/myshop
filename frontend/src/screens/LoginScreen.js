import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState(false);

	const { search } = useLocation();
	const navigate = useNavigate();
	const redirect = search ? search.split('=')[1] : '/';

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const emailChangeHandler = ({ target }) => {
		const value = target.value;
		setEmail(value);
		setEmailIsValid(value.trim().length !== 0 && value.includes('@'));
	};

	const passwordChangeHandler = ({ target }) => {
		const value = target.value;
		setPassword(value);
		setPasswordIsValid(value.trim().length > 5);
	};

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, redirect, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		// DISPATCH LOGIN
	};

	return (
		<FormContainer>
			<h1>Sign in</h1>
			{error && <Message variant={'danger'}>{error}</Message>}
			{loading && <Loader />}

			<Form onSubmit={submitHandler} className="login-form">
				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={emailChangeHandler}
						aria-describedby="email-block"
						style={{ borderColor: !emailIsValid ? 'red' : '' }}
					></Form.Control>
					{!emailIsValid && (
						<Form.Text
							id="email-block"
							variant="danger"
							style={{ color: 'red' }}
						>
							Incorrect email address. It must not be empty and contain @
							symbol
						</Form.Text>
					)}
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password Address</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={passwordChangeHandler}
						style={{ borderColor: !passwordIsValid ? 'red' : '' }}
					></Form.Control>
					{!passwordIsValid && (
						<Form.Text
							id="email-block"
							variant="danger"
							style={{ color: 'red' }}
						>
							Incorrect password. It must contain at least 6 characters
						</Form.Text>
					)}
				</Form.Group>

				<Button
					type="submit"
					variant="primary"
					disabled={!emailIsValid && !passwordIsValid}
				>
					Sign in
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer?{' '}
					<Link
						to={redirect ? `/register?redirect=${redirect}` : '/register'}
					>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
