import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';

import { cartReducer } from './reducers/cartReducers';
import {
	listMyOrdersReducer,
	orderCreateReducer,
	orderDeliverReducer,
	orderDetailsReducer,
	orderListAllReducer
} from './reducers/orderReducers';
import {
	productChangeSortReducer,
	productCreateReducer,
	productCreateReviewReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productTopListReducer,
	productUpdateReducer
} from './reducers/productReducers';
import {
	deleteUserReducer,
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
	usersListReducer
} from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	orderCreate: orderCreateReducer,
	listMyOrders: listMyOrdersReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDetails: userDetailsReducer,
	orderDetails: orderDetailsReducer,
	orderDeliver: orderDeliverReducer,
	orderListAll: orderListAllReducer,
	usersList: usersListReducer,
	userDelete: deleteUserReducer,
	userUpdate: userUpdateReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	productTopList: productTopListReducer,
	productChangeSort: productChangeSortReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
	? JSON.parse(localStorage.getItem('paymentMethod'))
	: 'PayPal';

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage
	},
	userLogin: { userInfo: userInfoFromStorage }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
