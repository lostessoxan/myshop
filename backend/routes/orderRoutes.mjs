import express from 'express';
import {
	createOrder,
	getOrderDetails,
	listAllOrders,
	listOrders,
	updateOrderToDeliver
} from '../controllers/orderController.mjs';
import { admin, protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/').get(protect, listOrders);
router.route('/all').get(protect, admin, listAllOrders);
router.route('/:id').get(protect, getOrderDetails);
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliver);

export default router;
