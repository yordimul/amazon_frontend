import "./App.css";

import Router from './../Router.jsx'
import { useContext, useEffect } from "react";
import { DataContext } from "./Componet/DataProvider/DataProvider.jsx";
import {auth} from './Util/firebase.js'
import { Type } from "./Util/actionTypes.js";
function App() {
	const [{user},dispach]=useContext(DataContext)


	useEffect(()=>{

auth.onAuthStateChanged((authuser)=>{
	if(authuser){
		dispach({
			type:Type.SET_USER,
			user:authuser
		})
	}else{
		dispach({
			type:Type.SET_USER,
			user: null
		})

	}
})

	},[])
	return (
		<>
			<Router/>
		</>
	);
}

export default App;
