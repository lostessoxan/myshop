import asyncHandler from 'express-async-handler';
import User from '../models/userModel.mjs';
import generateToken from '../utils/generateToken.mjs';

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		res.status(400);
		throw new Error('User already exists');
	}

	const createdUser = await User.create({
		name,
		email,
		password
	});

	if (createdUser) {
		res.status(201).json({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			isAdmin: createdUser.isAdmin,
			token: generateToken(createdUser._id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.findById(req.user._id);

	if (user) {
		user.name = name || user.name;
		user.email = email || user.email;
		user.password = password || user.password;

		const updatedUser = await user.save();

		res.json(updatedUser);

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id)
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({}).select('name email isAdmin');

	if (users) {
		res.json(users);
	} else {
		res.status(404);
		throw new Error('No users found');
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: 'User removed' });
	} catch (error) {
		req.status(404);
		throw new Error('User not found');
	}
});

const updateUser = asyncHandler(async (req, res) => {
	try {
		const { name, email, isAdmin } = req.body;

		const user = await User.findById(req.params.id);

		if (user) {
			user.name = name || user.name;
			user.email = email || user.email;
			user.isAdmin = isAdmin;

			const updatedUser = await user.save();

			res.json(updatedUser);
		} else {
			req.status(404);
			throw new Error('User not found');
		}
	} catch (error) {
		req.status(404);
		throw new Error(error.message);
	}
});

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUserById,
	getAllUsers,
	deleteUser,
	updateUser
};
