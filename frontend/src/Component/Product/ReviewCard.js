import React from 'react'
import ProfileImage from '../../images/Profile.png'
import { Rating } from '@material-ui/lab';
function ReviewCard({review}) {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
    
  return (
    <div className='reviewCard'>
     <img src={ProfileImage} alt="User" />
     <p>{review.name}</p>
     <Rating{...options}/>
     <span className='reviewCardComment' >{review.comment}</span> 
      
    </div>
  )
}

export default ReviewCard