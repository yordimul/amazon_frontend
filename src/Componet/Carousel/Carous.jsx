import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {img} from './data.js'
import classes from './carousel.module.css'


export default function Carous() {
  return (
    <>
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showindicator={false}>
    
        {img.map((item, index) => {
            return <div key={index}><img src={item} /></div>
        })}
</Carousel>
<div className={classes.hero_img}>
</div>
    </>
  )
}
