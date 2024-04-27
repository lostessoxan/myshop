import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_RESET,
	ORDER_CREATE_SUCCESS,
	ORDER_DELIVER_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_RESET,
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

export const orderCreateReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const listMyOrdersReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { loading: true };
		case ORDER_LIST_MY_SUCCESS:
			return { loading: false, success: true, orders: action.payload };
		case ORDER_LIST_MY_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return { loading: true };
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload };
		case ORDER_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return { loading: true };
		case ORDER_DELIVER_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_DELIVER_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_DELIVER_RESET:
			return {};
		default:
			return state;
	}
};

export const orderListAllReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_LIST_ALL_REQUEST:
			return { loading: true };
		case ORDER_LIST_ALL_SUCCESS:
			return { loading: false, orders: action.payload, success: true };
		case ORDER_LIST_ALL_FAIL:
			return { loading: false, error: action.payload };
		// case ORDER_LIST_RESET:
		// 	return {};
		default:
			return state;
	}
};
