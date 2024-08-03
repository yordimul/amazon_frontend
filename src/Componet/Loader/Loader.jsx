import React from 'react'
import {GridLoader } from 'react-spinners'
import classes from './loader.module.css'
export default function Loader() {
  return (
    <div className={classes.loader}><GridLoader /></div>
  )
}
