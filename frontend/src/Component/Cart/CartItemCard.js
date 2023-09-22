import React, { Fragment } from 'react'
import './CartItemCard.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeProductFromCart } from '../../actions/cartAction'

function CartItemCard({item}) {
    const dispatch=useDispatch()
    const removeItem=(id)=>
    {
      dispatch(removeProductFromCart(id))  
    }
  return (
    <Fragment>
        <div className="CartItemCard">
            <img src={item.image} alt='Product'/>
            <div>
            <Link to={`/product/${item.pid}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>removeItem(item.pid)}>Remove</p>
            </div>
        </div>
    </Fragment>

  )
}

export default CartItemCard