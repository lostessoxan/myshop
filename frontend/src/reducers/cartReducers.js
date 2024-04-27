import {
	CART_ADD_ITEM,
	CART_CLEAN,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS
} from '../constants/cartConstants';

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {}, paymentMethod: null },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			const existItem = state.cartItems.find(
				(cartItem) => cartItem.productId === item.productId
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((cartItem) =>
						cartItem.productId === existItem.productId ? item : cartItem
					)
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.productId !== action.payload
				)
			};
		case CART_CLEAN:
			return {
				...state,
				cartItems: []
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return { ...state, shippingAddress: action.payload };
		case CART_SAVE_PAYMENT_METHOD:
			return { ...state, paymentMethod: action.payload };
		// case CART_SAVE_SHIPPING_ADDRESS:
		// 	return {
		// 		...state,
		// 		shippingAddress: action.payload
		// 	};
		// case CART_SAVE_PAYMENT_METHOD:
		// 	return {
		// 		...state,
		// 		paymentMethod: action.payload
		// 	};
		default:
			return state;
	}
};
