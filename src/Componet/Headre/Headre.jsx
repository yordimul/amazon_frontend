import React from "react";
import { Link } from "react-router-dom";
import classes from "./headre.module.css";
import { useContext } from "react";
import Lower from "./../Headre/Lowerheader.jsx";
import { FaSearch } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import {auth} from './../../Util/firebase.js'

export default function Headre() {
	const [state, dispach] = useContext(DataContext);
	const { basket, user } = state;
	const totalItem = basket?.reduce((amount, item) => {
		return amount + item.amount;
	}, 0);

	return (
		<section className={classes.fixed}>
			<section className={classes.headre_cont}>
				<div>
					<div className={classes.headre_logo}>
						{/* logo */}
						<Link to="/">
							<img src="src\image\headerlogo.png" alt="" />
						</Link>

						<div className={classes.delivery}>
							<span>
								<CiLocationOn />
							</span>
							<div>
								<p>Deliver to</p>
								<span>Ethiopia</span>
							</div>
						</div>
					</div>
				</div>

				<div className={classes.search}>
					<select name="" id="">
						<option value="">All</option>
					</select>
					<input type="text" placeholder="Select product" />
					{/* icon */}
					<FaSearch size={25} />
				</div>
				<div className={classes.order_cont}>
					<div>
						<a href="" className={classes.langu}>
							<img src="src\image\USA.png" alt="" />

							<select name="" id="">
								<option value="">EN</option>
							</select>
						</a>
					</div>
					{/* sign in */}

					<Link to={!user && "/Signin"}>
						<div>
							{user ? (
								<>
									<p> HELLO {user?.email?.split("@")[0]} </p>
									<span onClick={()=>{auth.signOut()}}>Sign Out</span>
								</>
							) : (
								<>
									<p> HELLO Sign In</p>
									<span>Account & lists</span>
								</>
							)}
						</div>
					</Link>
					{/* orders */}
					<Link to="/Order">
						<p>returns</p>
						<span>&orders</span>
					</Link>
					<Link to="/cart" className={classes.cart}>
						<CiShoppingCart size={35} />
						<span>{totalItem}</span>
					</Link>
				</div>
			</section>
			<Lower />
		</section>
	);
}
