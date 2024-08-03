import React, { useContext } from 'react';
import Layout from '../../Componet/Layout/Layout.jsx';
import { DataContext } from '../../Componet/DataProvider/DataProvider.jsx';
import Productcard from '../../Componet/Product/Card.jsx';
import Currency from '../../Componet/Currencyformatter/Currencyt.jsx';
import { Link } from 'react-router-dom';
import  classes from'./cart.module.css'
import {Type } from "./../../Util/actionTypes.js";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  console.log('Basket:', basket);
  console.log('User:', user);

  const total = basket.reduce((amount, item) => {
    return item.price *item.amount +amount;
  }, 0);
  const increment = (item) => {
    console.log('Increment item:', item);
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: item,
    });
  };

  const decrement = (itemId) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: itemId,
    });
  };

  console.log('Total:', total);

  return (
    <Layout>
      <section className={classes.cont}>
        <div  className={classes.cart_cont}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {!basket?.length ? (
            <p>Oops! No items</p>
          ) : (
            basket.map((item, i) => {
              return <section  className={classes.cart_product}>
              <Productcard
                key={i}
                data={item}
                rendereDescription={true}
                flex={true}
                renderAdd={false}
              />

              
              <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={() => increment(item)}><IoIosArrowUp size={20}/></button>
                  <span>{item.amount}</span>
                  <button className={classes.btn} onClick={() => decrement(item.id)}><IoIosArrowDown size={20} /></button>
                
              </div>
              
              </section>          
})

             
          )}
        </div>
      
        <br />  
        {basket.length !== 0 && (
          <div className={classes.subtotal}  >
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <Currency amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

