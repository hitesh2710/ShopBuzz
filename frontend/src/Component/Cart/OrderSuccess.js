import React, { Fragment } from 'react'
import MetaData from '../layout/Header/MetaData'
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'

function Success() {
  return (
    <Fragment>
      <MetaData title="Order Success"></MetaData>
      <div className="orderSuccess">
      <CheckCircleIcon/>
      <Typography>Your Order Has Been Placed Successfully</Typography>
      <Link to="/orders">View Orders</Link>

      </div>
    </Fragment>
  )
}

export default Success