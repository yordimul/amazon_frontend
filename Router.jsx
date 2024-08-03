import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./src/page/Landing/Landing";
import Auth from "./src/page/Auth/Sign-In.jsx";
import Cart from "./src/page/Cart/Cart.jsx";
import Order from "./src/page/Orders/Order.jsx";
import Payment from "./src/page/Payment/Payment.jsx";
import ProductDetail from "./src/page/ProductDetail/ProductDetail.jsx";
import Results from "./src/page/Results/Results.jsx";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51PfcVXBPn78g8SgKQy4CFFvkvrckRDEbH1I8rWUesIheadlA3shmkraIZEbjCKIalvgkLHSD2nbfcSoi659QM5XW00uiAg4x3u');
export default function Routing() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Cart" element={<Cart />} />
				<Route path="/signin" element={<Auth />} />
				<Route path="/Payments" element={
				<Elements stripe={stripePromise}><Payment /></Elements>
				} />
				<Route path="/products/:productId" element={<ProductDetail />} />
				<Route path="/category/:categoryName" element={<Results />} />
				<Route path="/Order" element={<Order />} />
			</Routes>
		</Router>
	);
}
