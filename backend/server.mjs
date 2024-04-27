import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.mjs';
import { errorHandler, notFound } from './middlewares/errorHandler.mjs';
import orderRoutes from './routes/orderRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';

dotenv.config();
connectDB();

// =================================================================

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// const __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '/frontend/build')));

// 	app.get('*', (req, res) =>
// 		res.send(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
// 	);
// }

app.use(notFound);
app.use(errorHandler);

// =================================================================

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

export default app;
