import axios from 'axios';
import { CART_CLEAN } from '../constants/cartConstants';
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_ALL_FAIL,
	ORDER_LIST_ALL_REQUEST,
	ORDER_LIST_ALL_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS
} from '../constants/orderConstants';

export const createOrder = (orderData) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.post(`/api/orders`, orderData, config);

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

		dispatch({ type: CART_CLEAN });
		localStorage.removeItem('cartItems');
	} catch (error) {
		dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_MY_REQUEST });

		const config = {
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.get(`/api/orders`, config);

		dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_MY_FAIL, payload: error.message });
	}
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const config = {
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.get(`/api/orders/${orderId}`, config);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
	}
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.put(
			`/api/orders/${orderId}/deliver`,
			{},
			config
		);

		dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_DELIVER_FAIL, payload: error.message });
	}
};

export const listAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_ALL_REQUEST });

		const config = {
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.get(`/api/orders/all`, config);

		dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: ORDER_LIST_ALL_FAIL, payload: error.message });
	}
};
