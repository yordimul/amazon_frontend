import React, { useState, useEffect } from "react";
import Layout from "../../Componet/Layout/Layout.jsx";
import { ProductURL } from "../../API/ProductURL.js";
import Productcard from "../../Componet/Product/Card.jsx";
import { useParams } from "react-router-dom";
import Loader from "../../Componet/Loader/Loader.jsx";

export default function ProductDetail() {
  const { productId } = useParams();
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(`${ProductURL}/products/${productId}`)
   
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setdata(data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, []);
  

  return (
    <Layout>
      {loading?(<Loader/>):(
      
      
      
      <Productcard  key={data.id} data={data}  flex={true} rendereDescription={true} renderAdd={true}/> 
      
      
      
      
      
      
      
      )}
          
        </Layout>
  );
}