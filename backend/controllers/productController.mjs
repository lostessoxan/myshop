import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.mjs';

const getProducts = asyncHandler(async (req, res) => {
	try {
		const pageSize = 10;

		const page = Number(req.query.pageNumber || 1);

		const keyword =
			req.query.keyword === 'none'
				? {}
				: {
						name: {
							$regex: req.query.keyword,
							$options: 'i'
						}
				  };

		const count = await Product.countDocuments({ ...keyword });

		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		res.json({ products, pages: Math.ceil(count / pageSize), page });
	} catch (error) {
		throw new Error(error.message);
	}
});

const getTopProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({}).sort({ rating: -1 }).limit(3);
		res.json(products);
	} catch (error) {
		throw new Error(error.message);
	}
});

const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error(`Product not found`);
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: 'Product successfully deleted' });
	} catch (error) {
		res.status(404);
		throw new Error(`Product not found / Internal Server Error`);
	}
});

const createProduct = asyncHandler(async (req, res) => {
	try {
		const product = new Product({
			name: 'Sample Name',
			price: 0,
			user: req.user._id,
			image: '/images/sample.png',
			brand: 'Sample brand',
			category: 'sample category',
			countInStock: 0,
			numReviews: 0,
			description: 'Sample description'
		});

		const newProduct = await product.save();

		res.json(newProduct);
	} catch (error) {
		// res.status(404);
		throw new Error(error.message);
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { name, price, image, description, countInStock, category, brand } =
			req.body;

		const product = await Product.findById(req.params.id);

		if (product) {
			product.name = name || product.name;
			product.price = price || product.price;
			product.image = image || product.image;
			product.description = description || product.description;
			product.countInStock = countInStock || product.countInStock;
			product.category = category || product.category;
			product.brand = brand || product.brand;

			await product.save();

			res.json({ message: 'Product was successfully updated' });
		} else {
			res.status(404);
			throw new Error(`Product not found`);
		}
	} catch (error) {
		// res.status(404);
		throw new Error(error.message);
	}
});

const createProductReview = asyncHandler(async (req, res, next) => {
	try {
		const { comment, rating } = req.body;

		const product = await Product.findById(req.params.id);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				(review) => review.user.toString() === req.user._id.toString()
			);

			if (alreadyReviewed) {
				res.status(400);
				next(new Error('Product already reviewed'));
			} else {
				const review = {
					user: req.user._id,
					name: req.user.name,
					comment,
					rating: Number(rating)
				};

				product.reviews.push(review);

				product.numReviews = product.reviews.length;

				product.rating =
					product.reviews.reduce((acc, item) => acc + item.rating, 0) /
					product.numReviews;

				await product.save();

				res.status(201).json({ message: 'Review added' });
			}
		} else {
			res.status(404);
			throw new Error(`Product not found`);
		}
	} catch (error) {
		throw new Error(error.message);
	}
});

const getSortedProducts = asyncHandler(async (req, res) => {
	try {
		const { sortName } = req.params;
		const { sortOrder } = req.query;

		console.log(sortName, sortOrder);

		const sortedProducts = await Product.find().sort({
			[sortName]: Number(sortOrder)
		});

		if (sortedProducts) {
			res.json(sortedProducts);
		} else {
			req.status(404);

			throw new Error(`Products not found`);
		}
	} catch (error) {
		throw new Error(error.message);
	}
});

export {
	getProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
	getSortedProducts
};
