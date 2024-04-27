import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';
import users from './data/users.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';

dotenv.config();
connectDB();

const importData = async () => {
	try {
		await Product.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		const createdUsers = await User.insertMany(users);

		const adminUserId = createdUsers[0]._id;

		const sampleProducts = products.map((product) => ({
			...product,
			user: adminUserId
		}));

		await Product.insertMany(sampleProducts);

		console.log('Data Imported'.green.inverse);
	} catch (error) {
		console.error(`${error.message}`.red.inverse);
	}
};

const destroyData = async () => {
	try {
		await Product.deleteMany();
		await User.deleteMany();
		await Order.deleteMany();

		console.log('Data Destroyed'.red.inverse);
	} catch (error) {
		console.error(`${error.message}`.red.inverse);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
