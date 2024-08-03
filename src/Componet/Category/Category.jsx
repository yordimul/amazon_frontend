import React from 'react';
import { data } from './Categoryinfo.js';
import Categorycard from './Categorycard.jsx';
import classes from './category.module.css'
export default function CategoryList() {
  return (
    <div className={ classes.category_cont}>
      {data.map((info) => (
        <Categorycard info={info} key={info.id} />
      ))}
    </div>
  );
}
