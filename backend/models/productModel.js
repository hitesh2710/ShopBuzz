const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true," Product name is Required!"]
    },
    description:{
        type:String,
        required:[true,"Product description is Required!"]
    },
    price:{
        type:Number,
        required:[true,"Product price is Required!"],
        maxLength:[7,"Product price cannot exceed more than 7 figure"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[{
          public_id:{
            type:String,
            required:true
          },
          url:{
            type:String,
            required:true
          }   
        }
    ],
    category:{
        type:String,
        required:[true,"Product category is Required"]
    },
    stock:{
        type:Number,
        Required:[true,'Product stock is Required'],
        maxLength:[4,"Product stock cannot exceed more than 4 figure"],
        default:1
    },
    numOfReviews:{
        type:String,
        default:0
    },
    review:[{
        user:{               //user who added the review
            type:mongoose.Schema.ObjectId,
            ref:'userModel',
            required:true
        },
        name:{
            type:String,
            Required:true
        },
        rating:{
            type:Number,
            Required:true
        },
        comment:{
            type:String,
            Required:true
        }
    }],
    
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{               //user who created the product
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:true
    }



})

const productModel=mongoose.model('productModel',productSchema);
module.exports=productModel