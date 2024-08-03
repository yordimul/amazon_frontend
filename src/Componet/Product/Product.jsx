import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import classes from "./product.module.css";
import Loader from './../Loader/Loader.jsx'
function Product() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true)
		async function fetchData() {
			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json()
			.catch((err)=>{console.log(err);})	
			setLoading(false)
			setData(data);
			setLoading(false)
		}
		fetchData();
	}, []);

	return (<>
		{loading?(< Loader />):(<div className={classes.product_cont}>
			{data.map((item) => (
				<Card data={item} key={item.id} renderAdd={true} rendereDescription={false} flex={false}/>
			))}
		</div>)}

		</>
	);
}
export default Product;
