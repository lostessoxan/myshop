import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.mjs';

const createOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	}

	const order = await Order.create({
		orderItems,
		shippingAddress,
		paymentMethod,
		shippingPrice,
		taxPrice,
		totalPrice,
		user: req.user._id
	});

	if (order) {
		res.status(201).json(order);
	} else {
		res.status(400);
		throw new Error('Invalid order data');
	}
});

const listOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('No orders found');
	}
});

const getOrderDetails = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'_id name email isAdmin'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

const updateOrderToDeliver = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = new Date();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

const listAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate('user', '_id name');

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('No orders found');
	}
});

export {
	createOrder,
	listOrders,
	getOrderDetails,
	updateOrderToDeliver,
	listAllOrders
};
