import React, { useEffect, useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import { register } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod: paymentMethodFromStorage } = cart;

	if (!shippingAddress) {
		navigate('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler} className="login-form">
				<Form.Group>
					<Form.Label as={'legend'}>Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value={'PayPal'}
							checked={paymentMethod === 'PayPal'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="Credit Card"
							id="creditCard"
							name="paymentMethod"
							value={'Credit Card'}
							checked={paymentMethod === 'Credit Card'}
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
