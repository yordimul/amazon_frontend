import React from 'react'
import { TiThMenu } from "react-icons/ti";
import classes from './lowerhedear.module.css'

export default function Lowerheader() {
  return (
    <>
    <div className={classes.cont} >
   
        <ul >
          <li>
          <TiThMenu />
        <p>All</p>
        </li>
            <li>Today's Deals</li>
            <li>Costumer service</li>
            <li>Registry</li>
            <li>Gift Cards</li>
            <li>Sell</li>
    
        </ul>
    </div>
    
    
    </>
  )
}
