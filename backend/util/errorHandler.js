class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);     // super is used to call the constructor of parent class i.e Error class
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports=ErrorHandler

// This is used set up the error in error class