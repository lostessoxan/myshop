import {
	PRODUCT_CHANGE_SORT_FAIL,
	PRODUCT_CHANGE_SORT_REQUEST,
	PRODUCT_CHANGE_SORT_RESET,
	PRODUCT_CHANGE_SORT_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_RESET,
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
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_RESET_STATE,
	PRODUCT_UPDATE_RESET_SUCCESS,
	PRODUCT_UPDATE_SUCCESS
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page
			};
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productTopListReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_LIST_TOP_REQUEST:
			return { loading: true };
		case PRODUCT_LIST_TOP_SUCCESS:
			return {
				loading: false,
				products: action.payload
			};
		case PRODUCT_LIST_TOP_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const productDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload };
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case PRODUCT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
				message: action.payload.message
			};
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_DELETE_RESET:
			return {};
		default:
			return state;
	}
};

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				product: action.payload
			};
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const productUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case PRODUCT_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				message: action.payload.message
			};
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_UPDATE_RESET_SUCCESS:
			return { ...state, success: null };
		case PRODUCT_UPDATE_RESET_STATE:
			return {};
		default:
			return state;
	}
};

export const productCreateReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true };
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return {
				loading: false,
				success: true,
				review: action.payload
			};
		case PRODUCT_CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CREATE_REVIEW_RESET:
			return {};

		default:
			return state;
	}
};

export const productChangeSortReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CHANGE_SORT_REQUEST:
			return { loading: true };
		case PRODUCT_CHANGE_SORT_SUCCESS:
			return {
				loading: false,
				sortedProducts: action.payload
			};
		case PRODUCT_CHANGE_SORT_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_CHANGE_SORT_RESET:
			return {};
		default:
			return state;
	}
};
