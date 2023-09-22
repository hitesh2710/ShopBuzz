// const getJwtToken= require('../models/userModel')

const sendTokenAndCookies=(user,statusCode,res)=>{
    const token=user.getJwtToken()

    // options for cookies
    const options={
        
        expires:new Date(
            Date.now() + process.env.cookieExpire*24*60*60*1000
        ),
        httpOnly:true,
    }

    res.status(statusCode).cookie('token',token,options).json({
        "message":true,
        user,
        token
    })


}

module.exports=sendTokenAndCookies;