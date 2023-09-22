module.exports=(theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)//calling next middleware with error as a parameter
}


// Another Method of doing above 
// tryCatch.js
// const tryCatch = (controller) => async (req, res, next) => {
// 	try {
// 		await controller(req, res);
// 	} catch (error) {
// 		return next(error);
// 	}
// };
// module.exports = tryCatch;