import React from 'react';
import classes from './category.module.css'
import { Link } from 'react-router-dom';

export default function Categorycard({ info }) {
  return (
    < >
    <div className={classes.category}>
    
      <p>{info.titel}</p>
     <Link to={`/category/${info.Name}`}>
        <img src={info.image} alt={info.Name} />
        <span>shop now</span>
      </Link>
     
    </div>
    
    </>
  );
}
