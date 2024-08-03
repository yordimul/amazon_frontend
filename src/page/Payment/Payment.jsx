import React, { useContext, useState } from 'react';
import Layout from '../../Componet/Layout/Layout';
import { Link } from 'react-router-dom';
import classes from './payment.module.css';
import { axiosinstance } from '../../API/axios';
import { db } from "./../../Util/firebase";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { DataContext } from '../../Componet/DataProvider/DataProvider';
import Productcard from '../../Componet/Product/Card';
import Currency from '../../Componet/Currencyformatter/Currencyt';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export default function Payment() {
  const [{ basket, user }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardErr, setCardErr] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

  const handleChange = (e) => {
    setCardErr(e?.error?.message || "");
  };

  const handlpayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosinstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error("Error during payment confirmation: ", error);
        setCardErr(error.message);
        return;
      }

      console.log("Payment Intent:", paymentIntent);

      // Firestore set document
      await setDoc(doc(collection(db, "users", user.uid, "order"), paymentIntent.id), {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      console.log("Order successfully saved!");
      navigate('/Order', {state :{msg:"you have placed new order"}})

    } catch (error) {
      console.error("Error during payment process: ", error);
      setCardErr("An error occurred during the payment process. Please try again.");
    }
  };

  return (
    <Layout>
      <section className={classes.cont}>
        <div className={classes.payment_header}>
          Checkout ({totalItem} items)
        </div>
        <section className={classes.payment}>
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div></div>
              <div></div>
            </div>
          </div>
          <hr />
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {basket?.map((item, i) => (
                <Productcard
                  flex={true}
                  key={i}
                  data={item}
                  renderDescription={false}
                  renderAdd={false}
                />
              ))}
            </div>
          </div>
          <hr />
          <div className={classes.flex}>
            <h3>Payment Method</h3>
            <div className={classes.payment_card_cont}>
              <div className={classes.payment_detail}>
                <form onSubmit={handlpayment}>
                  {cardErr && <small>{cardErr}</small>}
                  <CardElement onChange={handleChange} />
                  <div className={classes.paymentprice}>
                    <div>
                      <span>Total order | <Currency amount={total} /></span>
                    </div>
                    <button type='submit'>Pay Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}


