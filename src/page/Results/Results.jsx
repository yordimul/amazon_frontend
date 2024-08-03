import React, { useEffect, useState } from "react";
import Layout from "../../Componet/Layout/Layout";
import { useParams } from "react-router-dom";
import classes from "./result.module.css";
import { ProductURL } from "./../../API/ProductURL.js";
import Productcard from "../../Componet/Product/Card.jsx"; 
import Loader from "../../Componet/Loader/Loader.jsx";// Import the Productcard component

export default function Results() {
	const { categoryName } = useParams();
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true)
		fetch(`${ProductURL}/products/category/${categoryName}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				
				setResult(data);
				setLoading(false)
			});
	}, []);

	return (
		
		<Layout>
			{loading?(<Loader/>):(<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>category/{categoryName}</p>
				<br />
				<div className={classes.product_cont}>
					{result.map((product) => (
						<Productcard key={product.id} data={product}
						rendereDescription={false} renderAdd={true}/>
					))}
				</div>
			</section>)}
			
		</Layout>
	);
}
