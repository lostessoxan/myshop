import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<HomeScreen />} />
						<Route path="/page/:pageNumber" element={<HomeScreen />} />
						<Route
							path="/search/:keyword/page/:pageNumber"
							element={<HomeScreen />}
						/>
						<Route path="/search/:keyword" element={<HomeScreen />} />
						<Route path="/products/:id" element={<ProductScreen />} />
						<Route path="/cart/:id?" element={<CartScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/shipping" element={<ShippingScreen />} />
						<Route path="/payment" element={<PaymentScreen />} />
						<Route path="/placeorder" element={<PlaceOrderScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/orders/:id" element={<OrderScreen />} />
						<Route
							path="/admin/orderslist"
							element={<OrderListScreen />}
						/>
						<Route path="/admin/userslist" element={<UserListScreen />} />
						<Route
							path="/admin/users/:id/edit"
							element={<UserEditScreen />}
						/>
						<Route
							path="/admin/productslist"
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/productslist/page/:pageNumber"
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/products/:id/edit"
							element={<ProductEditScreen />}
						/>

						<Route path="*" element={<h1>Page Not Found [404]</h1>} />
					</Routes>
				</Container>
			</main>
		</Router>
	);
}

export default App;
