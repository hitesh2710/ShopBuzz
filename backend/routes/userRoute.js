const express=require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, userDetails, updatePassword, updateUser, getAllUsers, getUser, updateUserRole, deleteUser } = require('../controller/userController');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');
const userRouter=express.Router();

userRouter
.route('/register')
.post(registerUser)

userRouter
.route('/login')
.post(loginUser)

userRouter
.route('/logout')
.get(logout)

userRouter
.route('/password/forgot')
.post(forgotPassword)

userRouter
.route('/password/reset/:token')
.put(resetPassword)

userRouter
.route('/password/update')
.put(isAuthenticated,updatePassword)

userRouter
.route('/profile')
.get(isAuthenticated,userDetails)

userRouter
.route('/profile/update')
.put(isAuthenticated,updateUser)

userRouter
.route('/admin/users')
.get(isAuthenticated,isAuthorized("admin"),getAllUsers)

userRouter
.route('/admin/user/:id')
.get(isAuthenticated,isAuthorized("admin"),getUser)
.put(isAuthenticated,isAuthorized("admin"),updateUserRole)
.delete(isAuthenticated,isAuthorized("admin"),deleteUser)



module.exports=userRouter