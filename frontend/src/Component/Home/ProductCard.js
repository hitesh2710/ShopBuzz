import { Rating } from '@material-ui/lab'
import React from 'react'
import {Link} from 'react-router-dom'

function ProductCard({product}) {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        
        <div style={{height:'18vmax' , width: '14vmax', display:'flex',justifyContent:'center'}}>
        <img src={product.images[0].url} alt={product.name} style={{height:'12vmax',width: '12vmax'}}></img>

        </div>
      
        <p>{product.name}</p>
        <div>
            <Rating{...options}/>
            <span className='productCardSpan'>({product.numOfReviews} Reviews)</span> 
        </div>
        <span>{`₹${product.price}`}</span>
       
    </Link>
  )
}

export default ProductCard