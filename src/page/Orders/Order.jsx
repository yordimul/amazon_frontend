// Order.js
import React, { useEffect, useContext, useState } from "react";
import Layout from "../../Componet/Layout/Layout";
import { db } from "../../Util/firebase";
import { DataContext } from "../../Componet/DataProvider/DataProvider";
import { collection, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import classes from "./order.module.css";
import ProductsList from "../../Componet/Product/Card";

const Order = () => {
  const [{  user }, dispatch] = useContext(DataContext);
 
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "order");
      const ordersQuery = query(ordersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) =>
        setOrder(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrder([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {order?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have any order yet.</div>
          )}
          <div>
            {order?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductsList flex={true} data={order} key={order.id} rendereDescription={true} renderAdd={false}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;

