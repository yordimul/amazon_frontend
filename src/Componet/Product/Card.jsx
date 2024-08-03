import React, { useContext } from 'react';
import { Rating } from '@mui/material';
import Currency from '../Currencyformatter/Currencyt';
import classes from './product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from './../../Util/actionTypes';

export default function Card({ data, flex, rendereDescription ,renderAdd}) {
  if (!data) {
    return null;
  }

  const { id, image, category, title, rating, price, description } = data;
  console.log(data);

  const [state, dispatch] = useContext(DataContext);

  console.log(state);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, image, category, title, rating, price, description }
    });
  };

  return (
    <div className={`${classes.card_cont} ${flex ? classes.product_flex : ''}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={category} />
      </Link>
      <div>
        <h3>{title}</h3>
        {rendereDescription && <div style={{ width: "500px" }}>{description}</div>}
        <div className={classes.rating}>
          {rating && <Rating value={rating.rate} precision={0.1} />}
          {rating && <small>{rating.count}</small>}
        </div>
        <div>
          <Currency amount={price} />
        </div>
        <br />
        {renderAdd &&
        <button className={classes.button} onClick={addToCart}>add to cart</button> }
      </div>
    </div>
  );
}


// https://fakestoreapi.com/products/1