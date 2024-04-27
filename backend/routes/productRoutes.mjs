import express from 'express';
import {
	createProduct,
	createProductReview,
	deleteProduct,
	getProduct,
	getProducts,
	getSortedProducts,
	getTopProducts,
	updateProduct
} from '../controllers/productController.mjs';
import { admin, protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/sortBy/:sortName').get(getSortedProducts);
router.route('/top').get(getTopProducts);
router.route('/:id/reviews').post(protect, createProductReview);
router
	.route('/:id')
	.get(getProduct)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;
