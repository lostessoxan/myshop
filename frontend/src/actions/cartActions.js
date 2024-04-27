import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_CLEAN,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	console.log(id);
	console.log(qty);

	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			productId: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty
		}
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({ type: CART_REMOVE_ITEM, payload: id });

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (shippingAddress) => async (dispatch) => {
	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: shippingAddress });

	localStorage.setItem(
		'shippingAddress',
		JSON.stringify({ ...shippingAddress })
	);
};

export const savePaymentMethod = (method) => async (dispatch) => {
	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method });

	localStorage.setItem('paymentMethod', JSON.stringify(method));
};

export const clearCart = () => async (dispatch) => {
	dispatch({ type: CART_CLEAN });

	localStorage.removeItem('cartItems');
};

// export const saveShippingAddress = (data) => (dispatch) => {
// 	dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

// 	localStorage.setItem('shippingAddress', JSON.stringify(data));
// };

// export const savePaymentMethod = (method) => (dispatch) => {
// 	dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method });

// 	localStorage.setItem('paymentMethod', JSON.stringify(method));
// };
