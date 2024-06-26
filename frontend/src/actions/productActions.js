import axios from 'axios';
import {
	PRODUCT_CHANGE_SORT_FAIL,
	PRODUCT_CHANGE_SORT_REQUEST,
	PRODUCT_CHANGE_SORT_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_TOP_FAIL,
	PRODUCT_LIST_TOP_REQUEST,
	PRODUCT_LIST_TOP_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants';

export const listProducts =
	(keyword = '', pageNumber = '') =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_LIST_REQUEST });

			const config = { headers: { 'Content-Type': 'application/json' } };

			const { data } = await axios.get(
				`/api/products?keyword=${
					keyword ? keyword : 'none'
				}&pageNumber=${pageNumber}`,
				config
			);

			dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
			});
		}
	};

export const listTopProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_TOP_REQUEST });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data } = await axios.get(`/api/products/top`, config);

		dispatch({ type: PRODUCT_LIST_TOP_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_TOP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const listProductDetails = (productId) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const config = { headers: { 'Content-Type': 'application/json' } };

		const { data: product } = await axios.get(
			`/api/products/${productId}`,
			config
		);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.delete(`/api/products/${productId}`, config);

		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data: createdProduct } = await axios.post(
			`/api/products`,
			{},
			config
		);

		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: createdProduct });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_UPDATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getState().userLogin.userInfo.token}`
			}
		};

		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const createProductReview =
	(productId, review) => async (dispatch, getState) => {
		try {
			dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getState().userLogin.userInfo.token}`
				}
			};

			const { data } = await axios.post(
				`/api/products/${productId}/reviews`,
				review,
				config
			);

			dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
		} catch (error) {
			console.log(error);
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: error.message
			});
		}
	};

export const changeSort =
	({ sort, sortOrder }) =>
	async (dispatch, getState) => {
		try {
			console.log({ sort, sortOrder });
			dispatch({ type: PRODUCT_CHANGE_SORT_REQUEST });

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getState().userLogin.userInfo.token}`
				}
			};

			const { data } = await axios.get(
				`/api/products/sortBy/${sort}?sortOrder=${sortOrder}`,
				config
			);

			dispatch({ type: PRODUCT_CHANGE_SORT_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: PRODUCT_CHANGE_SORT_FAIL,
				payload: error.message
			});
		}
	};
